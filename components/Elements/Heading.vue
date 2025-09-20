<template>
  <div class="w-full p-4 bg-white">
    <div class="flex items-center gap-3 mb-2">
      <USelect
        v-model="localLevel"
        :items="levelOptions"
        class="w-32"
        @update:model-value="updateHeading"
      />
    </div>
    
    <component 
      :is="`h${localLevel}`"
      ref="headingElement"
      class="outline-none w-full"
      :class="{
        'text-4xl font-bold': localLevel === 1,
        'text-3xl font-semibold': localLevel === 2,
        'text-2xl font-semibold': localLevel === 3,
        'text-xl font-medium': localLevel === 4,
        'text-lg font-medium': localLevel === 5,
        'text-base font-medium': localLevel === 6
      }"
      contenteditable
      @input="updateContent"
      @blur="updateContent"
    />
  </div>
</template>

<script setup lang="ts">
  import type { HeadingContent, HeadingLevel } from '@/types/elements'

  const props = defineProps<{
    content: HeadingContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: HeadingContent): void
  }>()

  const localContent = ref(props.content.text || 'Heading')
  const localLevel = ref<HeadingLevel>(props.content.level || 2)
  const headingElement = ref<HTMLElement | null>(null)
  const isUpdatingContent = ref(false)

  const levelOptions = [
    { label: 'H1', value: 1 },
    { label: 'H2', value: 2 },
    { label: 'H3', value: 3 },
    { label: 'H4', value: 4 },
    { label: 'H5', value: 5 },
    { label: 'H6', value: 6 }
  ]

  watch(() => props.content.text, (newValue) => {
    if (newValue !== undefined && newValue !== localContent.value) {
      localContent.value = newValue
      updateHeadingContent()
    }
  })

  watch(() => props.content.level, (newValue) => {
    if (newValue !== undefined && newValue !== localLevel.value) {
      localLevel.value = newValue
    }
  })

  function updateHeadingContent() {
    nextTick(() => {
      if (headingElement.value && !isUpdatingContent.value) {
        headingElement.value.textContent = localContent.value
      }
    })
  }

  function updateContent(event: Event) {
    isUpdatingContent.value = true

    const target = event.target as HTMLElement
    
    localContent.value = target.textContent || ''
    
    emitUpdate()
    
    isUpdatingContent.value = false
  }

  function updateHeading() {
    const currentContent = localContent.value
    emitUpdate()
    
    nextTick(() => {
      if (headingElement.value) {
        headingElement.value.textContent = currentContent
      }
    })
  }

  function emitUpdate() {
    emit('contentUpdate', {
      text: localContent.value,
      level: localLevel.value
    })
  }

  onMounted(() => {
    updateHeadingContent()
  })

  watch(localLevel, () => {
    nextTick(() => {
      updateHeadingContent()
    })
  })
</script>