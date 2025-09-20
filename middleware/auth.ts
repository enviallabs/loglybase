export default defineNuxtRouteMiddleware(async (_to, _from) => {
  if (import.meta.server) return

  const { authClient } = useAuthClient()

  const { data } = await authClient.getSession()

  if (!data?.user.id) {
    return navigateTo('/auth/sign-in')
  }
})
