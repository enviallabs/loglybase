<template>
  <div v-if="project" class="h-screen p-2 flex flex-col space-y-14">
    <div
      v-if="withHeader"
      class="container mx-auto p-2 flex items-center justify-between space-x-2"
    >
      <div class="flex items-center">
        <img v-if="project.logo" :src="project.logo" alt="Logo" class="w-7">
        <p class="text-xl font-semibold text-zinc-900 dark:text-white" :class="[fontFamily]">
          {{ project.name }}
        </p>
      </div>

      <!-- <UModal
        :open="isSubscribeOpen"
        title="Subscribe"
        :description="`Subscribe to ${project.name} updates`"
        @update:open="isSubscribeOpen = $event"
      >
        <UButton color="neutral">Subscribe</UButton>

        <template #body>
          <UFormField label="Email" class="w-full">
            <UInput
              v-model="subscriberEmail"
              placeholder="Enter your email"
              class="w-full"
            />
          </UFormField>
        </template>

        <template #footer>
          <div class="w-full flex justify-end">
            <UButton color="neutral" @click="handleSubscribe">Subscribe</UButton>
          </div>
        </template>
      </UModal> -->
    </div>
    
    <div class="flex flex-col flex-1 space-y-12 pb-10" :class="{ 'pt-4': isWidgetView }">
      <div v-if="project" class="flex flex-col">
        <div class="container mx-auto max-w-4xl px-4 lg:px-10 md:px-8 space-y-4">
          <div class="space-y-3">
            <h2 class="max-w-4xl text-black dark:text-white text-4xl font-black" :class="[fontFamily]">
              {{ project.meta?.heading }}
            </h2>
            <p class="text-sm text-neutral-700 dark:text-zinc-300" :class="[fontFamily, fontSize]">
              {{ project.meta?.subheading }}
            </p>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-1">
              <UDropdownMenu
                :items="versionList"
                :content="{
                  align: 'start'
                }"
                :ui="{
                  content: 'dark:bg-zinc-800 dark:ring-zinc-700',
                  item: 'text-neutral gap-3'
                }"
              >
                <UButton
                  icon="i-hugeicons-filter"
                  color="neutral"
                  variant="outline"
                  size="xl"
                  :ui="{
                    base: 'dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700'
                  }"
                  class="cursor-pointer"
                />

                <template #item-leading="{ item }">
                  <UChip :color="item.color" class="ml-2" />
                </template>
              </UDropdownMenu>

              <UPopover
                :content="{
                  align: 'start'
                }"
                :ui="{
                  content: 'dark:bg-zinc-800 dark:ring-zinc-700'
                }"
              >
                <UButton
                  icon="i-hugeicons-calendar-03"
                  color="neutral"
                  variant="outline"
                  size="md"
                  class="cursor-pointer"
                  :ui="{
                    base: 'dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700'
                  }"
                >
                  {{ dateFilter ? df.format(dateFilter.toDate(getLocalTimeZone())) : 'Select a date' }}
                </UButton>

                <template #content>
                  <UCalendar
                    v-model="dateFilter"
                    class="p-2"
                    :ui="{
                      root: 'dark:bg-zinc-800 rounded-md',
                    }"
                  />
                </template>
              </UPopover>
            </div>

            <div class="flex items-center space-x-1">
              <UInput
                v-model="searchQuery"
                size="md"
                leading-icon="i-hugeicons-search-01"
                placeholder="Search"
                :ui="{
                  base: 'rounded-lg dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:placeholder-zinc-400',
                  leadingIcon: 'dark:text-zinc-400',
                }"
                class="hidden sm:block"
              />

              <UModal
                :ui="{
                  overlay: 'dark:bg-zinc-800/75'
                }"
              >
                <UButton
                  icon="i-hugeicons-search-01"
                  color="neutral"
                  variant="outline"
                  size="xl"
                  class="sm:hidden cursor-pointer"
                  :ui="{
                    base: 'dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700'
                  }"
                />

                <template #content>
                  <div class="p-0.5">
                    <UInput
                      v-model="searchQuery"
                      size="lg"
                      leading-icon="i-hugeicons-search-01"
                      placeholder="Search"
                      :ui="{
                        base: 'rounded-md dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700 dark:placeholder-zinc-400',
                        leadingIcon: 'dark:text-zinc-400',
                      }"
                      class="w-full"
                    />
                  </div>
                </template>
              </UModal>
              
              <UButton
                v-if="selectedVersion !== 'all' || dateFilter || searchQuery.length"
                icon="i-hugeicons-filter-reset"
                color="neutral"
                variant="outline"
                size="xl"
                class="cursor-pointer"
                :ui="{
                  base: 'dark:bg-zinc-800 dark:ring-zinc-700 dark:hover:bg-zinc-700'
                }"
                @click="resetFilters"
              />
            </div>
          </div>
        </div>
      </div>
      
      <UContainer v-if="filteredPosts.length" class="container mx-auto max-w-4xl space-y-14 sm:px-8 lg:px-10">
        <PreviewContainer
          v-for="post in filteredPosts"
          :key="post.id"
          :meta="post.meta"
          :content="post.content"
          :theme="project?.theme || 'light'"
          :font-family="fontFamily"
          :limit="0"
          :max-elements="5"
        />
      </UContainer>

      <div v-if="!filteredPosts.length" class="h-full flex flex-col items-center justify-center px-4">
        <div class="max-w-md text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-lg bg-blue-50 dark:bg-white mb-6">
            <UIcon name="i-hugeicons-calendar-03" class="text-xl text-black" />
          </div>
          <h3 class="text-xl font-semibold mb-2">No updates yet</h3>
          <p class="text-gray-500 mb-6">All project updates and changes will appear here. Stay tuned for future updates!</p>
        </div>
      </div>
    </div>
    
    <ULink
      v-if="!project?.createdBy?.noBranding"
      href="https://loglybase.com"
      class="flex justify-end p-8 text-sm text-neutral-700 dark:text-neutral-400"
      external
    >
      Powered by Loglybase
    </ULink>
  </div>
