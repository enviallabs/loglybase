<template>
  <div class="border-b border-gray-100 pb-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div>
        <div class="h-6 bg-gray-200 rounded animate-pulse mb-2"/>
        <div class="h-4 bg-gray-100 rounded animate-pulse w-3/4"/>
      </div>
      
      <div class="col-span-2 space-y-4">
        <template v-for="(item, index) in items" :key="index">
          <div v-if="item.type === 'input'">
            <div class="h-4 bg-gray-200 rounded animate-pulse mb-2" :class="item.labelWidth || 'w-24'"/>
            <div class="h-12 bg-gray-100 rounded-lg animate-pulse"/>
            <div v-if="item.hasDescription" class="h-3 bg-gray-100 rounded animate-pulse mt-1" :class="item.descriptionWidth || 'w-3/4'"/>
          </div>

          <div v-else-if="item.type === 'textarea'">
            <div class="h-4 bg-gray-200 rounded animate-pulse mb-2" :class="item.labelWidth || 'w-20'"/>
            <div class="h-20 bg-gray-100 rounded-lg animate-pulse"/>
          </div>

          <div v-else-if="item.type === 'input-button'">
            <div class="h-4 bg-gray-200 rounded animate-pulse mb-2" :class="item.labelWidth || 'w-24'"/>
            <div class="flex items-center">
              <div class="h-12 bg-gray-100 rounded-l-lg animate-pulse flex-1"/>
              <div class="h-12 bg-gray-200 rounded-r-lg animate-pulse" :class="item.buttonWidth || 'w-12'"/>
            </div>
            <div v-if="item.hasDescription" class="h-3 bg-gray-100 rounded animate-pulse mt-1" :class="item.descriptionWidth || 'w-3/4'"/>
          </div>

          <div v-else-if="item.type === 'image-upload'" class="flex items-center space-x-4">
            <div class="w-16 h-16 rounded-md bg-gray-200 animate-pulse"/>
            <div>
              <div class="h-4 bg-gray-200 rounded animate-pulse mb-1 w-24"/>
              <div class="h-3 bg-gray-100 rounded animate-pulse w-32"/>
            </div>
          </div>

          <div v-else-if="item.type === 'info-box'" :class="item.boxClass || 'bg-gray-50 border border-gray-200'" class="rounded-xl p-3">
            <div class="flex">
              <div class="w-4 h-4 bg-gray-200 rounded-full animate-pulse mr-2 mt-0.5"/>
              <div class="flex-1">
                <div class="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4"/>
                <div class="space-y-1">
                  <div class="h-3 bg-gray-100 rounded animate-pulse w-full"/>
                  <div class="h-3 bg-gray-100 rounded animate-pulse w-5/6"/>
                  <div class="h-3 bg-gray-100 rounded animate-pulse w-4/5"/>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="item.type === 'danger-zone'" class="border border-red-200 rounded-xl p-4 bg-red-50">
            <div class="flex items-center justify-between">
              <div>
                <div class="h-4 bg-red-200 rounded animate-pulse mb-1 w-24"/>
                <div class="h-3 bg-red-100 rounded animate-pulse w-32"/>
              </div>
              <div class="h-9 w-16 bg-red-200 rounded-md animate-pulse"/>
            </div>
          </div>
        </template>

        <div v-if="showSaveButton" class="flex justify-end mt-6">
          <div class="h-10 w-28 bg-gray-200 rounded-md animate-pulse"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface SkeletonItem {
    type: 'input' | 'textarea' | 'input-button' | 'image-upload' | 'info-box' | 'danger-zone'
    labelWidth?: string
    descriptionWidth?: string
    buttonWidth?: string
    hasDescription?: boolean
    boxClass?: string
  }

  interface Props {
    items: SkeletonItem[]
    showSaveButton?: boolean
  }

  withDefaults(defineProps<Props>(), {
    showSaveButton: false
  })
</script>