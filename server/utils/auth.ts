import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { apiKey } from 'better-auth/plugins'
import { PrismaClient } from '@prisma/client'
import { Resend } from 'resend'
import { render } from '@vue-email/render'

import EmailVerification from '~/components/EmailTemplates/EmailVerification.vue'
import ResetPassword from '~/components/EmailTemplates/ResetPassword.vue'
import PasswordChanged from '~/components/EmailTemplates/PasswordChanged.vue'

const runtimeConfig = useRuntimeConfig()

const prisma = new PrismaClient()
const resend = new Resend(runtimeConfig.RESEND_API_KEY)

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  trustedOrigins: [
    `*.${runtimeConfig.BASE_URL}`,
    `${runtimeConfig.SSL_PREFIX}://${runtimeConfig.BASE_URL}`,
  ],
  plugins: [
    apiKey({
      rateLimit: {
        enabled: false,
      },
    }),
  ],
  rateLimit: {
    enabled: false,
  },
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }, _) => {
      if (!runtimeConfig.RESEND_API_KEY) {
        return
      }

      const html = await render(
        ResetPassword,
        {
          name: user.name,
          url,
        },
        {
          pretty: true,
        },
      )

      await resend.emails.send({
        from: runtimeConfig.EMAIL_SENDER,
        to: user.email,
        subject: 'Reset Password',
        html,
      })
    },
    onPasswordReset: async ({ user }, _) => {
      if (!runtimeConfig.RESEND_API_KEY) {
        return
      }

      const html = await render(
        PasswordChanged,
        {
          name: user.name,
        },
        {
          pretty: true,
        },
      )

      await resend.emails.send({
        from: runtimeConfig.EMAIL_SENDER,
        to: user.email,
        subject: 'Password Changed',
        html,
      })
    },
  },
  emailVerification: {
    sendOnSignUp: runtimeConfig.RESEND_API_KEY ? true : false,
    sendVerificationEmail: async ({ user, url }, _) => {
      const html = await render(
        EmailVerification,
        {
          name: user.name,
          url,
        },
        {
          pretty: true,
        },
      )

      await resend.emails.send({
        from: runtimeConfig.EMAIL_SENDER,
        to: user.email,
        subject: 'Email Verification',
        html,
      })
    },
  },
  socialProviders: {
    github: {
      enabled:
        runtimeConfig.GITHUB_CLIENT_ID && runtimeConfig.GITHUB_CLIENT_SECRET
          ? true
          : false,
      clientId: runtimeConfig.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
    },
    google: {
      enabled:
        runtimeConfig.GOOGLE_CLIENT_ID && runtimeConfig.GOOGLE_CLIENT_SECRET
          ? true
          : false,
      clientId: runtimeConfig.GOOGLE_CLIENT_ID,
      clientSecret: runtimeConfig.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      noBranding: {
        type: 'boolean',
        required: false,
      },
    },
  },
})
