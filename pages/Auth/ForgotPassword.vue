<template>
  <ClientOnly>
    <div class="h-screen flex">
      <div class="bg-white w-full lg:w-2/5 p-20 flex flex-col">
        <AppLogo class="w-fit" />
        
        <div class="flex-grow flex flex-col justify-center max-w-md w-full mx-auto space-y-6">
          <div class="space-y-2">
            <h1 class="text-2xl font-semibold">Forgot Password</h1>
            <p class="text-gray-500 text-sm">Enter your email address and we'll send you a link to reset your password</p>
          </div>
    
          <UForm id="forgotPasswordForm" :schema="schema" :state="state" class="space-y-6" @submit="handleForgotPassword">
            <div class="space-y-4">
              <UFormField label="Email" name="email" required>
                <UInput v-model="state.email" type="email" color="neutral" size="lg" class="w-full" />
              </UFormField>
            </div>
          </UForm>
          
          <div class="flex items-center justify-between">
            <p class="text-xs">Remember your password? <ULink to="/auth/sign-in" class="cursor-pointer">Sign in</ULink></p>
    
            <UButton
              type="submit"
              form="forgotPasswordForm"
              size="md"
              color="neutral"
              class="font-semibold cursor-pointer"
            >
              Reset Password
            </UButton>
          </div>
        </div>
      </div>
      
      <div class="w-3/5 bg-gray-50 hidden lg:flex items-center justify-center p-10 relative overflow-hidden">
        <div class="absolute left-0 top-0 w-[80%] h-full opacity-30">
          <DotPattern />
        </div>
        
        <div class="w-[140%] max-w-none transform translate-x-[10%] rounded-2xl shadow-md overflow-hidden relative z-10">
          <div class="w-full p-2 bg-neutral-50 border border-neutral-200/70 rounded-2xl backdrop-blur-lg">
            <div class="w-full bg-white border border-neutral-200 rounded-xl">
              <img src="~/assets/images/post_preview.png" class="rounded-xl">
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { object, string, type InferType } from 'yup'
  import type { FormSubmitEvent } from '@nuxt/ui'

  definePageMeta({
    path: '/auth/forgot-password',
    layout: 'auth',
    middleware: ['logged-in']
  })

  const runtimeConfig = useRuntimeConfig()
  const { authClient } = useAuthClient()

  const state = ref({
    email: ''
  })

  const schema = object({
    email: string().email('Email must be a valid email').required('Email field is required!')
  })

  type Schema = InferType<typeof schema>

  async function handleForgotPassword(event: FormSubmitEvent<Schema>) {
    const { SSL_PREFIX, BASE_URL } = runtimeConfig.public
    
    const { error } = await authClient.requestPasswordReset({
      email: event.data.email,
      redirectTo: `${SSL_PREFIX}://${BASE_URL}/auth/reset-password`
    })

    if (!error) {
      await navigateTo('/auth/sign-in')
    }
  }
</script>