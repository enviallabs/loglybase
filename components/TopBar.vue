<template>
  <ClientOnly>
    <div class="border-b border-gray-200 bg-white fixed w-full top-0 z-50">
      <div class="mx-auto px-4 lg:px-8 py-3 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <AppLogo to="/projects" :with-text="false" />
  
          <UDropdownMenu
            v-if="!excludeProjectSelector && currentProject"
            :items="projects"
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 4,
            }"
            :ui="{
              content: 'w-52 rounded-xl',
              item: 'before:rounded-lg'
            }"

          >
            <div style="width: 208px;">
              <div class="bg-white border border-gray-200 w-full p-1.5 flex items-center justify-between space-x-2 rounded-xl shadow-xs">
                <div class="flex items-center space-x-3">
                  <Avatar
                    v-if="currentProject && !currentProject.logo"
                    :name="currentProject.name"
                    :size="24"
                  />
                  <UAvatar
                    v-else-if="currentProject?.logo"
                    :src="currentProject.logo"
                    size="xs"
                  />
                  <span class="text-sm font-semibold">{{ currentProject?.name }}</span>
                </div>
        
                <UIcon name="i-hugeicons-unfold-more" />
              </div>
            </div>
      
            <template #project-item="{ item }: any">
              <div class="w-full flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <Avatar
                    v-if="!item.logo"
                    :name="item.label"
                    :size="24"
                  />
                  <UAvatar
                    v-else-if="item.logo"
                    :src="item.logo"
                    size="xs"
                  />
                  <p>{{ item.label }}</p>
                </div>
      
                <UIcon v-if="item.active" name="i-hugeicons-tick-02" class="text-xl" />
              </div>
            </template>
          </UDropdownMenu>
        </div>
  
        <div class="flex items-center space-x-4">
          <UDropdownMenu
            :items="userMenuItems"
            :content="{
              align: 'start',
              side: 'bottom',
              sideOffset: 4,
            }"
            :ui="{
              content: 'w-45 rounded-xl',
              item: 'before:rounded-lg'
            }"
          >
            <div class="flex items-center space-x-2 cursor-pointer">
              <UAvatar
                :src="userInfo.image"
                :alt="userInfo.name"
                size="lg"
                :ui="{
                  root: 'bg-neutral-100',
                }"
              />
              
              <div class="hidden sm:flex flex-col">
                <span class="text-sm font-semibold">{{ userInfo.name }}</span>
                <span class="text-xs text-gray-400">{{ userInfo.email }}</span>
              </div>
            </div>
          </UDropdownMenu>
        </div>
      </div>
    </div>

    <WhatsNextModal
      :open="whatsNextOpen"
      @close="whatsNextOpen = false"
    />
  </ClientOnly>
</template>

<script setup lang="ts">
  import Avatar from 'vue-boring-avatars'
  import type { Project } from '@/types/project'

  defineProps<{
    excludeProjectSelector?: boolean
  }>()

  const { authClient } = useAuthClient()
  const globalStore = useGlobalStore()
  const projectStore = useProjectStore()
  
  const whatsNextOpen = ref(false)
  const userInfo = ref({
    name: '',
    email: '',
    image: ''
  })
  const userMenuItems = [
    [
      {
        label: 'Profile',
        icon: 'i-hugeicons-user',
        to: '/settings/profile'
      },
      {
        label: 'What\'s next?',
        icon: 'i-hugeicons-direction-right-02',
        onClick: () => whatsNextOpen.value = true
      },
      {
        label: 'Docs',
        icon: 'i-hugeicons-book-open-01',
        to: 'https://docs.loglybase.com'
      },
      {
        label: 'Github',
        icon: 'i-hugeicons-github',
        to: 'https://github.com/enviallabs/loglybase'
      }
    ],
    [
      {
        label: 'Sign Out',
        icon: 'i-hugeicons-logout-03',
        onClick: () => logout()
      }
    ]
  ]

  onMounted(async () => {
    const { data } = await authClient.getSession()

    if (data?.user) {
      userInfo.value.name = data.user.name || ''
      userInfo.value.email = data.user.email || ''
      userInfo.value.image = data.user.image || ''
    }
  })

  const currentProject = computed(() => {
    return projectStore.project
  })

  const projects = computed(() => {
    const projects = projectStore.projects
    const projectsItems = []
    
    for (const project of projects) {
      projectsItems.push({
        label: project.name,
        code: project.code,
        logo: project.logo,
        active: project.code === currentProject.value?.code ? true : false,
        slot: 'project-item',
        onClick: () => handleGoToProject(project)
      })
    }
    
    return [
      projectsItems, [{
        label: 'Project settings',
        icon: 'i-hugeicons-settings-01',
        to: '/settings/project'
      }, {
        label: 'New project',
        icon: 'i-hugeicons-plus-sign',
        to: '/create/project'
      }]
    ]
  })

  async function handleGoToProject(project: Project) {
    await navigateTo(`/project/${project.code}/posts`)
  }

  async function logout() {
    await authClient.signOut()

    await navigateTo('/auth/sign-in')
    globalStore.clearStores()
  }
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>