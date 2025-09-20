import type {
  CreateProjectInput,
  Project,
  UpdateProjectInput,
} from '~/types/project'

export default function useProject() {
  const projectStore = useProjectStore()
  const customDomainFailure = ref(false)
  const widgetProject = ref()

  const getAll = async () => {
    const projects = await $fetch('/api/project')

    projectStore.setProjects(projects as any)
  }

  const getOne = async (code: string) => {
    try {
      const project = await $fetch(`/api/project/${code}`)

      projectStore.setProject(project as Project)
    } catch (error: any) {
      const errorType = error.statusMessage.toLowerCase().replaceAll(' ', '_')

      if (errorType === 'project_not_found') {
        await navigateTo(`/project/${projectStore.project?.code}/posts`)
      }
    }
  }

  const getOneBySlug = async (slug: string) => {
    const { data } = await useFetch(`/api/project/slug/${slug}`)

    projectStore.setProject(data.value as Project)
  }

  const getForWidget = async (code: string) => {
    const { data } = await useFetch(`/api/project/${code}/widget`)

    widgetProject.value = data.value
  }

  const createProject = async (payload: CreateProjectInput) => {
    const { data, error } = await useFetch('/api/project/create', {
      method: 'POST',
      body: JSON.stringify(payload),
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

    projectStore.setProject(data.value as any)
  }

  const updateProject = async (code: string, payload: UpdateProjectInput) => {
    const { data, error } = await useFetch(`/api/project/${code}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
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

    projectStore.setProject(data.value as Project)
  }

  const connectDomain = async (code: string, domain: string | null) => {
    const { data, error } = await useFetch(`/api/project/${code}/domain`, {
      method: 'POST',
      body: JSON.stringify({ domain }),
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (error.value) {
      customDomainFailure.value = true

      return
    }

    projectStore.setProject(data.value as any)
  }

  const disconnectDomain = async (code: string) => {
    const { data, error } = await useFetch(`/api/project/${code}/domain`, {
      method: 'DELETE',
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

    projectStore.setProject(data.value as any)
  }

  const deleteProject = async (code: string) => {
    const { data, error } = await useFetch(`/api/project/${code}`, {
      method: 'DELETE',
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

    projectStore.removeProject((data.value as Project).code)
  }

  return {
    customDomainFailure,
    widgetProject,
    getAll,
    getOne,
    getOneBySlug,
    getForWidget,
    createProject,
    updateProject,
    connectDomain,
    disconnectDomain,
    deleteProject,
  }
}
