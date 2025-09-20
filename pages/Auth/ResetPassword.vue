<template>
  <ClientOnly>
    <div class="h-screen flex">
      <div class="bg-white w-full lg:w-2/5 p-20 flex flex-col">
        <AppLogo class="w-fit" />
        
        <div class="flex-grow flex flex-col justify-center max-w-md w-full mx-auto space-y-6">
          <div class="space-y-2">
            <h1 class="text-2xl font-semibold">Reset Password</h1>
            <p class="text-gray-500 text-sm">Enter your new password and confirm it</p>
          </div>
    
          <UForm id="resetPasswordForm" :schema="schema" :state="state" class="space-y-6" @submit="handleResetPassword">
            <div class="space-y-4">
              <UFormField label="Password" name="password" required>
                <UInput v-model="state.password" type="password" color="neutral" size="lg" class="w-full" />
              </UFormField>
              <UFormField label="Password Confirmation" name="password_confirmation" required>
                <UInput v-model="state.password_confirmation" type="password" color="neutral" size="lg" class="w-full" />
              </UFormField>
            </div>
          </UForm>
          
          <div class="flex items-center justify-between">
            <UButton
              type="submit"
              form="resetPasswordForm"
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
  import { object, string, ref as yupRef, type InferType } from 'yup'
  import type { FormSubmitEvent } from '@nuxt/ui'

  definePageMeta({
    path: '/auth/reset-password',
    layout: 'auth',
    middleware: ['logged-in']
  })

  const { query } = useRoute()
  const { authClient } = useAuthClient()

  onMounted(async () => {
    if (!query.token) {
      return await navigateTo('/auth/sign-in')
    }
  })

  const state = ref({
    password: '',
    password_confirmation: ''
  })

  const schema = object({
    password: string().required('Password field is required!'),
    password_confirmation: string()
      .oneOf([yupRef('password')], 'Passwords must match')
      .required('Password confirmation field is required!')
  })

  type Schema = InferType<typeof schema>

  async function handleResetPassword(event: FormSubmitEvent<Schema>) {
    const { error } = await authClient.resetPassword({
      newPassword: event.data.password,
      token: query.token as string
    })

    if (!error) {
      await navigateTo('/auth/sign-in')
    }
  }
</script>