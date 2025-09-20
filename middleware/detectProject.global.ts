export default defineNuxtRouteMiddleware(async (to) => {
  const server = import.meta.server
  const config = useRuntimeConfig()

  if (server) {
    return
  }

  const host = window.location.host
  const escapedBase = config.public.BASE_URL.replace(/\./g, '\\.')
  const subdomainRegex = new RegExp(`^([a-z0-9-]+)\\.${escapedBase}$`)

  const isSubdomain = subdomainRegex.test(host)
  const isMainDomain = host === config.public.BASE_URL
  const isCustomDomain = !isMainDomain && !isSubdomain

  const allowedPaths = ['/']

  if (isSubdomain) {
    const match = host.match(subdomainRegex)
    const slug = match?.[1] || null

    if (slug) {
      const response = await $fetch<any>(`/api/project/slug/${slug}`)

      if (!response) {
        return navigateTo(
          `${config.public.SSL_PREFIX}://${config.public.BASE_URL}`,
          { external: true },
        )
      }

      const projectStore = useProjectStore()

      projectStore.setSlug(slug)
    }

    if (!allowedPaths.includes(to.path)) {
      return navigateTo('/', { replace: true })
    }

    return
  }

  if (isCustomDomain) {
    try {
      const response = await $fetch<any>(
        `/api/project/domain/resolve?host=${host}`,
      )

      if (response.slug) {
        const projectStore = useProjectStore()

        projectStore.setSlug(response.slug)
      }

      if (!allowedPaths.includes(to.path)) {
        return navigateTo('/', { replace: true })
      }

      return
    } catch (_) {
      return navigateTo(
        `${config.public.SSL_PREFIX}://${config.public.BASE_URL}`,
        { external: true },
      )
    }
  }
})
