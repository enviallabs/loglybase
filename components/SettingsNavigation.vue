<template>
  <UNavigationMenu
    :items="links"
    highlight
    :ui="{
      item: 'first:min-w-8 sm:first:min-w-0 min-w-fit sm:min-w-0'
    }"
    class="data-[orientation=horizontal]:border-b border-default data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-48"
  />
</template>

<script setup lang="ts">
  const projectStore = useProjectStore()

  const links = computed(() => {
    const currentProject = projectStore.project

    if (!currentProject) {
      return [{
        icon: 'i-hugeicons-arrow-left-02',
        onClick: async () => await navigateTo(`/projects`)
      }, {
        label: 'Profile',
        to: '/settings/profile',
      }, {
        label: 'API',
        to: '/settings/api',
      }]
    }
    
    return [{
      icon: 'i-hugeicons-arrow-left-02',
      onClick: async () => await navigateTo(`/project/${projectStore.project?.code}/posts`)
    }, {
      label: 'Profile',
      to: '/settings/profile',
    }, {
      label: 'Projects',
      to: '/settings/project',
    }, {
      label: 'Customization',
      to: '/settings/customization',
    }, {
      label: 'API',
      to: '/settings/api',
    }, {
      label: 'Components',
      to: '/settings/components',
    }]
  })
</script>