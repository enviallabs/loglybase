<template>
  <div class="w-full p-4 bg-white">
    <RichTextEditor v-if="editor" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
  import type { TextContent } from '~/types/elements'
  import { useEditor } from '@tiptap/vue-3'
  import '@catppuccin/highlightjs/css/catppuccin-latte.css'

  const props = defineProps<{
    content: TextContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: TextContent): void
  }>()
  
  const { extensions } = useExtensions()

  const editor = useEditor({
    content: '',
    extensions: extensions.value,
    
    onUpdate: () => {
      emitUpdate()
    },
  })

  watch(editor, () => {
    if (editor.value) {
      editor.value.commands.setContent(props.content.content)
    }
  }, { immediate: true })

  function emitUpdate() {
    emit('contentUpdate', {
      content: editor.value?.getJSON() || ''
    })
  }
</script>