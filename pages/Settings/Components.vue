<template>
  <ClientOnly>
    <div class="flex items-center justify-center px-6 py-6">
      <div class="container mx-auto max-w-4xl 2xl:max-w-[70%] space-y-8">
        <SettingsNavigation class="overflow-auto" />

        <div class="space-y-12">
          <PageHeading
            title="Components"
            description="Widget and UI components for integration to your website"
          />
          
          <div class="space-y-6">
            <div class="border-b border-gray-100 pb-6">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <SectionHeading
                  title="Widget"
                  description="Embed Loglybase widget on your website"
                />
                
                <div class="col-span-2">
                  <div class="space-y-4">
                    <UCard :ui="{ root: 'rounded-xl' }">
                      <div class="space-y-4">
                        <h3 class="font-medium">Embed widget</h3>
                        <div class="relative bg-neutral-100 pr-10 rounded-xl font-mono text-sm outline-1 outline-offset-2 outline-neutral-200">
                          <p class="p-3 whitespace-nowrap overflow-auto">
                            {{ `<iframe src="${config.public.SSL_PREFIX}://${config.public.BASE_URL}/widget/${projectCode}" style="width:100%;max-width:600px;height:100%;border:none;overflow:hidden;" />` }}
                          </p>
                          <UButton
                            variant="link"
                            icon="i-hugeicons-copy-01"
                            class="absolute top-2.5 right-2"
                            @click="copyWidget"
                          />
                        </div>
                      </div>
                    </UCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
  const config = useRuntimeConfig()
  const projectStore = useProjectStore()
  const { getOne } = useProject()
  const { copy } = useClipboard()

  onMounted(() => {
    getOne(projectStore.project?.code || '')
  })
  
  const projectCode = computed(() => {
    return projectStore.project?.code
  })

  function copyWidget() {
    const widget = `<iframe src="${config.public.SSL_PREFIX}://${config.public.BASE_URL}/widget/${projectCode.value}" style="width:100%;max-width:600px;height:100%;border:none;overflow:hidden;" />`

    copy(widget)

    useToast().add({
      title: 'Widget saved to clipboard',
      color: 'success',
      icon: 'i-hugeicons-checkmark-circle-02',
      duration: 1500
    })
  }
</script>