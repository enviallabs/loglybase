<template>
  <div class="space-y-4">
    <PreviewVersion :meta="meta" :font-family="fontFamily" />
    
    <div
      v-for="(element, elementIndex) in displayedContent"
      :key="elementIndex"
    >
      <component
        :is="resolveComponent(element.type)"
        :props="element.props"
        :font-family="fontFamily"
      />
    </div>
    
    <div v-if="isContentTruncated" class="mt-2">
      <UButton 
        v-if="!showFullContent"
        color="neutral"
        variant="link"
        trailing-icon="i-hugeicons-arrow-right-01"
        class=" cursor-pointer"
        :ui="{
          base: 'p-0'
        }" 
        @click="showFullContent = !showFullContent"
      >
        Show more
      </UButton>

      <UButton 
        v-else
        color="neutral"
        variant="link"
        trailing-icon="i-hugeicons-arrow-left-01"
        class=" cursor-pointer"
        :ui="{
          base: 'p-0'
        }" 
        @click="showFullContent = !showFullContent"
      >
        Show less
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = withDefaults(defineProps<{
    meta: any
    content: any[]
    limit?: number
    maxElements?: number,
    fontFamily?: string
  }>(), {
    limit: 0,
    maxElements: 0,
    fontFamily: `inter`
  })

  const blocks = ref<Record<string, any>>({
    text: import('./Preview/PreviewText.vue'),
    heading: import('./Preview/PreviewHeading.vue'),
    category: import('./Preview/PreviewCategory.vue'),
    list: import('./Preview/PreviewList.vue'),
    divider: import('./Preview/PreviewDivider.vue'),
    image: import('./Preview/PreviewImage.vue'),
    video: import('./Preview/PreviewVideo.vue'),
    code: import('./Preview/PreviewCode.vue'),
  })
  const showFullContent = ref(false)

  function resolveComponent(type: string) {
    return defineAsyncComponent(() => blocks.value[type])
  }
  
  const isContentTruncated = computed(() => {
    if (!props.content) return false
    
    if (props.limit > 0 && props.content.length > props.limit) {
      return true
    }
    
    if (props.maxElements > 0 && props.content.length > props.maxElements) {
      return true
    }
    
    return false
  })

  const limitedContent = computed(() => {
    if (!props.content) return []
    
    if (props.limit > 0 && props.content.length > props.limit) {
      return props.content.slice(0, props.limit)
    }
    
    if (props.maxElements > 0 && props.content.length > props.maxElements) {
      return props.content.slice(0, props.maxElements)
    }
    
    return props.content
  })

  const displayedContent = computed(() => {
    if (showFullContent.value) {
      return props.content || []
    }
    
    return limitedContent.value
  })
</script>

<style>
  p:empty::after {
    content: "\00A0";
  }
</style>