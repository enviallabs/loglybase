<template>
  <div>
    <img
      :src="props.src"
      :alt="props.alt"
      class="w-full h-auto rounded-2xl"
    >
  </div>
</template>

<script setup lang="ts">
defineProps<{
  props: {
    src: string
    alt: string
  }
}>()
</script>