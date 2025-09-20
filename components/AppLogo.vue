<template>
  <NuxtLink :href="to" class="flex items-center space-x-2 cursor-pointer">
    <svg class="w-6" viewBox="0 0 121 124" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M74 0L121 0L48.4 90.6522H0L74 0Z" :fill="logoColor"/>
      <path d="M121 123.5V90.6522L48.4 90.6522V123.5H121Z" :fill="logoColor"/>
    </svg>

    <span
      class="text-xl font-bold !font-['Share_Tech']"
      :class="{ 'hidden sm:block': !withText }"
    >
      Loglybase
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
  withDefaults(defineProps<{
    to?: string
    logoColor?: string
    withText?: boolean
  }>(), {
    to: '/',
    logoColor: '#0A0A0A',
    withText: true
  })
</script>