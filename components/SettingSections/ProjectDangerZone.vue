<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionHeading
        title="Danger Zone"
        description="Irreversible actions for your project"
      />
      
      <div class="col-span-2 space-y-4">
        <div class="border border-red-200 rounded-xl p-4 bg-red-50">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-medium text-red-600">Delete Project</h3>
              <p class="text-xs text-red-500 mt-1">This action cannot be undone</p>
            </div>

            <UModal v-model="confirmDelete">
              <UButton
                color="error"
                variant="subtle"
                class="cursor-pointer"
                @click="confirmDelete = true"
              >
                Delete
              </UButton>
              
              <template #content>
                <div class="p-4 space-y-4">
                  <div>
                    <h3 class="text-lg font-medium">Delete Project</h3>
                    <p class="text-sm text-gray-500">Are you sure you want to delete this project? All data will be permanently removed. This action cannot be undone.</p>
                  </div>
                  
                  <UFormField label="Type project name to confirm" name="confirmName">
                    <UInput
                      v-model="deleteConfirmName"
                      color="neutral"
                      class="w-full"
                      placeholder="Enter project name"
                    />
                  </UFormField>
                  
                  <div class="flex justify-end space-x-2">
                    <UButton
                      color="neutral"
                      variant="ghost"
                      @click="confirmDelete = false"
                    >
                      Cancel
                    </UButton>
                    
                    <UButton
                      color="error"
                      :disabled="deleteConfirmName !== project?.name"
                      @click="handleDeleteProject"
                    >
                      Delete Project
                    </UButton>
                  </div>
                </div>
              </template>
            </UModal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const projectStore = useProjectStore()
  const { deleteProject } = useProject()

  const confirmDelete = ref(false)
  const deleteConfirmName = ref('')

  const project = computed(() => projectStore.project)

  async function handleDeleteProject() {
    await deleteProject(projectStore.project?.code || '')
    
    confirmDelete.value = false
    deleteConfirmName.value = ''

    await navigateTo('/projects')
  }
</script>