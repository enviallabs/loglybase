<template>
  <ClientOnly>
    <div>
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
      />

      <UButton
        icon="i-hugeicons-logout-03"
        color="neutral"
        variant="subtle"
        class="absolute right-2 top-2 cursor-pointer"
        @click="handleLogout"
      >
        Logout
      </UButton>
  
      <div class="container absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 max-w-xl h-full flex items-center justify-center">
        <div class="w-full p-1 bg-neutral-100 border border-neutral-200 rounded-2xl">
          <div class="w-full bg-white border border-neutral-200 px-5 py-4 rounded-xl">
            <h1 class="text-xl font-bold">Welcome to Loglybase!</h1>
            <p class="text-sm text-gray-500 mb-4">Let's create your first project to get started</p>

            <UForm id="createProject" :state="state" class="space-y-4" @submit="handleCreateProject">
              <UFormField label="Project Name" name="name" required>
                <UInput
                  v-model="state.name"
                  color="neutral"
                  class="w-full"
                  autocomplete="off"
                />
              </UFormField>
              
              <UFormField label="Description" name="description" class="mt-4">
                <UTextarea
                  v-model="state.description"
                  color="neutral"
                  class="w-full"
                  :rows="3"
                />
              </UFormField>

              <div class="flex justify-end pt-4">
                <UButton
                  type="submit"
                  form="createProject"
                  color="neutral"
                  :loading="loading"
                  size="lg"
                  class="cursor-pointer"
                >
                  Create Project
                </UButton>
              </div>
            </UForm>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  definePageMeta({
    path: '/get-started',
    layout: 'get-started',
    middleware: ['auth', 'logged-in']
  })

  const router = useRouter()
  const toast = useToast()
  const { authClient } = useAuthClient()
  const { createProject } = useProject()
  const projectStore = useProjectStore()
  
  const state = ref({
    name: '',
    description: '',
  })
  const loading = ref(false)

  async function handleCreateProject() {
    loading.value = true
    
    try {
      await createProject({
        ...state.value,
        meta: {
          heading: 'Changelog',
          subheading: `Follow new updates and improvements of ${state.value.name}`,
        }
      })

      toast.add({
        title: 'Project created!',
        description: 'Your first project has been created successfully',
        color: 'success',
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500
      })
      
      await navigateTo(`/project/${projectStore.project?.code}/posts`)
    } catch (error) {
      console.error('Failed to create project:', error)
      
      toast.add({
        title: 'Oops',
        description: 'Failed to create your project. Please try again.',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })
    } finally {
      loading.value = false
    }
  }

  async function handleLogout() {
    await authClient.signOut()
    await router.push('/auth/sign-in')
  }
</script>