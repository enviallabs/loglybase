<template>
  <div>
    <h2 class="text-lg font-medium">{{ title }}</h2>
    <p class="text-sm text-gray-400 mt-1">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    description: string
  }>()
</script>