<template>
  <div class="bg-white border border-gray-200 min-w-48 w-full p-1 rounded-md">
    <template v-if="items.length">
      <button
        v-for="(item, index) in items"
        :key="index"
        class="w-full flex items-center text-left p-1.5 text-sm rounded space-x-2 hover:bg-gray-200 dark:hover:bg-gray-800"
        :class="{ 'bg-gray-200 dark:bg-gray-800': index === selectedIndex }"
        @click="selectItem(index)"
      >
        <UIcon :name="item.icon" />
        <p>{{ item.title }}</p>
      </button>
    </template>

    <div v-else class="p-1 text-sm text-gray-400">
      No commands
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Item } from '@/types/extensions'

  const props = defineProps<{
    items: any[],
    command: (item: Item) => void
  }>()

  const selectedIndex = ref(0)

  watch(props.items, () => {
    selectedIndex.value = 0
  })
  
  const onKeyDown = ({ event }: any) => {
    if (event.key === 'ArrowUp') {
      upHandler()

      return true
    }

    if (event.key === 'ArrowDown') {
      downHandler()

      return true
    }

    if (event.key === 'Enter') {
      enterHandler()

      return true
    }

    return false
  }

  function upHandler() {
    selectedIndex.value = ((selectedIndex.value + props.items.length) - 1) % props.items.length
  }

  function downHandler() {
    selectedIndex.value = (selectedIndex.value + 1) % props.items.length
  }

  function enterHandler() {
    selectItem(selectedIndex.value)
  }

  function selectItem(index: number) {
    const item = props.items[index]

    if (item) {
      props.command(item)
    }
  }

  defineExpose({ onKeyDown })
</script>