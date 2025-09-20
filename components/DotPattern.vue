<template>
  <svg
    aria-hidden="true"
    class="pointer-events-none absolute inset-0 h-full w-full fill-gray-500/80 [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
    v-bind="$attrs"
  >
    <defs>
      <pattern
        id="1"
        :width="12"
        :height="12"
        patternUnits="userSpaceOnUse"
        patternContentUnits="userSpaceOnUse"
        :x="0"
        :y="0"
      >
        <circle id="pattern-circle" :cx="1" :cy="1" :r="1" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" stroke-width="0" :fill="`url(#1)`" />
  </svg>
</template>