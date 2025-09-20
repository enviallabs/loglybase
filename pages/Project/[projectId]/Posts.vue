<template>
  <ClientOnly>
    <div class="container h-full px-4 lg:px-0 mx-auto py-6 max-w-4xl 2xl:max-w-[70%]">
      <div class="flex justify-between items-center mb-6">
        <div>
          <h1 class="text-lg sm:text-xl font-semibold">Posts</h1>
          <p class="text-gray-400 text-xs md:text-sm">Manage and organize your changelog posts</p>
        </div>

        <div class="hidden sm:flex items-center space-x-2">
          <UButton
            :to="linkToProject"
            color="neutral"
            variant="outline"
            icon="i-hugeicons-link-square-02"
            target="_blank"
          >
            Open
          </UButton>
          <CreatePostModal />
        </div>

        <UDropdownMenu :items="actionList" class="sm:hidden">
          <UButton
            icon="i-hugeicons-menu-03"
            color="neutral"
            variant="outline"
            size="xl"
          />
        </UDropdownMenu>
      </div>

      <div class="space-y-6">
        <div class="flex items-center justify-between">
          <UTabs
            v-model="selectedFilter"
            :items="filters"
            :content="false"
            size="sm"
            color="neutral"
            variant="pill"
            :ui="{
              list: 'bg-white border border-neutral-200',
            }"
            class="hidden sm:flex w-2/5"
          />

          <UDropdownMenu :items="mobileFilters" class="sm:hidden">
            <UButton
              icon="i-hugeicons-filter"
              color="neutral"
              variant="outline"
              size="xl"
            />
          </UDropdownMenu>

          <div class="flex items-center space-x-2">
            <UInput
              v-model="searchQuery"
              size="lg"
              color="neutral"
              leading-icon="i-hugeicons-search-01"
              placeholder="Search"
              :ui="{
                base: 'rounded-xl'
              }"
            />
          </div>
        </div>

        <div v-if="filteredPosts.length" class="space-y-5 pb-8">
          <div
            v-for="post in filteredPosts"
            :key="post.id"
            class="relative bg-neutral-100 border border-neutral-200 p-1 rounded-2xl"
          >
            <div class="bg-white border border-neutral-200 p-4 space-y-4 rounded-xl">
              <div class="flex sm:items-center justify-between">
                <div class="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-x-2 sm:space-y-0">
                  <div class="flex sm:hidden">
                    <UBadge
                      :color="post.status === 'PUBLISHED' ? 'success' : 'error'"
                      :icon="
                        post.status === 'PUBLISHED'
                          ? 'i-hugeicons-checkmark-circle-02'
                          : 'i-hugeicons-cancel-circle'
                      "
                      variant="subtle"
                    >
                      {{ post.status }}
                    </UBadge>
                  </div>
                  
                  <h2 class="text-lg font-semibold text-gray-800">
                    {{ post.title }}
                  </h2>

                  <div class="hidden sm:flex items-center space-x-2">
                    <UBadge
                      :color="post.status === 'PUBLISHED' ? 'success' : 'error'"
                      :icon="
                        post.status === 'PUBLISHED'
                          ? 'i-hugeicons-checkmark-circle-02'
                          : 'i-hugeicons-cancel-circle'
                      "
                      variant="subtle"
                    >
                      {{ post.status }}
                    </UBadge>
                  </div>
                </div>

                <div class="space-x-2">
                  <UButton
                    icon="i-hugeicons-pencil-edit-01"
                    color="neutral"
                    variant="subtle"
                    class="cursor-pointer"
                    @click="handleEdit(post.code)"
                  />
                  <UButton
                    icon="i-hugeicons-delete-01"
                    color="error"
                    variant="subtle"
                    class="cursor-pointer"
                    @click="handleDelete(post.code)"
                  />
                </div>
              </div>

              <PreviewContainer
                v-if="post.content.length"
                :meta="post.meta"
                :content="post.content"
                :limit="0"
                :max-elements="5"
                class="p-2"
              />

              <div v-else class="p-5 bg-gray-50 rounded-lg border border-dashed border-gray-200 text-center space-y-2">
                <UIcon name="i-hugeicons-file-01" class="mx-auto text-3xl text-gray-600" />

                <div>
                  <p class="font-medium">Post content is empty</p>
                  <p class="text-sm text-gray-400 mt-1">Click the edit button to add content</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col items-center space-y-4 py-12">
          <div class="text-center">
            <UIcon
              name="i-hugeicons-database-02"
              class="!size-8 mx-auto mb-2"
            />
            <h1 class="font-semibold text-gray-800">No posts found</h1>
            <p class="text-sm text-gray-500">Create your first changelog post.</p>
          </div>

          <CreatePostModal />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  import { LazyCreatePostModal } from '#components'

  definePageMeta({
    middleware: ['auth'],
  })

  const { params } = useRoute()
  const config = useRuntimeConfig()
  const { getOne: getProject, getAll: getProjects } = useProject()
  const { getAll: getPosts, deletePost } = usePost()
  const projectStore = useProjectStore()
  
  const overlay = useOverlay()
  const modal = overlay.create(LazyCreatePostModal)

  onMounted(() => {
    getProjects()
    getProject(params.projectId as string)
    getPosts(params.projectId as string)
  })

  const filters = ref([
    { label: "All" },
    { label: "Published" },
    { label: "Draft" }
  ])
  const selectedFilter = ref("0")
  const searchQuery = ref("")

  const project = computed(() => {
    return projectStore.project
  })
  
  const posts = computed(() => {
    return projectStore.posts
  })

  const mobileFilters = computed(() => {
    return [{
      label: 'All',
      active: selectedFilter.value === '0',
      onClick: () => selectedFilter.value = '0'
    }, {
      label: 'Published',
      active: selectedFilter.value === '1',
      onClick: () => selectedFilter.value = '1'
    }, {
      label: 'Draft',
      active: selectedFilter.value === '2',
      onClick: () => selectedFilter.value = '2'
    }]
  })

  const linkToProject = computed(() => {
    return project.value?.customDomain
      ? `https://${project.value?.customDomain}`
      : `${config.public.SSL_PREFIX}://${project.value?.slug || ''}.${config.public.BASE_URL}/`
  })

  const actionList = ref([{
    label: 'Create post',
    icon: 'i-hugeicons-plus-sign',
    onClick: () => modal.open()
  }, {
    label: 'Open',
    icon: 'i-hugeicons-link-square-02',
    onClick: async () => await navigateTo(linkToProject.value,
      {
        external: true,
        open: {
          target: '_blank',
        },
      },
    ),
  }])

  const filteredPosts = computed(() => {
    let result = posts.value as any[]

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()

      result = result.filter((post) => post.title.toLowerCase().includes(query))
    }

    if (selectedFilter.value === "1") {
      result = result.filter((post) => post.status === "PUBLISHED")
    } else if (selectedFilter.value === "2") {
      result = result.filter((post) => post.status === "DRAFT")
    }

    return result
  })

  async function handleEdit(code: string) {
    await navigateTo(`/project/${project.value?.code}/post/${code}`)
  }

  async function handleDelete(code: string) {
    try {
      await deletePost(code)

      useToast().add({
        title: 'Success',
        description: 'Post deleted successfully',
        color: 'success',
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500
      })
    } catch (_) {
      useToast().add({
        title: 'Oops',
        description: 'Failed to delete post',
        color: 'error',
        icon: 'i-hugeicons-cancel-circle',
        duration: 1500
      })
    }
  }
</script>