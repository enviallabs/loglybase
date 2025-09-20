import type { CreatePostInput, Post } from '~/types/post'

export default function usePost() {
  const projectStore = useProjectStore()
  const code = ref('')
  const postList = ref<Post[]>([])

  const getAll = async (projectCode?: string) => {
    const posts = await $fetch('/api/post', {
      query: {
        projectCode: projectCode || projectStore.project?.code,
      },
    })

    projectStore.setPosts(posts as Post[])
  }

  const getPublic = async (slug?: string) => {
    const posts = await $fetch('/api/post/public', {
      query: {
        slug: slug || projectStore.project?.slug,
      },
    })

    postList.value = posts as Post[]
    projectStore.setPosts(posts as Post[])
  }

  const getOne = async (code: string) => {
    const post = await $fetch(`/api/post/${code}`, {
      query: {
        projectCode: projectStore.project?.code,
      },
    })

    projectStore.setPost(post as Post)
  }

  const createPost = async (payload: CreatePostInput) => {
    const { data, error } = await useFetch('/api/post/create', {
      method: 'POST',
      body: JSON.stringify({
        ...payload,
        projectCode: projectStore.project?.code,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error.value) {
      useToast().add({
        title: 'Oops',
        description: error.value.statusMessage,
        icon: 'i-hugeicons-cancel-circle',
        color: 'error',
        duration: 1500,
      })

      return
    }

    projectStore.appendPost(data.value as Post)
    code.value = (data.value as Post).code
  }

  const updatePost = async (payload: Partial<Post>) => {
    const post = await $fetch(`/api/post/${payload.code}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    } as any)

    projectStore.updatePost(post as Post)
  }

  const publishPost = async (code: string, status: string) => {
    await $fetch(`/api/post/publish/${code}`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    } as any)

    projectStore.updatePostStatus(status)
  }

  const deletePost = async (code: string) => {
    const post = await $fetch(`/api/post/${code}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    } as any)

    projectStore.removePost(post as Post)
  }

  return {
    code,
    postList,
    getAll,
    getPublic,
    getOne,
    createPost,
    updatePost,
    publishPost,
    deletePost,
  }
}
