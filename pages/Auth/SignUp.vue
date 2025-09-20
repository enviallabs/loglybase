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
          
          <h1 class="text-2xl font-semibold">Create an account</h1>
  
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
          
          <UForm id="signUpForm" :schema="schema" :state="state" class="space-y-6" @submit="handleCreateAccount">
            <div class="space-y-4">
              <UFormField label="Username" name="name" class="w-full" required>
                <UInput
                  v-model="state.name"
                  color="neutral"
                  size="lg"
                  class="w-full"
                />
              </UFormField>
      
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
                  :color="color"
                  :aria-invalid="score < 4"
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

                <template #help>
                  <UPopover mode="hover" :ui="{ content: 'rounded-xl' }">
                    <UButton icon="i-hugeicons-information-circle" color="neutral" variant="link" square>Password requirements</UButton>

                    <template #content>
                      <div class="p-4 space-y-2">
                        <UProgress
                          :color="color"
                          :indicator="text"
                          :model-value="score"
                          :max="4"
                          size="sm"
                        />
          
                        <p id="password-strength" class="text-sm font-medium">
                          {{ text }}. Must contain:
                        </p>
          
                        <ul class="space-y-1" aria-label="Password requirements">
                          <li
                            v-for="(req, index) in strength"
                            :key="index"
                            class="flex items-center gap-0.5"
                            :class="req.met ? 'text-success' : 'text-muted'"
                          >
                            <UIcon :name="req.met ? 'i-hugeicons-checkmark-circle-02' : 'i-hugeicons-cancel-circle'" class="size-4 shrink-0" />
          
                            <span class="text-xs font-light">
                              {{ req.text }}
                              <span class="sr-only">
                                {{ req.met ? ' - Requirement met' : ' - Requirement not met' }}
                              </span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </template>
                  </UPopover>
                </template>
              </UFormField>
            </div>
          </UForm>
          
          <UButton
            type="submit"
            form="signUpForm"
            size="xl"
            color="neutral"
            class="font-semibold cursor-pointer"
            block
          >
            Create an account
          </UButton>

          <p class="text-xs text-center">Already have an account? <ULink to="/auth/sign-in" class="cursor-pointer">Sign In</ULink></p>
        </div>

        <div class="flex flex-col items-center text-xs space-y-4">
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
              <img src="~/assets/images/editor.png" class="rounded-xl" />
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
    path: '/auth/sign-up',
    layout: 'auth',
    middleware: ['logged-in']
  })

  const { authClient } = useAuthClient()
  const router = useRouter()

  const showPassword = ref(false)
  const state = ref({
    name: '',
    email: '',
    password: '',
  })
  const hasError = ref(false)
  const errorMessage = ref('')

  const schema = object({
    name: string().required('Username field is required!'),
    email: string().email('Email must be a valid email').required('Email field is required!'),
    password: string().min(8, 'Password must be at least 8 characters').required('Password field is required!'),
  })

  type Schema = InferType<typeof schema>

  function checkStrength(str: string) {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /\d/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    ]

    return requirements.map(req => ({ met: req.regex.test(str), text: req.text }))
  }

  const strength = computed(() => checkStrength(state.value.password))
  const score = computed(() => strength.value.filter(req => req.met).length)

  const color = computed(() => {
    if (score.value === 0) return 'neutral'
    if (score.value <= 1) return 'error'
    if (score.value <= 2) return 'warning'
    if (score.value === 3) return 'warning'
    return 'success'
  })

  const text = computed(() => {
    if (score.value === 0) return 'Enter a password'
    if (score.value <= 2) return 'Weak password'
    if (score.value === 3) return 'Medium password'
    return 'Strong password'
  })

  async function handleCreateAccount(event: FormSubmitEvent<Schema>) {
    await authClient.signUp.email({
      name: event.data.name.toLowerCase().trim().replace(/\s+/g, ''),
      email: event.data.email,
      password: event.data.password,
    }, {
      onSuccess: async () => {
        await router.push('/get-started')
      },
      
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