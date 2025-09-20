<template>
  <div class="mt-2 flex justify-center">
    <UDropdownMenu
      :items="blockList"
      :popper="{ placement: 'top' }"
      :ui="{
        content: 'min-w-40'
      }"
      class="sm:hidden w-full p-8 flex items-center justify-center"
    >
      <UButton
        icon="i-hugeicons-plus-sign"
        variant="outline"
        color="neutral"
        :ui="{
          base: 'border border-dashed border-neutral-400 ring-0'
        }"
      >
        Add Block
      </UButton>
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
  import { createId } from '@paralleldrive/cuid2'

  const emits = defineEmits(['addElement'])

  const blockList = computed(() => {
    return [
      {
        label: 'General',
        slot: 'heading',
        disabled: true
      },
      {
        label: 'Text',
        icon: 'i-hugeicons-text',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'text',
          props: { instance: '', content: '' }
        })
      },
      {
        label: 'Heading',
        icon: 'i-hugeicons-heading',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'heading',
          props: { text: 'Heading', level: 2 }
        })
      },
      {
        label: 'List',
        icon: 'i-hugeicons-left-to-right-list-bullet',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'list',
          props: { items: [], ordered: false }
        })
      },
      {
        label: 'Code',
        icon: 'i-hugeicons-source-code',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'code',
          props: { code: '// Code here', language: 'javascript' }
        })
      },
      {
        label: 'Changelog',
        slot: 'heading',
        disabled: true
      },
      {
        label: 'Category',
        icon: 'i-hugeicons-node-add',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'category',
          props: { category: 'added', items: [] }
        })
      },
      {
        label: 'Divider',
        icon: 'i-hugeicons-solid-line-01',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'divider',
          props: { style: 'solid' }
        })
      },
      {
        label: 'Media',
        slot: 'heading',
        disabled: true
      },
      {
        label: 'Image',
        icon: 'i-hugeicons-image-01',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'image',
          props: { src: '', alt: '', uploadType: 'url' }
        })
      },
      {
        label: 'Video',
        icon: 'i-hugeicons-video-01',
        onClick: () => emits('addElement', {
          id: createId(),
          type: 'video',
          props: { src: '', title: '', uploadType: 'url' }
        })
      },
    ]
  })
</script>