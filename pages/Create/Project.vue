<template>
  <ClientOnly>
    <GridPattern
      :squares="[
        [4, 4],
        [5, 1],
        [8, 2],
        [5, 3],
        [5, 5],
        [10, 10],
        [15, 15],
        [20, 13],
        [25, 16],
        [28, 12],
        [26, 5],
        [24, 3]
      ]"
      stroke-dasharray="4 2"
      class="opacity-70"
    />

    <div class="container absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-xl px-4 md:px-0 h-full flex items-center justify-center">
      <div class="w-full p-1 bg-neutral-100 border border-neutral-200 rounded-2xl">
        <div class="w-full bg-white border border-neutral-200 px-5 py-4 rounded-xl">
          <h1 class="text-xl font-semibold">Create project</h1>
          <p class="text-sm text-gray-400 mb-4">Create the changelog for your next successful project.</p>
          
          <UForm :state="state" :schema="schema" class="space-y-4" @submit="handleSubmit">
            <div class="flex items-end space-x-4">
              <div class="relative">
                <div class="w-13 h-13 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
                  <img v-if="previewLogo" :src="previewLogo" alt="Project Logo" class="bg-white w-full h-full object-cover">
                  <UIcon v-else name="i-hugeicons-image-01" class="text-2xl text-gray-400" />
                </div>
                
                <div class="absolute top-0 left-0 w-full h-full">
                  <UInput 
                    id="logo-upload" 
                    type="file" 
                    accept="image/*" 
                    class="absolute inset-0 w-full h-full opacity-0 z-10" 
                    @change="handleLogo"
                  />
                  <UButton
                    icon="i-hugeicons-pencil-edit-01"
                    color="neutral"
                    size="sm"
                    type="button"
                    class="absolute inset-0 w-full h-full opacity-0 z-0"
                  />
                </div>
              </div>
              
              <UFormField label="Project Name" name="name" class="w-full" required>
                <UInput
                  v-model="state.name"
                  color="neutral"
                  class="w-full"
                  autocomplete="off"
                />
              </UFormField>
            </div>
            
            <UFormField label="Description" name="description" class="mt-4">
              <UTextarea
                v-model="state.description"
                color="neutral"
                class="w-full"
                :rows="3"
              />
            </UFormField>
            
            <div class="flex justify-end space-x-2 pt-4">
              <UButton
                color="neutral"
                variant="ghost"
                @click="router.back()"
              >
                Back
              </UButton>
              
              <UButton
                type="submit"
                color="neutral"
                :loading="isSubmitting"
              >
                Create
              </UButton>
            </div>
          </UForm>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { object, string, type InferType } from 'yup'
  import type { FormSubmitEvent } from '@nuxt/ui'

  definePageMeta({
    middleware: ['auth'],
    layout: 'projects'
  })

  const router = useRouter()
  const { createProject } = useProject()
  const projectStore = useProjectStore()
  const toast = useToast()

  const isSubmitting = ref(false)
  const previewLogo = ref()

  const state = ref({
    name: '',
    description: '',
  })

  const schema = object({
    name: string()
      .max(100, 'Project name must be at most 100 characters')
      .matches(/^[A-Za-z\s-]+$/, 'Project name must contain only letters, spaces, and hyphens')
      .required('Project name is required'),
    description: string(),
  })

  type Schema = InferType<typeof schema>

  function handleLogo(event: Event) {
    const target = event.target as HTMLInputElement
    const files = target.files
    
    if (files && files.length > 0) {
      const file = files[0]
      
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()

        reader.onload = (e) => {
          previewLogo.value = e.target?.result as string
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

  async function handleSubmit(event: FormSubmitEvent<Schema>) {
    await createProject({
      name: event.data.name,
      description: event.data.description,
      logo: previewLogo.value,
      meta: {
        heading: 'Changelog',
        subheading: `Follow new updates and improvements of ${event.data.name}`,
      },
    }).then(() => {
      navigateTo(`/project/${projectStore.project?.code}/posts`)
    })
  }
</script>