<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionHeading
        title="API Keys"
        description="Create and manage your API keys"
      />
      
      <div class="col-span-2">
        <div class="flex justify-between items-center mb-4">
          <p class="text-sm">Use API keys to authenticate requests to the <span class="font-medium">Loglybase</span> API</p>

          <UModal
            v-model:open="generateModal"
            :ui="{ content: 'rounded-xl' }"
          >
            <UButton
              color="neutral"
              class="p-2 cursor-pointer"
            >
              <UIcon name="i-hugeicons-plus-sign" />
              <p class="hidden sm:flex">Create New Key</p>
            </UButton>

            <template #content>
              <div class="p-4 space-y-4">
                <div class="flex items-center justify-between">
                  <h3 class="font-medium">Your API Key</h3>
                </div>
                
                <UFormField v-if="!newApiKey" label="Name">
                  <UInput v-model="name" size="lg" color="neutral" class="w-full" />
                </UFormField>
                
                <div v-if="newApiKey">
                  <span class="text-sm font-medium">Token</span>

                  <div class="relative mt-2">
                    <div class="bg-neutral-100 p-3 rounded-xl font-mono text-sm outline-1 outline-offset-2 outline-neutral-200">
                      <p class="w-[calc(100%-30px)] overflow-auto">{{ newApiKey }}</p>
                    </div>
                    <UButton
                      variant="link"
                      icon="i-hugeicons-copy-01"
                      class="absolute top-2.5 right-2"
                      @click="copyApiKey"
                    />
                  </div>
                </div>
                
                <UAlert
                  v-if="newApiKey"
                  title="Important"
                  description="This key will only be displayed once. Please save it somewhere secure."
                  icon="i-hugeicons-alert-02"
                  color="warning"
                  variant="soft"
                />

                <div class="flex justify-end space-x-1">
                  <UButton
                    variant="subtle"
                    class="cursor-pointer"
                    @click="closeGenerateModal"
                  >
                    Close
                  </UButton>
                  <UButton
                    v-if="!newApiKey"
                    color="neutral"
                    class="cursor-pointer"
                    @click="createNewApiKey"
                  >
                    Create
                  </UButton>
                </div>
              </div>
            </template>
          </UModal>
        </div>
        
        <div class="border border-gray-200 rounded-xl overflow-hidden">
          <UTable
            :columns="columns"
            :data="apiKeys"
            :ui="{
              thead: 'bg-white'
            }"
            class="z-0"
          >
            <template #empty>
              <div>
                <UIcon name="i-hugeicons-key-01" :size="20" />
                <h1 class="font-semibold">No API keys found</h1>
                <p class="text-xs">Create your first API key to get started</p>
              </div>
            </template>
          </UTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface ApiKey {
    id: string
    name: string | null
    createdAt: Date
    lastRequest?: Date | null
    permissions: { [key: string]: string[] } | null
    start: string | null
    prefix: string | null
    userId: string
    refillInterval: number | null
    refillAmount: number | null
    metadata: Record<string, unknown> | null
  }

  interface TableCellProps {
    row: {
      original: ApiKey
    }
  }

  const UButton = resolveComponent('UButton')

  const { authClient } = useAuthClient()
  const toast = useToast()
  const { copy } = useClipboard()

  const apiKeys = ref<ApiKey[]>([])
  const generateModal = ref(false)
  const name = ref('')
  const newApiKey = ref<string>()

  const columns = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created',
      cell: ({ row }: TableCellProps) => {
        return new Date(row.original.createdAt).toLocaleDateString()
      }
    },
    {
      accessorKey: 'lastRequest',
      header: 'Last Used',
      cell: ({ row }: TableCellProps) => {
        if (!row.original.lastRequest) {
          return 'Never'
        }
        
        return new Date(row.original.lastRequest).toLocaleDateString()
      }
    },
    {
      accessorKey: 'actions',
      header: '',
      cell: ({ row }: TableCellProps) => {
        return h(UButton, {
          icon: 'i-hugeicons-delete-01',
          color: 'error',
          variant: 'subtle',
          ui: {
            base: 'rounded-md'
          },
          onClick: () => {
            deleteApiKey(row.original.id)
          }
        })
      }
    },
  ]

  onMounted(async () => {
    await getApiKeys()
  })

  async function createNewApiKey() {
    if (!name.value) {
      return
    }

    const { data } = await authClient.apiKey.create({
      name: name.value,
    })

    newApiKey.value = data?.key

    await getApiKeys()
  }

  function copyApiKey() {
    if (newApiKey.value) {
      copy(newApiKey.value)

      toast.add({
        title: 'API key saved to clipboard',
        color: 'success',
        icon: 'i-hugeicons-checkmark-circle-02',
        duration: 1500,
      })
    }
  }

  async function deleteApiKey(id: string) {
    await authClient.apiKey.delete({
      keyId: id
    })

    await getApiKeys()
  }

  function closeGenerateModal() {
    generateModal.value = false
    newApiKey.value = ''
  }
  
  async function getApiKeys() {
    const { data } = await authClient.apiKey.list()

    apiKeys.value = data || []
  }
</script>