<template>
  <ClientOnly>
    <div class="p-8 space-y-5">
      <UButton
        icon="i-hugeicons-plus-sign"
        color="neutral"
        class="cursor-pointer"
        to="/create/project"
      >
        Create project
      </UButton>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'projects',
    middleware: ['auth', 'logged-in']
  })

  const { getAll: getProjects } = useProject()
  const projectStore = useProjectStore()

  onMounted(() => {
    getProjects()
  })

  const projects = computed(() => projectStore.projects)
</script>