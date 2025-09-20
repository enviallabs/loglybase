<template>
  <div class="space-y-2">
    <UBadge
      :color="meta.type"
      variant="subtle"
      :class="[fontFamily]"
    >
      {{ meta.version }}-{{ meta.type }}
    </UBadge>

    <div class="flex items-center space-x-2" :class="[fontFamily]">
      <p class="text-xs text-neutral-400">
        {{ new CalendarDate(meta.date.year, meta.date.month, meta.date.day) }}
      </p>
      <UChip v-if="meta.commitHash" size="3xs" />
      <p class="text-xs">{{ meta.commitHash }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { CalendarDate } from '@internationalized/date'

  defineProps<{
    meta: VersionContent
    fontFamily: string
  }>()
</script>