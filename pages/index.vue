<template>
  <ClientOnly>
    <div v-if="projectSlug">
      <PublicPreview :project-slug="projectSlug" :posts="posts" />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'preview',
  })

  useSeoMeta({
    title: 'Home',
    description: 'Beautiful, customizable changelogs that keep users engaged and excited about your latest features.'
  })
  
  const config = useRuntimeConfig()
  const colorMode = useColorMode()
  const projectStore = useProjectStore()
  const { getPublic } = usePost()

  onMounted(async () => {
    await navigateTo('/auth/sign-in')
  })

  const projectSlug = computed(() => {
    return projectStore.slug
  })

  const project = computed(() => {
    return projectStore.project
  })

  watch(project, async () => {
    const host = window.location.host

    if (host === config.public.BASE_URL) {
      colorMode.preference = 'light'
    } else {
      colorMode.preference = project.value?.theme?.toLowerCase() || 'light'

      useHead(() => {
        return {
          link: [
            {
              rel: 'icon',
              type: 'image/svg+xml',
              href: project.value?.logo
            }
          ],
        }
      })

      useSeoMeta({
        title: project.value?.name,
        description: project.value?.description
      })
    }
  })

  watchEffect(async () => {
    if (projectSlug.value) {
      await getPublic(projectSlug.value)
    }
  })

  const posts = computed(() => {
    return projectStore.posts
  })
</script>