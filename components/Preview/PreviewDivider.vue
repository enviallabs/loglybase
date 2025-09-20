<template>
  <USeparator
    :type="props.style"
    :ui="{
      border: 'border-zinc-300 dark:border-zinc-600'
    }"
  />
</template>

<script setup lang="ts">
  defineProps<{
    props: {
      style: DividerStyle
    }
  }>()
</script>
