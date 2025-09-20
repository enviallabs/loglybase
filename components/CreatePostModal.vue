<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'rounded-2xl'
    }"
  >
    <UButton 
      color="neutral"
      icon="i-hugeicons-plus-sign" 
      class="cursor-pointer"
    >
      Create post
    </UButton>
    
    <template #content>
      <div class="p-4 w-full">
        <div>
          <h1 class="text-lg text-gray-800 font-semibold">Create post</h1>
          <p class="text-sm text-gray-400 mb-4">Keep your users informed about the latest updates.</p>
        </div>
        
        <UForm
          :state="state"
          :schema="schema"
          class="space-y-4"
          @submit="handleSubmit"
        >
          <UFormField label="Title" name="title" required>
            <UInput
              v-model="state.title"
              size="lg"
              color="neutral"
              placeholder="Enter post title"
              class="w-full"
            />
          </UFormField>
          
          <div class="flex justify-end space-x-2 pt-4">
            <UButton
              color="neutral"
              variant="ghost"
              @click="isOpen = false"
            >
              Cancel
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
    </template>
  </UModal>
</template>

<script setup lang="ts">
  import type { CreatePostInput } from '~/types/post'
  import { object, string, type InferType } from 'yup'
  import type { FormSubmitEvent } from '@nuxt/ui'

  enum PostStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED'
  }

  const toast = useToast()
  const { code, createPost } = usePost()
  const projectStore = useProjectStore()
  
  const isOpen = ref(false)
  const isSubmitting = ref(false)

  const state = ref<Omit<CreatePostInput, 'layout'>>({
    title: '',
  })

  const schema = object({
    title: string()
      .max(100, 'Post title must be at most 100 characters')
      .required('Post title is required'),
  })

  type Schema = InferType<typeof schema>

  async function handleSubmit(event: FormSubmitEvent<Schema>) {
    isSubmitting.value = true
    
    try {
      await createPost({
        title: event.data.title,
        status: PostStatus.DRAFT,
      })

      state.value.title = ''
      isOpen.value = false

      toast.add({
        title: 'Success',
        description: 'Post created successfully',
        color: 'success',
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500
      })

      await navigateTo(`/project/${projectStore.project?.code}/post/${code.value}`)
    } catch (_) {
      toast.add({
        title: 'Oops',
        description: 'Failed to create post',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })
    } finally {
      isSubmitting.value = false
    }
  }
</script>