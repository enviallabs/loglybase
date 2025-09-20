<template>
  <UCard
    :ui="{
      body: 'sm:p-4'
    }"
    class="hover:ring-2 hover:ring-neutral-900 cursor-pointer"
    @click="openProject(project.code)"
  >
    <div class="flex flex-col space-y-4">
      <div class="flex justify-between">
        <div class="flex items-center space-x-2">
          <img v-if="project.logo" :src="project.logo || ''" class="w-5" >
          <UIcon v-else name="i-hugeicons-package" class="text-2xl" />
          <p class="text-sm font-semibold">{{project.name}}</p>
        </div>

        <UButton
          icon="i-hugeicons-link-square-02"
          color="neutral"
          variant="link"
          size="xs"
          class="cursor-pointer"
          @click.stop="openProjectPage(project)"
        >
          Open page
        </UButton>
      </div>

      <p class="text-xs text-gray-400">Last update: {{ useTimeAgo(project.updatedAt) }}</p>
    </div>
  </UCard>
</template>

<script setup lang="ts">
  defineProps<{
    project: Project
  }>()

  async function openProject(code: string) {
    await navigateTo(`/project/${code}/posts`)
  }

  async function openProjectPage(project: Project) {
    if (project.customDomain) {
      await navigateTo(`https://${project.customDomain}`, {
        external: true,
        open: {
          target: '_blank',
        },
      })

      return
    }

    await navigateTo(`https://${project.slug}.loglybase.com`, {
      external: true,
      open: {
        target: '_blank',
      },
    })
  }
</script>
