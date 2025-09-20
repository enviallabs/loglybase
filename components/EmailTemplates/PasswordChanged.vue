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
          <table cellpadding="0" cellspacing="0" style="border: none;">
            <tbody>
              <tr>
                <td style="vertical-align: middle; padding-right: 8px;">
                  <Img src="https://loglybase.com/logo.png" width="28" height="28" style="display: block;" />
                </td>
                <td style="vertical-align: middle;">
                  <Text class="text-2xl font-bold" style="font-family: 'Share Tech', monospace; margin: 0; line-height: 32px;">Loglybase</Text>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="px-6 py-2">
          <Text style="font-family: 'Inter', sans-serif; font-size: 24px; font-weight: bold; color: #111827; margin-bottom: 16px;">
            Password Changed
          </Text>
          
          <Text style="font-family: 'Inter', sans-serif; color: #374151; margin-bottom: 16px;">
            Hello {{ name }},
          </Text>
          
          <Text style="font-family: 'Inter', sans-serif; color: #4B5563; margin-bottom: 16px; line-height: 1.6;">
            Your password has been changed. If you didn't change your password, please contact our support team.
          </Text>
        </div>
        
        <div class="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <Text style="font-family: 'Inter', sans-serif; color: #6B7280; font-size: 14px; text-align: center;">
            This email was sent by Loglybase. If you have any questions, please contact our support team at <a href="mailto:support@loglybase.com" style="color: #2563EB;">support@loglybase.com</a>.
          </Text>
          
          <Text style="font-family: 'Inter', sans-serif; color: #9CA3AF; font-size: 12px; text-align: center; margin-top: 8px;">
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
  } from '@vue-email/components'

  defineProps<{
    name: string
  }>()
</script>