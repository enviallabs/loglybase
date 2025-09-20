<template>
  <div>
    <div v-if="project" class="border-b border-gray-100 pb-6">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SectionHeading
          title="Project Information"
          description="Basic details about your project"
        />
        
        <div class="col-span-2 space-y-4">
          <UFormField label="Project Name" name="name">
            <UInput
              v-model="projectData.name"
              size="lg"
              color="neutral"
              class="w-full"
            />
          </UFormField>
          
          <UFormField label="Description" name="description">
            <UTextarea
              v-model="projectData.description"
              color="neutral"
              class="w-full"
              :rows="3"
            />
          </UFormField>
          
          <div class="flex items-center space-x-4 mb-4">
            <div class="relative">
              <div class="w-16 h-16 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                <img v-if="previewLogo" :src="previewLogo" alt="Project Logo" class="w-full h-full object-cover">
                <UIcon v-else name="i-hugeicons-image-01" class="w-10 h-10 text-gray-400" />
              </div>
              
              <div class="absolute -bottom-2 -right-2">
                <UInput 
                  id="logo-upload" 
                  type="file" 
                  accept="image/*" 
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                  @change="handleLogoUpload"
                />
                <UButton
                  icon="i-hugeicons-pencil-edit-01"
                  color="neutral"
                  size="sm"
                  type="button"
                />
              </div>
            </div>
            
            <div>
              <p class="text-sm font-medium">Project Logo</p>
              <p class="text-xs text-gray-400">Recommended size: 512x512px</p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex justify-end">
        <UButton
          color="neutral"
          @click="saveProjectSettings"
        >
          Save Changes
        </UButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const toast = useToast()
  const projectStore = useProjectStore()
  const { updateProject } = useProject()

  const project = computed(() => projectStore.project)

  const projectData = ref({
    name: project.value?.name || '',
    description: project.value?.description || '',
    logo: project.value?.logo || '',
    slug: project.value?.slug || '',
  })
  const previewLogo = ref<string | null>(project.value?.logo || null)
  const logoFile = ref<File | null>(null)

  function handleLogoUpload(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files
    
    if (files && files.length > 0) {
      const file = files[0]
      
      if (file.type.startsWith('image/')) {
        logoFile.value = file
        
        const reader = new FileReader()
        reader.onload = (e) => {
          previewLogo.value = e.target?.result as string
          projectData.value.logo = e.target?.result as string
        }
        reader.readAsDataURL(file)
      } else {
        toast.add({
          title: 'Oops',
          description: 'Please select an image file',
          color: 'error',
          icon: 'i-hugeicons-cancel-circle',
          duration: 1500
        })
      }
    }
  }

  async function saveProjectSettings() {
    if (projectData.value.name === '') {
      toast.add({
        title: 'Oops',
        description: 'Project name is required',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })

      return
    }

    if (projectData.value.name.length > 100) {
      toast.add({
        title: 'Oops',
        description: 'Project name must be at most 100 characters',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })

      return
    }

    if (!projectData.value.name.match(/^[A-Za-z\s-]+$/)) {
      toast.add({
        title: 'Oops',
        description: 'Project name can only contain letters, spaces and hyphens',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })

      return
    }
    
    await updateProject(projectStore.project?.code || '', {
      ...projectData.value,
    }).then(() => {
      toast.add({
        title: 'Success',
        description: 'Project settings saved',
        color: 'success',
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500
      })
    })
  }
</script>