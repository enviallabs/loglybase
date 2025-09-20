<template>
  <component 
    :is="resolvedComponent" 
    v-bind="props"
    :element-id="props.elementId"
    :content="props.content"
    @content-update="handleUpdate"
    v-on="$attrs"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    elementId: string
    type: string
    content: any
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: any): void
  }>()

  const handleUpdate = (value: any) => {
    emit('contentUpdate', value)
  }

  const elements = ref<Record<string, any>>({
    'text': import('./Elements/Text.vue'),
    'heading': import('./Elements/Heading.vue'),
    'list': import('./Elements/List.vue'),
    'code': import('./Elements/Code.vue'),
    'version': import('./Elements/Version.vue'),
    'category': import('./Elements/Category.vue'),
    'divider': import('./Elements/Divider.vue'),
    'image': import('./Elements/Image.vue'),
    'video': import('./Elements/Video.vue'),
  })

  const resolvedComponent = computed(() => {
    return defineAsyncComponent(() => elements.value[props.type])
  })
</script>