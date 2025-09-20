<template>
  <ClientOnly>
    <div class="flex flex-col space-x-2">
      <div class="fixed bg-white border-b border-gray-200 flex items-center justify-between w-full px-2 sm:px-8 py-3 z-50">
        <UButton
          icon="i-hugeicons-arrow-left-01"
          variant="ghost"
          size="xl"
          class="cursor-pointer"
          @click="router.back()"
        />
        
        <div class="flex items-center space-x-2 text-sm">
          <p 
            contenteditable 
            class="outline-none focus:border-b border-gray-300 px-1"
            @blur="handleUpdateTitle(($event.target as any).textContent)"
            @keydown.enter.prevent="($event.target as any).blur()"
          >{{ post?.title }}</p>
          <UIcon v-if="isSaving" name="svg-spinners-pulse-3" class="text-emerald-500" />
          <UIcon v-else name="i-hugeicons-floppy-disk" />
        </div>

        <div class="hidden sm:flex space-x-1">
          <UButton
            icon="i-hugeicons-view"
            class="cursor-pointer"
            @click="isPreviewMode = !isPreviewMode"
          >
            {{ isPreviewMode ? 'Editor' : 'Preview'  }}
          </UButton>
          
          <UButton
            v-if="post?.status === 'DRAFT'"
            color="neutral"
            icon="i-hugeicons-sent"
            class="cursor-pointer"
            @click="handlePublish('PUBLISHED')"
          >
            Publish
          </UButton>

          <UButton
            v-else
            color="neutral"
            icon="i-hugeicons-pencil-edit-01"
            class="cursor-pointer"
            @click="handlePublish('DRAFT')"
          >
            Draft
          </UButton>
        </div>
        
        <div class="sm:hidden space-x-1">
          <UDropdownMenu :items="actions">
            <UButton
              icon="i-hugeicons-menu-03"
              color="neutral"
              variant="outline"
              size="xl"
            />
          </UDropdownMenu>
        </div>
      </div>
      
      <div id="editor" class="w-full flex mt-14 my-0 mx-auto p-4 sm:p-10 space-x-2">
        <div v-if="!isPreviewMode" class="flex w-full sm:space-x-2">
          <EditorSidebar class="hidden sm:block" />
          
          <div v-if="post" class="w-full flex flex-col space-y-2">
            <Version
              :content="post.meta || {}"
              class="border border-gray-200 rounded-xl p-2"
              @content-update="updateMeta"
            />

            <EditorContainer
              :content="post.content"
              class="w-full flex flex-1"
              @content-update="updateContent"
            />
          </div>
        </div>

        <div v-if="isPreviewMode" class="w-full lg:max-w-4xl mx-auto bg-white border border-gray-200 p-10 rounded-xl">
          <PreviewContainer
            :meta="post?.meta"
            :content="post?.content"
          />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import type { VersionContent } from '~/types/elements'

  definePageMeta({
    middleware: ['auth']
  })

  const { params } = useRoute()
  const router = useRouter()
  const { getOne, updatePost, publishPost } = usePost()
  const projectStore = useProjectStore()

  onMounted(async () => {
    await getOne(params.postId as string)
  })

  const isSaving = ref(false)
  const isPreviewMode = ref(false)

  const post = computed(() => {
    return projectStore.post
  })
  
  const actions = computed(() => {
    return [{
      label: post.value?.status === 'DRAFT' ? 'Publish' : 'Draft',
      icon: post.value?.status === 'DRAFT' ? 'i-hugeicons-sent' : 'i-hugeicons-pencil-edit-01',
      onClick: () => {
        handlePublish(post.value?.status === 'DRAFT' ? 'PUBLISHED' : 'DRAFT')
      }
    }, {
      label: isPreviewMode.value ? 'Editor' : 'Preview',
      icon: 'i-hugeicons-view',
      onClick: () => isPreviewMode.value = !isPreviewMode.value
    }]
  })

  function handleUpdateTitle(title: string) {
    if (title && title !== post.value?.title) {
      isSaving.value = true
      
      updatePost({
        code: params.postId as string,
        title: title,
        content: post.value?.content
      }).then(() => {
        setTimeout(() => isSaving.value = false, 1000)
      })
    }
  }

  async function updateMeta(meta: VersionContent) {
    if (meta.version === '' || meta.date === null) {
      useToast().add({
        title: 'Oops',
        description: 'Version name and date are required',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })
    }

    await updatePost({
      code: params.postId as string,
      title: post.value?.title,
      meta,
    })
  }
  
  function updateContent(content: any) {
    debounceUpdate(content)
  }

  const debounceUpdate = useDebounceFn(async (content) => {
    isSaving.value = true
    
    await updatePost({
      code: params.postId as string,
      title: post.value?.title,
      content,
    }).then(() => {
      setTimeout(() => isSaving.value = false, 1000)
    })
  }, 1000)

  function handlePublish(status: string) {
    const meta = post.value?.meta
    const hasMeta = meta.version
      && meta.version !== ''
      && meta.date
      && meta.date !== null
    
    if (status === 'PUBLISHED' && !hasMeta) {
      if (!hasMeta) {
        useToast().add({
          title: 'Oops',
          description: 'Version title and date are required',
          color: 'error',
          icon: 'i-hugeicons-cancel-circle',
          duration: 1500
        })

        return
      }
    }

    publishPost(params.postId as string, status)
  }
</script>

<style>
  .flip-list-move {
    transition: transform 0.5s;
  }
</style>