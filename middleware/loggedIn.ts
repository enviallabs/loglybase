import type { User } from 'better-auth'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  if (import.meta.server) return

  const user = await $fetch<User & { onboardingCompleted: boolean }>(
    '/api/user',
  )

  if (user) {
    if (!user?.onboardingCompleted && to.path !== '/get-started') {
      return navigateTo('/get-started')
    }

    if (user.onboardingCompleted && to.path === '/get-started') {
      return navigateTo(`/projects`)
    }

    if (to.path === '/auth/sign-in' || to.path === '/auth/sign-up') {
      return navigateTo(`/projects`)
    }
  }
})
