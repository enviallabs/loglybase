<template>
  <component
    :is="`h${props.level}`"
    :class="[
      fontFamily,
      {
        'text-4xl font-bold': props.level === 1,
        'text-3xl font-semibold': props.level === 2,
        'text-2xl font-semibold': props.level === 3,
        'text-xl font-medium': props.level === 4,
        'text-lg font-medium': props.level === 5,
        'text-base font-medium': props.level === 6,
      }
    ]"
  >
    {{ props.heading }}
  </component>
</template>

<script setup lang="ts">
  defineProps<{
    props: {
      level: number
      heading: string
    }
    fontFamily: string
  }>()
</script>
