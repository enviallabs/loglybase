<!-- eslint-disable vue/no-v-html -->
<template>
  <component
    :is="'p'"
    class="text-sm"
    :class="[fontFamily]"
  >
    <p v-html="cleanHtml()" />
  </component>
</template>

<script setup lang="ts">
  import { generateHTML, type JSONContent } from '@tiptap/vue-3'
  import DOMPurify from 'dompurify'

  const props = defineProps<{
    props: {
      content: TextContent
    }
    fontFamily: string
  }>()

  const { extensions } = useExtensions()

  function cleanHtml() {
    const html = generateHTML(props.props.content as JSONContent, extensions.value)

    return DOMPurify.sanitize(html)
  }
</script>