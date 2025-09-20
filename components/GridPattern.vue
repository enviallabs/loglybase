<template>
  <svg
    aria-hidden="true"
    :class="[
      'pointer-events-none absolute inset-0 h-full w-full fill-gray-300/30 stroke-gray-300/30',
      classes
    ]"
    v-bind="$attrs"
  >
    <defs>
      <pattern
        :id="patternId"
        :width="width"
        :height="height"
        patternUnits="userSpaceOnUse"
        :x="x"
        :y="y"
      >
        <path
          :d="`M.5 ${height}V.5H${width}`"
          fill="none"
          :stroke-dasharray="strokeDasharray"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" stroke-width="0" :fill="`url(#${patternId})`" />
    <svg v-if="squares" :x="x" :y="y" class="overflow-visible">
      <rect
        v-for="[squareX, squareY] in squares as number[][]"
        :key="`${squareX}-${squareY}`"
        stroke-width="0"
        :width="width - 1"
        :height="height - 1"
        :x="squareX * width + 1"
        :y="squareY * height + 1"
      />
    </svg>
  </svg>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    width?: number
    height?: number
    x?: number
    y?: number
    strokeDasharray?: string
    squares: number[][]
    classes?: string
  }>(), {
    width: 40,
    height: 40,
    x: -1,
    y: -1,
    strokeDasharray: '0',
    classes: ''
  })

  const patternId = computed(() => `grid-pattern-${Math.random().toString(36).substring(2, 9)}`)
</script>