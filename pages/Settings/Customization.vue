<template>
  <ClientOnly>
    <div class="flex items-center justify-center px-6 py-6">
      <div class="container mx-auto max-w-4xl 2xl:max-w-[70%] space-y-8">
        <SettingsNavigation class="overflow-auto" />

        <div class="space-y-12">
          <PageHeading
            title="Customization Settings"
            description="Customize the appearance and behavior of your changelog"
          />

          <div class="space-y-6">
            <CustomizeHeadings
              @update:headings="headings = $event"
            />
            <CustomizeTheme
              @update:theme="selectedTheme = $event"
            />
            <CustomizeTypography
              @update:font-family="selectedFontFamily = $event"
              @update:font-size="selectedFontSize = $event"
            />

            <div class="border-b border-gray-100 pb-6">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <h2 class="text-lg font-medium">Custom CSS</h2>
                  <p class="text-sm text-gray-400 mt-1">Add custom styles to your changelog</p>
                </div>
                
                <div class="col-span-2">
                  <UFormField label="Additional Styles">
                    <UTextarea
                      color="neutral"
                      class="w-full font-mono text-sm"
                      :rows="8"
                      placeholder="/* Add your custom CSS here */"
                    />
                  </UFormField>
                </div>
              </div>
            </div>

            <div class="flex justify-end space-x-2 pt-6">
              <UButton
                variant="outline"
                color="neutral"
                class="cursor-pointer"
                @click="handleResetToDefault"
              >
                Reset to Default
              </UButton>
              <UButton
                color="neutral"
                class="cursor-pointer"
                @click="handleSaveChanges"
              >
                Save Changes
              </UButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  definePageMeta({
    middleware: ['auth']
  })

  const projectStore = useProjectStore()
  const { getOne, updateProject } = useProject()

  onMounted(() => {
    getOne(projectStore.project?.code || '')
  })

  const project = computed(() => {
    return projectStore.project
  })
  
  const headings = ref()
  const selectedTheme = ref()
  const selectedFontFamily = ref()
  const selectedFontSize = ref()

  async function handleResetToDefault() {
    await updateProject(project.value?.code || '', {
      meta: {
        heading: 'Changelog',
        subheading: `Follow new updates and improvements of ${project.value?.name}`,
      },
      theme: 'LIGHT',
      fontFamily: 'inter',
      fontSize: 'SMALL',
    }).then(() => {
      useToast().add({
        title: 'Success',
        description: 'Project customization reseted to default',
        color: 'success',
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500
      })
    })
  }

  async function handleSaveChanges() {
    await updateProject(project.value?.code || '', {
      meta: {
        heading: headings.value.heading,
        subheading: headings.value.subheading,
      },
      theme: selectedTheme.value,
      fontFamily: selectedFontFamily.value.value,
      fontSize: selectedFontSize.value,
    }).then(() => {
      useToast().add({
        title: 'Success',
        description: 'Project customization saved',
        color: 'success',
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500
      })
    })
  }
</script>