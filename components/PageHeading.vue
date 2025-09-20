<template>
  <div>
    <h1 class="text-xl font-semibold mb-1">{{ title }}</h1>
    <p class="text-sm text-gray-400 mb-6">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    title: string
    description: string
  }>()
</script>