<template>
  <div class="w-full p-4 bg-white">
    <div class="flex flex-col gap-4">
      <USelect
        v-model="localStyle"
        :items="styleOptions"
        class="w-40"
        @update:model-value="updateDivider"
      />
      
      <div class="flex-1">
        <div 
          :class="[
            'w-full',
            {
              'border-t border-gray-300': localStyle === 'solid',
              'border-t border-dashed border-gray-300': localStyle ==='dashed',
              'border-t border-dotted border-gray-300': localStyle ==='dotted',
            }
          ]"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { DividerContent, DividerStyle } from '@/types/elements'

  const props = defineProps<{
    content: DividerContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: DividerContent): void
  }>()

  const localStyle = ref<DividerStyle>(props.content.style || 'solid')

  const styleOptions = [
    { label: 'Solid', value: 'solid' },
    { label: 'Dashed', value: 'dashed' },
    { label: 'Dotted', value: 'dotted' },
  ]

  watch(() => props.content.style, (newValue) => {
    if (newValue && newValue !== localStyle.value) {
      localStyle.value = newValue
    }
  })

  function updateDivider() {
    emit('contentUpdate', {
      style: localStyle.value
    })
  }
</script>