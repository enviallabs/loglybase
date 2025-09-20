<template>
  <Html lang="en">
    <Head>
      <Font
        font-family="Inter"
        :web-font="{
          url: 'https://fonts.gstatic.com/s/inter/v19/UcCo3FwrK3iLTcvvYwYZ8UA3J58.woff2',
          format: 'woff2'
        }"
        :font-weight="500"
        font-style="normal"
      />
      <Font
        font-family="Share Tech"
        :web-font="{
          url: 'https://fonts.gstatic.com/s/sharetech/v22/7cHtv4Uyi5K0OeZ7bohU8H0JmBUhfrE.woff2',
          format: 'woff2'
        }"
        :font-weight="500"
        font-style="normal"
      />
    </Head>

    <Tailwind>
      <div class="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div class="px-6 py-4">
          <table cellpadding="0" cellspacing="0" border="0">
            <tbody>
              <tr>
                <td valign="middle" style="padding-right: 8px;">
                  <Img src="https://loglybase.com/logo.png" width="28" height="28" style="display: block;" />
                </td>
                <td valign="middle">
                  <Text class="text-2xl font-bold" style="font-family: 'Share Tech', monospace; margin: 0; line-height: 32px;">Loglybase</Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="px-6 py-2">
          <Text class="text-2xl font-bold text-gray-900 mb-4" style="font-family: 'Inter', sans-serif;">
            Verify your account
          </Text>
          
          <Text class="text-gray-700 mb-4" style="font-family: 'Inter', sans-serif;">
            Hello {{ name }},
          </Text>
          
          <Text class="text-gray-600 mb-4 leading-relaxed" style="font-family: 'Inter', sans-serif;">
            Welcome to Loglybase! We're excited to have you on board. To get started, please verify your email address by clicking the button below.
          </Text>
          
          <Text class="text-gray-600 mb-6 leading-relaxed" style="font-family: 'Inter', sans-serif;">
            If you didn't create an account with us, you can safely ignore this email.
          </Text>
          
          <div class="text-center mb-6">
            <Button 
              :href="url" 
              class="bg-neutral-900 text-white px-8 py-4 rounded-lg text-lg shadow-lg"
              style="font-family: 'Inter', sans-serif;"
            >
              <span class="font-semibold">Verify Your Account</span>
            </Button>
          </div>
  
          <Hr />
          
          <div class="">
            <Text class="text-gray-500 text-sm leading-relaxed" style="font-family: 'Inter', sans-serif;">
              If the button doesn't work, you can copy and paste this link into your browser:
            </Text>
            <Text class="text-blue-600 text-sm break-all mt-2" style="font-family: 'Inter', sans-serif;">
              {{ url }}
            </Text>
          </div>
        </div>
        
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <Text class="text-gray-500 text-sm text-center" style="font-family: 'Inter', sans-serif;">
            This email was sent by Loglybase. If you have any questions, please contact our support team at <a href="mailto:support@loglybase.com" class="text-blue-600">support@loglybase.com</a>.
          </Text>
          
          <Text class="text-gray-400 text-xs text-center mt-2" style="font-family: 'Inter', sans-serif;">
            © 2025 Loglybase. All rights reserved.
          </Text>
        </div>
      </div>
    </Tailwind>
  </Html>
</template>

<script setup lang="ts">
  import {
    Html,
    Head,
    Font,
    Tailwind,
    Img,
    Text,
    Button,
    Hr
  } from '@vue-email/components'

  defineProps<{
    name: string
    url: string
  }>()
</script>