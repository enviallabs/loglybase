import type { Project } from '~/types/project'
import type { Post } from '~/types/post'

export const useProjectStore = defineStore(
  'project',
  () => {
    const projects = ref<Project[]>([])
    const project = ref<Project | null>(null)
    const posts = ref<Post[]>([])
    const post = ref<Post | null>(null)
    const slug = ref<string | null>(null)

    function setProjects(payload: Project[]): void {
      projects.value = Object.assign([], payload)
    }

    function setProject(payload: Project | null): void {
      project.value = payload
    }

    function setPosts(payload: Post[]): void {
      posts.value = Object.assign([], payload)
    }

    function setPost(payload: Post): void {
      post.value = payload
    }

    function appendPost(payload: Post): void {
      posts.value.push(payload)
    }

    function updatePostStatus(payload: string): void {
      const rawPost = JSON.parse(JSON.stringify(post.value))

      rawPost.status = payload

      post.value = rawPost
    }

    function updatePost(payload: Post): void {
      const rawPost = JSON.parse(JSON.stringify(post.value))

      rawPost.meta = payload.meta
      rawPost.content = payload.content

      post.value = rawPost
    }

    function removePost(payload: Post): void {
      const index = posts.value.findIndex((post) => post.id === payload.id)

      posts.value.splice(index, 1)
    }

    function setSlug(payload: string | null): void {
      slug.value = payload
    }

    function removeProject(payload: string): void {
      const index = projects.value.findIndex(
        (project) => project.code === payload,
      )

      if (index !== -1) {
        projects.value.splice(index, 1)

        if (projects.value.length > 0) {
          const nextIndex = index >= projects.value.length ? index - 1 : index

          setProject(projects.value[nextIndex])
        } else {
          setProject(null)
        }
      }
    }

    function clearState(): void {
      projects.value = []
      project.value = null
      posts.value = []
      post.value = null
      slug.value = null
    }

    return {
      projects,
      project,
      posts,
      post,
      slug,
      setProjects,
      setProject,
      setPosts,
      setPost,
      appendPost,
      updatePostStatus,
      updatePost,
      removePost,
      setSlug,
      removeProject,
      clearState,
    }
  },
  {
    persist: {
      storage: piniaPluginPersistedstate.localStorage(),
    },
  },
)
