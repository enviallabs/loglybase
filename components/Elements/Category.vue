<template>
  <div class="w-full p-4 bg-white">
    <div class="flex items-center justify-between mb-3">
      <USelect
        v-model="localCategory"
        :items="categoryOptions"
        class="w-40"
        @update:model-value="updateCategory"
      />
      <UButton
        icon="i-hugeicons-plus-sign"
        size="xs"
        variant="ghost"
        @click="addItem"
      />
    </div>
    
    <div class="flex flex-col gap-2">
      <div 
        v-for="(item, index) in localItems" 
        :key="index"
        class="flex items-center gap-2"
      >
        <UInput
          v-model="localItems[index]"
          class="flex-1"
          placeholder="Description of the change..."
          @input="updateItems"
        />
        <div class="flex items-center">
          <UButton
            icon="i-hugeicons-delete-01"
            size="xs"
            variant="ghost"
            color="error"
            @click="removeItem(index)"
          />
        </div>
      </div>
      
      <div v-if="localItems.length === 0" class="p-3 text-center border border-dashed border-gray-200 rounded-md">
        <p class="text-gray-400 text-sm">
          Click "+" to add a change
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { CategoryContent, CategoryType } from '@/types/elements'

  const props = defineProps<{
    content: CategoryContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: CategoryContent): void
  }>()

  const localCategory = ref<CategoryType>(props.content.category || 'added')
  const localItems = ref<string[]>(props.content.items || [])

  const categoryOptions = [
    { label: 'Added', value: 'added' },
    { label: 'Changed', value: 'changed' },
    { label: 'Deprecated', value: 'deprecated' },
    { label: 'Removed', value: 'removed' },
    { label: 'Fixed', value: 'fixed' },
    { label: 'Security', value: 'security' }
  ]

  watch(() => props.content.category, (newValue) => {
    if (newValue && newValue !== localCategory.value) {
      localCategory.value = newValue
    }
  })

  watch(() => props.content.items, (newValue) => {
    if (newValue && JSON.stringify(newValue) !== JSON.stringify(localItems.value)) {
      localItems.value = [...newValue]
    }
  })

  function updateCategory() {
    emitUpdate()
  }

  function updateItems() {
    emitUpdate()
  }

  function addItem() {
    localItems.value.push('')
    emitUpdate()
  }

  function removeItem(index: number) {
    localItems.value.splice(index, 1)
    emitUpdate()
  }

  function emitUpdate() {
    emit('contentUpdate', {
      category: localCategory.value,
      items: localItems.value,
    })
  }
</script>