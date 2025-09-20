<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionHeading
        title="Headings"
        description="Customize the headings of your changelog page"
      />
      
      <div class="col-span-2 space-y-4">
        <UFormField label="Heading">
          <UInput
            v-model="headings.heading"
            size="lg"
            color="neutral"
            class="w-full"
          />
        </UFormField>
        
        <UFormField label="Subheading">
          <UInput
            v-model="headings.subheading"
            size="lg"
            color="neutral"
            class="w-full"
          />
        </UFormField>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const emits = defineEmits(['update:headings'])

  const projectStore = useProjectStore()

  const project = computed(() => {
    return projectStore.project
  })

  const headings = ref({
    heading: 'Changelog',
    subheading: `Follow new updates and improvements of ${project.value?.name}`,
  })

  onMounted(() => {
    headings.value.heading = project.value?.meta?.heading || 'Changelog'
    headings.value.subheading = project.value?.meta?.subheading || `Follow new updates and improvements of ${project.value?.name}`
  })

  watch(() => headings.value, (newHeadings) => {
    emits('update:headings', newHeadings)
  })
</script>