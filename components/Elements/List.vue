<template>
  <div class="w-full p-4 bg-white">
    <div class="flex items-center gap-3 mb-2">
      <USelect
        v-model="listType"
        :items="listTypeOptions"
        class="w-40"
        @update:model-value="updateList"
      />
      <UButton
        icon="i-hugeicons-plus-sign"
        size="xs"
        variant="ghost"
        @click="addItem"
      />
    </div>
    
    <component 
      :is="listType === 'ordered' ? 'ol' : 'ul'" 
      :class="{
        'pl-8': items.length > 0,
        'list-decimal': listType === 'ordered',
        'list-disc': listType === 'unordered',
      }"
    >
      <li 
        v-for="(item, index) in items" 
        :key="`item-${elementId}-${index}-${listUpdateCounter}`"
        class="mb-2 relative pl-1"
      >
        <div class="flex items-center gap-2">
          <div 
            :id="`list-item-${elementId}-${index}`"
            contenteditable
            class="flex-1 text-sm outline-none"
            @input="updateItemContent($event, index)"
          />
          
          <div class="flex items-center">
            <UButton
              icon="i-hugeicons-arrow-up-02"
              size="xs"
              variant="ghost"
              class="text-gray-400"
              :disabled="index === 0"
              @click="moveItemUp(index)"
            />
            <UButton
              icon="i-hugeicons-arrow-down-02"
              size="xs"
              variant="ghost"
              class="text-gray-400"
              :disabled="index === items.length - 1"
              @click="moveItemDown(index)"
            />
            <UButton
              icon="i-hugeicons-delete-01"
              size="xs"
              variant="ghost"
              color="error"
              @click="removeItem(index)"
            />
          </div>
        </div>
      </li>
      
      <div v-if="items.length === 0" class="text-gray-400 italic pl-1">
        Click + to add list item
      </div>
    </component>
  </div>
</template>

<script setup lang="ts">
  import type { ListContent, ListType } from '~/types/elements'

  const props = defineProps<{
    elementId: string
    content: ListContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: ListContent): void
  }>()

  const items = ref<string[]>(props.content.items || [])
  const listType = ref<ListType>(props.content.ordered ? 'ordered' : 'unordered')
  const listUpdateCounter = ref(0)
  const isUpdating = ref(false)

  const listTypeOptions = [
    { label: 'Bulleted', value: 'unordered' },
    { label: 'Numbered', value: 'ordered' }
  ]

  watch(() => props.content.items, (newValue) => {
    if (newValue && JSON.stringify(newValue) !== JSON.stringify(items.value)) {
      items.value = [...newValue]
      
      nextTick(() => {
        updateDOMContent()
      })
    }
  })

  watch(() => props.content.ordered, (newValue) => {
    if (newValue !== undefined) {
      listType.value = newValue ? 'ordered' : 'unordered'
    }
  })

  function updateDOMContent() {
    if (isUpdating.value) return
    
    items.value.forEach((item, index) => {
      const element = document.getElementById(`list-item-${props.elementId}-${index}`)
      
      if (element && element.textContent !== item) {
        element.textContent = item
      }
    })
  }

  function updateItemContent(event: Event, index: number) {
    const target = event.target as HTMLElement
    
    isUpdating.value = true
    items.value[index] = target.textContent || ''
    
    emitUpdate()
    
    isUpdating.value = false
  }

  function addItem() {
    items.value.push('New item')
    listUpdateCounter.value++
    
    emitUpdate()
    
    nextTick(() => {
      updateDOMContent()
    })
  }

  function removeItem(index: number) {
    items.value.splice(index, 1)
    listUpdateCounter.value++
    
    emitUpdate()
  }

  function moveItemUp(index: number) {
    if (index > 0) {
      const temp = items.value[index]
      
      items.value[index] = items.value[index - 1]
      items.value[index - 1] = temp
      listUpdateCounter.value++
      
      emitUpdate()

      nextTick(() => {
        updateDOMContent()
      })
    }
  }

  function moveItemDown(index: number) {
    if (index < items.value.length - 1) {
      const temp = items.value[index]
      
      items.value[index] = items.value[index + 1]
      items.value[index + 1] = temp
      listUpdateCounter.value++
      
      emitUpdate()

      nextTick(() => {
        updateDOMContent()
      })
    }
  }

  function updateList() {
    emitUpdate()
  }

  function emitUpdate() {
    emit('contentUpdate', {
      items: items.value,
      ordered: listType.value === 'ordered'
    })
  }

  onMounted(() => {
    nextTick(() => {
      updateDOMContent()
    })
  })

  onUpdated(() => {
    nextTick(() => {
      updateDOMContent()
    })
  })
</script>