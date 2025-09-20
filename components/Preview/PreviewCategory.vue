<template>
  <div
    class="border rounded-md"
    :class="{
      'border-added-200 dark:border-added-800': props.category === 'added',
      'border-changed-200 dark:border-changed-800': props.category === 'changed',
      'border-deprecated-200 dark:border-deprecated-800': props.category === 'deprecated',
      'border-removed-200 dark:border-removed-800': props.category === 'removed',
      'border-fixed-200 dark:border-fixed-800': props.category === 'fixed',
      'border-security-200 dark:border-security-800': props.category === 'security',
    }"
  >
    <h1
      class="p-2 text-sm font-medium rounded-t-sm"
      :class="{
        'text-added bg-added-100 dark:bg-added-900/50': props.category === 'added',
        'text-changed bg-changed-100 dark:bg-changed-900/50': props.category === 'changed',
        'text-deprecated bg-deprecated-100 dark:bg-deprecated-900/50': props.category === 'deprecated',
        'text-removed bg-removed-100 dark:bg-removed-900/50': props.category === 'removed',
        'text-fixed bg-fixed-100 dark:bg-fixed-900/50': props.category === 'fixed',
        'text-security bg-security-100 dark:bg-security-900/50': props.category === 'security',
      }"
    >
      {{ capitalize(props.category) }}
    </h1>

    <ul class="p-2 pl-6 text-sm list-disc">
      <li
        v-for="(item, itemIndex) in props.items"
        :key="itemIndex"
        :class="[fontFamily]"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { capitalize } from 'vue'

  defineProps<{
    props: {
      category: string
      items: string[]
    }
    fontFamily: string
  }>()
</script>
