<template>
  <div class="w-full p-4 bg-white">
    <div class="flex items-center gap-3 mb-2">
      <USelect
        v-model="localLanguage"
        :items="languageOptions"
        class="w-40"
        @update:model-value="handleSelectLanguage"
      />
    </div>
    
    <div class="relative">
      <div class="w-full p-3 bg-gray-50 rounded-md font-mono text-sm overflow-x-auto">
        <div ref="editorContainer" class="w-full h-full min-h-[100px]"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { basicSetup } from 'codemirror'
  import { EditorView, keymap } from '@codemirror/view'
  import { EditorState } from '@codemirror/state'
  import { indentWithTab } from '@codemirror/commands'
  import { javascript } from '@codemirror/lang-javascript'
  import { html } from '@codemirror/lang-html'
  import { css } from '@codemirror/lang-css'
  import { json } from '@codemirror/lang-json'
  import { markdown } from '@codemirror/lang-markdown'
  import { python } from '@codemirror/lang-python'
  import { go } from '@codemirror/lang-go'
  import { rust } from '@codemirror/lang-rust'
  import { cpp } from '@codemirror/lang-cpp'
  import { java } from '@codemirror/lang-java'
  import { php } from '@codemirror/lang-php'

  import type { CodeContent, CodeLanguage } from '@/types/elements'

  const props = defineProps<{
    content: CodeContent
  }>()

  const emit = defineEmits<{
    (e: 'contentUpdate', value: CodeContent): void
  }>()

  const localContent = ref(props.content.code || '// Code here')
  const localLanguage = ref<CodeLanguage>(props.content.language || 'javascript')
  const editorContainer = ref<HTMLElement | null>(null)
  const editor = ref<EditorView | null>(null)

  const languageOptions = [
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JSON', value: 'json' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'Python', value: 'python' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'Java', value: 'java' },
    { label: 'C++', value: 'cpp' },
    { label: 'PHP', value: 'php' },
  ]

  watch(() => props.content.code, (newValue) => {
    if (newValue !== undefined && newValue !== localContent.value) {
      localContent.value = newValue

      if (editor.value) {
        const transaction = editor.value.state.update({
          changes: {
            from: 0,
            to: editor.value.state.doc.length,
            insert: newValue
          }
        })
        editor.value.dispatch(transaction)
      }
    }
  })

  watch(() => props.content.language, (newValue) => {
    if (newValue !== undefined && newValue !== localLanguage.value) {
      localLanguage.value = newValue
      updateEditorLanguage()
    }
  })

  function handleSelectLanguage() {
    updateEditorLanguage()
    updateCode()
  }

  function updateEditorLanguage() {
    if (editor.value && editorContainer.value) {
      const currentContent = editor.value.state.doc.toString()
      editor.value.destroy()
      initCodeMirror(currentContent)
    }
  }

  function getLangExtension(language: CodeLanguage) {
    const langMap: Record<string, any> = {
      javascript: () => javascript(),
      typescript: () => javascript({ typescript: true }),
      html: () => html(),
      css: () => css(),
      json: () => json(),
      markdown: () => markdown(),
      python: () => python(),
      go: () => go(),
      rust: () => rust(),
      cpp: () => cpp(),
      java: () => java(),
      php: () => php()
    }
    
    if (language in langMap) {
      return langMap[language]()
    }
    return null
  }

  function initCodeMirror(content = localContent.value) {
    if (!editorContainer.value) return
    
    const langExtension = getLangExtension(localLanguage.value)
    const extensions = [
      basicSetup,
      keymap.of([indentWithTab]),
      EditorView.updateListener.of(update => {
        if (update.docChanged) {
          localContent.value = update.state.doc.toString()
          emitUpdate()
        }
      })
    ]
    
    if (langExtension) {
      extensions.push(langExtension)
    }
    
    const state = EditorState.create({
      doc: content,
      extensions,
    })
    
    editor.value = new EditorView({
      state,
      parent: editorContainer.value
    })
  }

  function updateCode() {
    emitUpdate()
  }

  function emitUpdate() {
    emit('contentUpdate', {
      code: localContent.value,
      language: localLanguage.value
    })
  }

  onMounted(() => {
    initCodeMirror()
  })

  onBeforeUnmount(() => {
    if (editor.value) {
      editor.value.destroy()
    }
  })
</script>

<style>
.cm-editor {
  height: 100%;
  min-height: 100px;
  outline: none !important;
}

.cm-scroller {
  overflow: auto;
}

.cm-gutters {
  border-right: 1px solid #ddd;
  background-color: #f8f9fa;
}

.cm-activeLineGutter {
  background-color: #e9ecef;
}
</style>