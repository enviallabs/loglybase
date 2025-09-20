<template>
  <component 
    :is="resolvedComponent" 
    v-bind="props"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    name: string
  }>()

  const elements = ref<Record<string, any>>({
    'text': import('./TextIcon.vue'),
    'heading': import('./HeadingIcon.vue'),
    'list': import('./ListIcon.vue'),
    'code': import('./CodeIcon.vue'),
    'version': import('./VersionIcon.vue'),
    'category': import('./CategoryIcon.vue'),
    'divider': import('./DividerIcon.vue'),
    'image': import('./ImageIcon.vue'),
    'video': import('./VideoIcon.vue'),
  })

  const resolvedComponent = computed(() => {
    return defineAsyncComponent(() => elements.value[props.name])
  })
</script>