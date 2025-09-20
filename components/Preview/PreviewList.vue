<template>
  <component 
    :is="props.ordered ? LIST_TYPE.ORDERED : LIST_TYPE.UNORDERED" 
    :class="[
      fontFamily,
      {
        'pl-8': props.items.length > 0,
        'list-decimal': props.ordered,
        'list-disc': !props.ordered,
      }
    ]"
  >
    <li 
      v-for="(item, index) in props.items" 
      :key="index"
      class="mb-2 relative pl-2"
    >
      <div class="flex items-center text-sm gap-2">
        {{ item }}
      </div>
    </li>
  </component>
</template>

<script setup lang="ts">
  defineProps<{
    props: {
      ordered: boolean
      items: string[]
    }
    fontFamily: string
  }>()

  enum LIST_TYPE {
    ORDERED = 'ol',
    UNORDERED = 'ul',
  }
</script>
