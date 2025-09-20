<template>
  <div class="min-w-92 bg-white border border-gray-200 rounded-2xl h-fit overflow-y-auto">
    <div class="p-4">
      <h3 class="font-medium mb-4">Blocks</h3>
      
      <div class="space-y-4">
        <div v-for="(section, index) of blockSections" :key="index">
          <h4 class="text-xs font-medium text-gray-500 mb-2">{{ section.title }}</h4>

          <draggable
            :list="section.blocks"
            :clone="cloneBlock"
            :group="{ name: 'blocks', pull: 'clone', put: false }"
            item-key="type"
            :sort="false"
            class="grid grid-cols-2 gap-1"
          >
            <template #item="{ element: block }">
              <div 
                class="flex flex-col items-center p-3 space-y-2 bg-white border border-gray-200 rounded-xl cursor-move hover:bg-gray-100 hover:ring-2 hover:ring-neutral-700"
              >
                <IconBase :name="block.icon" />
                <span class="text-sm font-semibold">{{ block.label }}</span>
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { createId } from '@paralleldrive/cuid2'
  import draggable from 'vuedraggable'

  const cloneBlock = (block: Block) => {
    return {
      id: createId(),
      type: block.type,
      props: block.defaultProps || {}
    }
  }
</script>