</template>

<script setup lang="ts">
  import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone
  } from '@internationalized/date'

  const props = withDefaults(defineProps<{
    projectSlug: string
    posts: any[]
    withHeader?: boolean
    isWidgetView?: boolean
  }>(), {
    withHeader: true,
    isWidgetView: false,
  })

  const projectStore = useProjectStore()
  const { getOneBySlug } = useProject()

  await getOneBySlug(props.projectSlug)

  const df = new DateFormatter('en-US', {
    dateStyle: 'medium'
  })
  
  const dateFilter = shallowRef()
  const searchQuery = ref('')
  const versionList = ref([
    {
      label: 'All',
      value: 'all',
      color: 'neutral' as any,
      onClick: () => selectedVersion.value = 'all',
    },
    {
      label: 'Stable',
      value: 'stable',
      color: 'stable',
      onClick: () => selectedVersion.value = 'stable',
    },
    {
      label: 'Beta',
      value: 'beta',
      color: 'beta',
      onClick: () => selectedVersion.value = 'beta',
    },
    {
      label: 'Alpha',
      value: 'alpha',
      color: 'alpha',
      onClick: () => selectedVersion.value = 'alpha',
    },
    {
      label: 'Release Candidate',
      value: 'rc',
      color: 'rc',
      onClick: () => selectedVersion.value = 'rc',
    },
    {
      label: 'Patch',
      value: 'patch',
      color: 'patch',
      onClick: () => selectedVersion.value = 'patch',
    },
  ])
  const selectedVersion = ref('all')
  const isSubscribeOpen = ref(false)
  const subscriberEmail = ref('')

  const project = computed(() => {
    return projectStore.project
  })

  function extractTextFromBlocks(content: any[]): string {
    if (!content || !Array.isArray(content)) return ''
    
    return content.map(block => {
      switch (block.type) {
        case 'heading':
          return block.props?.text || ''
        case 'text':
          if (block.props?.content?.content) {
            return block.props.content.content
              .filter((item: any) => item.content)
              .map((item: any) => 
                item.content
                  .filter((textNode: any) => textNode.type === 'text')
                  .map((textNode: any) => textNode.text)
                  .join(' ')
              )
              .join(' ')
          }
          return ''
        case 'list':
          return block.props?.items?.join(' ') || ''
        case 'category':
          return block.props?.items.join(' ') || ''
        default:
          return ''
      }
    }).join(' ')
  }

  const filteredPosts = computed(() => {
    let result = props.posts as any[]

    if (selectedVersion.value !== 'all') {
      result = result.filter((post) => {
        const versionBlock = post.content.find((block: any) => block.type === 'version')

        return versionBlock?.props.type === selectedVersion.value
      })
    }

    if (dateFilter.value) {
      result = result.filter((post) => {
        const versionBlock = post.content.find((block: any) => block.type === 'version')
        const versionDateValue = versionBlock.props.date
        const versionDate = new CalendarDate(versionDateValue.year, versionDateValue.month, versionDateValue.day)
        
        return versionDate.compare(dateFilter.value) === 0
      })
    }

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()

      result = result.filter((post) => {
        const contentText = extractTextFromBlocks(post.content || [])
        
        return contentText.toLowerCase().includes(query)
      })
    }

    return result
  })

  const fontFamily = computed(() => {
    return project.value?.fontFamily || 'inter'
  })

  const fontSize = computed(() => {
    const size: any = {
      SMALL: 'md:!text-sm',
      MEDIUM: 'md:!text-base',
      LARGE: 'md:!text-lg',
    }
    
    return size[project.value?.fontSize || 'MEDIUM']
  })

  function resetFilters() {
    selectedVersion.value = 'all'
    dateFilter.value = undefined
    searchQuery.value = ''
  }

  function handleSubscribe() {
    // add api call to subscribe to changelog page

    isSubscribeOpen.value = false
    subscriberEmail.value = ''
  }
</script>