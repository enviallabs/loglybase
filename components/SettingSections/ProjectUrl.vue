<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionHeading
        title="Project URL"
        description="Configure how users access your changelog"
      />
      
      <div class="col-span-2 space-y-4">
        <UFormField label="Project Slug" name="slug">
          <div class="flex items-center">
            <UButtonGroup class="w-full">
              <UInput
                v-model="projectUrl"
                size="lg"
                color="neutral"
                class="w-full"
                placeholder="your-project"
                :ui="{ base: 'text-gray-500' }"
                disabled
              />

              <UButton
                color="neutral"
                variant="subtle"
                icon="i-hugeicons-copy-01"
                class="w-12 flex justify-center cursor-pointer"
                @click="copyToClipboard(projectUrl)"
              />
            </UButtonGroup>
          </div>

          <p class="text-xs text-gray-400 mt-1">Your changelog will be available at this url</p>
        </UFormField>
        
        <UFormField label="Custom Domain" name="customDomain">
          <UButtonGroup class="w-full">
            <UInput
              v-model="customDomain"
              size="lg"
              color="neutral"
              class="w-full"
              placeholder="changelog.yourcompany.com"
            />

            <UButton
              v-if="!projectStore.project?.customDomain"
              color="neutral"
              variant="subtle"
              class="cursor-pointer"
              :disabled="!customDomain"
              @click="handleConnectDomain"
            >
              Connect
            </UButton>

            <UButton
              v-else
              color="neutral"
              variant="subtle"
              icon="i-hugeicons-delete-01"
              class="w-12 flex items-center justify-center cursor-pointer"
              @click="handleDisconnectDomain"
            />
          </UButtonGroup>
          <p class="text-xs text-gray-400 mt-1">Point your domain's CNAME record to <span class="font-medium">loglybase.com</span></p>
        </UFormField>
        
        <div v-if="!projectStore.project?.customDomain && !customDomainError" class="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-2">
          <div class="flex">
            <UIcon name="i-hugeicons-information-circle" class="text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p class="text-sm text-amber-800">To use a custom domain, you need to:</p>
              <ol class="text-xs text-amber-700 list-decimal ml-4 mt-1 space-y-1">
                <li>Add a CNAME record in your DNS settings pointing to loglybase.com</li>
                <li>Wait for DNS propagation (up to 48 hours)</li>
                <li>We'll automatically provision an SSL certificate (it may take some time)</li>
              </ol>
            </div>
          </div>
        </div>
        
        <div v-if="projectStore.project?.customDomain && !customDomainError" class="bg-green-50 border border-green-200 rounded-xl p-3 mt-2">
          <div class="flex">
            <UIcon name="i-hugeicons-checkmark-circle-02" class="text-green-500 mr-2 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-green-500">The domain has been successfully connected.</p>
          </div>
        </div>

        <div v-if="customDomainError" class="bg-red-50 border border-red-200 rounded-xl p-3 mt-2">
          <div class="flex">
            <UIcon name="i-hugeicons-cancel-circle" class="text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p class="text-sm text-red-500">Something went wrong while connecting the domain, please check if the DNS record has been added to the domain loglybase.com</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const config = useRuntimeConfig()
  const toast = useToast()
  const {
    customDomainFailure,
    connectDomain,
    disconnectDomain,
  } = useProject()
  const projectStore = useProjectStore()
  const { copy } = useClipboard()

  const project = computed(() => {
    return projectStore.project
  })
  
  const customDomainError = ref(false)
  const customDomain = ref(project.value?.customDomain || '')
  
  const projectUrl = computed(() => {
    return `${config.public.SSL_PREFIX}://${project.value?.slug}.${config.public.BASE_URL}`
  })

  function copyToClipboard(text: string) {
    copy(text)
    
    toast.add({
      title: 'Saved to clipboard',
      color: 'success',
      icon: 'i-hugeicons-checkmark-circle-02',
      duration: 1500
    })
  }
  
  async function handleConnectDomain() {
    customDomainError.value = false
    
    await connectDomain(projectStore.project?.code || '', customDomain.value).then(() => {
      if (customDomainFailure.value) {
        customDomainError.value = true
      }
    })
  }

  async function handleDisconnectDomain() {
    await disconnectDomain(projectStore.project?.code || '')
  }
</script>