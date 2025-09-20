<template>
  <ClientOnly>
    <div>
      <PublicPreview
        :is-widget-view="true"
        :with-header="false"
        :project-slug="project.slug"
        :posts="postList"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'preview',
  })

  const { params } = useRoute()
  const { widgetProject, getForWidget } = useProject()
  const { postList, getPublic } = usePost()

  await getForWidget(params.id as string)

  const project = computed(() => {
    return widgetProject.value
  })

  watchEffect(async () => {
    if (project.value) {
      await getPublic(project.value.slug)
    }
  })
</script>