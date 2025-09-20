<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <SectionHeading
        title="API Documentation"
        description="Learn how to use the Loglybase API"
      />
      
      <div class="col-span-2">
        <div class="space-y-4">
          <p class="text-sm">Our API allows you to programmatically access and manage your <span class="font-medium">Loglybase</span> content.</p>
          
          <UCard :ui="{ root: 'rounded-xl' }">
            <div class="space-y-4">
              <h3 class="font-medium">Base URL</h3>
              <div class="relative">
                <div class="bg-neutral-100 p-3 rounded-xl font-mono text-sm outline-1 outline-offset-2 outline-neutral-200">
                  https://loglybase.com/api
                </div>
                <UButton
                  variant="link"
                  icon="i-hugeicons-copy-01"
                  class="absolute top-2.5 right-2"
                  @click="copyBaseURL"
                />
              </div>
            </div>
          </UCard>

          <UButton
            color="neutral"
            variant="subtle"
            icon="i-hugeicons-book-open-01"
            class="cursor-pointer"
            to="https://docs.loglybase.com/api-reference"
            external
          >
            View API Documentation
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  const toast = useToast()
  const { copy } = useClipboard()

  function copyBaseURL() {
    copy('https://loglybase.com/api')

    toast.add({
      title: 'Base URL saved to clipboard',
      color: 'success',
      icon: 'i-hugeicons-checkmark-circle-02',
      duration: 1500
    })
  }
</script>