<template>
  <VCodeBlock
    :code="props.code"
    theme="nord"
    highlightjs
    class="text-sm"
  />
</template>

<script setup lang="ts">
  import VCodeBlock from '@wdns/vue-code-block'

  defineProps<{
    props: {
      code: string
    }
  }>()
</script>
