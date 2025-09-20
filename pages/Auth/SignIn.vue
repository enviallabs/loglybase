<template>
  <ClientOnly>
    <div class="h-screen flex">
      <div class="bg-white border-r border-neutral-200 w-full lg:w-2/5 p-16 flex flex-col">
        <AppLogo class="w-fit" />
        
        <div class="flex-grow flex flex-col justify-center max-w-md w-full mx-auto space-y-4">
          <div v-if="hasError">
            <UAlert
              title="Failed to sign in"
              :description="errorMessage"
              icon="i-hugeicons-cancel-circle"
              color="error"
              variant="subtle"
            />
          </div>
          
          <h1 class="text-2xl font-semibold">Sign In</h1>

          <div class="flex space-x-2">
            <UButton
              color="neutral"
              variant="solid"
              size="lg"
              leading-icon="i-logos-google-icon"
              block
              class="cursor-pointer"
              @click="handleCreateWithSocial('google')"
            >
              Sign in with Google
            </UButton>
            <UButton
              color="neutral"
              variant="solid"
              size="lg"
              leading-icon="i-hugeicons-github"
              block
              class="cursor-pointer"
              @click="handleCreateWithSocial('github')"
            >
              Sign in with Github
            </UButton>
          </div>

          <USeparator>or</USeparator>
    
          <UForm id="signInForm" :schema="schema" :state="state" class="space-y-6" @submit="handleSignIn">
            <div class="space-y-4">
              <UFormField label="Email" name="email" required>
                <UInput
                  v-model="state.email"
                  type="email"
                  color="neutral"
                  size="lg"
                  class="w-full"
                />
              </UFormField>
      
              <UFormField label="Password" name="password" required>
                <UInput
                  v-model="state.password"
                  :type="showPassword ? 'text' : 'password'"
                  color="neutral"
                  size="lg"
                  class="w-full"
                >
                  <template #trailing>
                    <UButton
                      color="neutral"
                      variant="link"
                      size="sm"
                      :icon="showPassword ? 'i-hugeicons-view-off' : 'i-hugeicons-view'"
                      :aria-label="showPassword ? 'Hide password' : 'Show password'"
                      :aria-pressed="showPassword"
                      aria-controls="password"
                      @click="showPassword = !showPassword"
                    />
                  </template>
                </UInput>

                <template #hint>
                  <ULink to="/auth/forgot-password" class="text-xs cursor-pointer">Forgot password?</ULink>
                </template>
              </UFormField>
            </div>
          </UForm>
          
          <UButton
            type="submit"
            form="signInForm"
            size="xl"
            color="neutral"
            class="font-semibold cursor-pointer"
            block
          >
            Sign in
          </UButton>

          <p class="text-xs text-center">Don't have an account? <ULink to="/auth/sign-up" class="cursor-pointer">Create an account</ULink></p>
        </div>

        <div class="flex flex-col items-center text-xs">
          <p>© 2025 Loglybase</p>
        </div>
      </div>
      
      <div class="w-3/5 bg-gray-50 hidden lg:flex items-center justify-center p-10 relative overflow-hidden">
        <div class="absolute left-0 top-0 w-[80%] h-full opacity-30">
          <DotPattern />
        </div>
        
        <div class="w-[140%] max-w-none transform translate-x-[10%] rounded-2xl shadow-md overflow-hidden relative z-10">
          <div class="w-full p-2 bg-neutral-50 border border-neutral-200/70 rounded-2xl backdrop-blur-lg">
            <div class="w-full bg-white border border-neutral-200 rounded-xl">
              <img src="~/assets/images/preview.png" class="rounded-xl">
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
    path: '/auth/sign-in',
    layout: 'auth',
    middleware: ['logged-in']
  })

  const { authClient } = useAuthClient()

  const showPassword = ref(false)
  const state = ref({
    email: '',
    password: '',
  })
  const hasError = ref(false)
  const errorMessage = ref('')

  const schema = object({
    email: string().email('Email must be a valid email').required('Email field is required!'),
    password: string().required('Password field is required!'),
  })

  type Schema = InferType<typeof schema>

  async function handleSignIn(event: FormSubmitEvent<Schema>) {
    await authClient.signIn.email({
      email: event.data.email,
      password: event.data.password,
      callbackURL: '/projects'
    }, {
      onError: (ctx) => {
        hasError.value = true
        errorMessage.value = ctx.error.message
      }
    })
  }

  async function handleCreateWithSocial(provider: 'github' | 'google') {
    await authClient.signIn.social({
      provider: provider,
      callbackURL: '/get-started'
    })
  }
</script>