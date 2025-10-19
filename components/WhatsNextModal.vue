<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'rounded-2xl'
    }"
    @update:open="handleClose"
  >
    <template #content>
      <div class="p-4">
        <div>
          <h1 class="text-lg text-gray-800 font-semibold">What's next?</h1>
          <p class="text-sm text-gray-400 mb-4">Discover what's coming next in our product roadmap and upcoming features.</p>
        </div>

        <div class="mt-5 space-y-3">
          <div class="flex items-center space-x-3">
            <div class="flex items-center bg-neutral-100 border border-neutral-200 p-2.5 rounded-md">
              <UIcon name="i-hugeicons-layout-01" class="text-xl" />
            </div>

            <div>
              <h2 class="text-sm text-gray-800 font-semibold">Layouts</h2>
              <p class="text-xs text-gray-400">Flexible layout presets to customize how your changelog is displayed.</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="flex items-center bg-neutral-100 border border-neutral-200 p-2.5 rounded-md">
              <UIcon name="i-hugeicons-ai-magic" class="text-xl" />
            </div>

            <div>
              <h2 class="text-sm text-gray-800 font-semibold">AI Assistant</h2>
              <p class="text-xs text-gray-400">Generate changelog posts effortlessly with the help of AI.</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="flex items-center bg-neutral-100 border border-neutral-200 p-2.5 rounded-md">
              <UIcon name="i-hugeicons-file-export" class="text-xl" />
            </div>

            <div>
              <h2 class="text-sm text-gray-800 font-semibold">Export</h2>
              <p class="text-xs text-gray-400">Export your changelog as HTML, Markdown, or PDF.</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="flex items-center bg-neutral-800 border border-neutral-700 text-white p-2.5 rounded-md">
              <UIcon name="i-hugeicons-dashboard-square-add" class="text-xl" />
            </div>

            <div>
              <h2 class="text-sm text-gray-800 font-semibold">Widget</h2>
              <p class="text-xs text-gray-400">Embed your changelog into your website with a lightweight widget.</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="flex items-center bg-neutral-100 border border-neutral-200 p-2.5 rounded-md">
              <UIcon name="i-hugeicons-notification-02" class="text-xl" />
            </div>

            <div>
              <h2 class="text-sm text-gray-800 font-semibold">Subscribe</h2>
              <p class="text-xs text-gray-400">Let users subscribe to updates and receive notifications.</p>
            </div>
          </div>

          <div class="flex items-center space-x-3">
            <div class="flex items-center bg-neutral-100 border border-neutral-200 p-2.5 rounded-md">
              <UIcon name="i-hugeicons-comment-01" class="text-xl" />
            </div>

            <div>
              <h2 class="text-sm text-gray-800 font-semibold">Discussions</h2>
              <p class="text-xs text-gray-400">Enable comments and discussions under your posts for user feedback.</p>
            </div>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>

<script setup lang="ts">
  const props = defineProps<{
    open: boolean
  }>()

  const emit = defineEmits<{
    (e: 'close'): void
  }>()

  const isOpen = ref(false)

  watch(() => props.open, (val) => {
    isOpen.value = val
  })

  function handleClose(event: boolean) {
    if (!event) {
      isOpen.value = false

      emit('close')
    }
  }
</script>
