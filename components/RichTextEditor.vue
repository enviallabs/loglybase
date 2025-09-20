<template>
  <div class="container">
    <BubbleMenu :editor="editor">
      <div class="flex w-full bg-white border border-neutral-200 p-1 space-x-1 rounded-xl shadow-xs">
        <div
          v-for="option in toolbarOptions"
          :key="option.slug"
        >
          <div v-if="option.type === 'dropdown'">
            <UDropdownMenu
              :items="option.items"
              :popper="{ placement: 'right-end', offsetDistance: 10 }"
            >
              <UButton
                :key="option.slug"
                :icon="option.icon"
                color="neutral"
                variant="ghost"
                size="md"
                class="hover:bg-gray-200"
              />

              <template #item-label="{ item }">
                <span class="text-xs">{{ item.label?.toUpperCase() }}</span>
              </template>

              <template #item="{ item }">
                <div class="flex items-center space-x-2">
                  <UIcon v-if="item.icon" :name="item.icon" class="w-4 h-4 text-gray-400" />
                  <span class="truncate" :class="[item.customClass]">{{ item.label }}</span>
                </div>
              </template>
            </UDropdownMenu>
          </div>

          <div v-if="option.type === 'color'">
            <UDropdownMenu
              :items="option.items"
              :ui="{
                content: 'w-fit min-w-fit'
              }"
              :popper="{ placement: 'right-end', offsetDistance: 10 }"
            >
              <UButton
                :key="option.slug"
                :icon="option.icon"
                color="neutral"
                variant="ghost"
                class="hover:bg-gray-200"
              />
            
              <template #item="{ item }">
                <div class="flex flex-col">
                  <span
                    v-if="item.color as string !== 'none'"
                    class="w-5 h-5 rounded-full"
                    :style="`background-color: ${item.color};`"
                  />
                  <Icon v-else name="i-hugeicons-unavailable" class="ml-px text-lg" />
                </div>
              </template>
            </UDropdownMenu>
          </div>

          <div v-if="option.type === 'additionals'">
            <UDropdownMenu
              :items="option.items"
              :ui="{
                content: 'w-fit min-w-fit'
              }"
              :popper="{ placement: 'right-end', offsetDistance: 10 }"
            >
              <UButton
                :key="option.slug"
                :icon="option.icon"
                color="neutral"
                variant="ghost"
                size="md"
                class="hover:bg-gray-200"
              />

              <template #item="{ item }">
                <div class="flex flex-col">
                  <UIcon :name="item.icon || ''" />
                </div>
              </template>
            </UDropdownMenu>
          </div>
          
          <UButton
            v-if="option.type === 'button'"
            :key="option.slug"
            :icon="option.icon"
            color="neutral"
            variant="ghost"
            size="md"
            class="hover:bg-gray-200"
            @click="option.callback"
          />
        </div>
      </div>
    </BubbleMenu>
  
    <EditorContent
      :editor="editor"
      class="[&>*]:outline-none w-full [&>*]:min-h-14 text-sm"
    />
  </div>
</template>

<script setup lang="ts">
  import {
    EditorContent,
    BubbleMenu,
    type Editor,
    type JSONContent,
  } from '@tiptap/vue-3'

  const props = defineProps<{
    editor: Editor
    content?: JSONContent
  }>()

  const toolbarOptions: ToolbarOptions[] = [
    {
      slug: 'bold',
      type: 'button',
      icon: 'i-hugeicons-text-bold',
      callback: () => props.editor.commands.toggleBold()
    },
    {
      slug: 'italic',
      type: 'button',
      icon: 'i-hugeicons-text-italic',
      callback: () => props.editor.commands.toggleItalic()
    },
    {
      slug: 'underline',
      type: 'button',
      icon: 'i-hugeicons-text-underline',
      callback: () => props.editor.commands.toggleUnderline()
    },
    {
      slug: 'strikethrough',
      type: 'button',
      icon: 'i-hugeicons-text-strikethrough',
      callback: () => props.editor.commands.toggleStrike()
    },
    {
      slug: 'highlight',
      type: 'color',
      icon: 'i-hugeicons-colors',
      items: [
        [{
          label: 'Gray',
          color: '#64748b',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#64748b' })
        }, {
          label: 'Red',
          color: '#ef4444',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#ef4444' })
        }, {
          label: 'Orange',
          color: '#f97316',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#f97316' })
        }, {
          label: 'Yellow',
          color: '#eab308',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#eab308' })
        }, {
          label: 'Lime',
          color: '#84cc16',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#84cc16' })
        }, {
          label: 'Emerald',
          color: '#10b981',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#10b981' })
        }, {
          label: 'Sky',
          color: '#0ea5e9',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#0ea5e9' })
        }, {
          label: 'Blue',
          color: '#3b82f6',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#3b82f6' })
        }, {
          label: 'Purple',
          color: '#a855f7',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#a855f7' })
        }, {
          label: 'Pink',
          color: '#ec4899',
          onClick: () => props.editor.commands.toggleHighlight({ color: '#ec4899' })
        }, {
          label: 'None',
          color: 'none',
          onClick: () => props.editor.commands.unsetHighlight()
        }]
      ] as ColorItems[][]
    },
    {
      slug: 'text-color',
      type: 'color',
      icon: 'i-hugeicons-text-color',
      items: [
        [{
          label: 'Gray',
          color: '#64748b',
          onClick: () => props.editor.commands.setColor('#64748b')
        }, {
          label: 'Red',
          color: '#ef4444',
          onClick: () => props.editor.commands.setColor('#ef4444')
        }, {
          label: 'Orange',
          color: '#f97316',
          onClick: () => props.editor.commands.setColor('#f97316')
        }, {
          label: 'Yellow',
          color: '#eab308',
          onClick: () => props.editor.commands.setColor('#eab308')
        }, {
          label: 'Lime',
          color: '#84cc16',
          onClick: () => props.editor.commands.setColor('#84cc16')
        }, {
          label: 'Emerald',
          color: '#10b981',
          onClick: () => props.editor.commands.setColor('#10b981')
        }, {
          label: 'Sky',
          color: '#0ea5e9',
          onClick: () => props.editor.commands.setColor('#0ea5e9')
        }, {
          label: 'Blue',
          color: '#3b82f6',
          onClick: () => props.editor.commands.setColor('#3b82f6')
        }, {
          label: 'Purple',
          color: '#a855f7',
          onClick: () => props.editor.commands.setColor('#a855f7')
        }, {
          label: 'Pink',
          color: '#ec4899',
          onClick: () => props.editor.commands.setColor('#ec4899')
        }, {
          label: 'None',
          color: 'none',
          onClick: () => props.editor.commands.unsetColor()
        }]
      ] as ColorItems[][]
    },
    {
      slug: 'font',
      type: 'dropdown',
      icon: 'i-hugeicons-text-font',
      items: [
        [{
          label: 'Sans Serif',
          slot: 'heading',
          disabled: true
        }, {
          label: 'Inter',
          customClass: 'font-[Inter]',
          onClick: () => props.editor.commands.setFontFamily('Inter')
        }, {
          label: 'Arial',
          customClass: 'font-[Arial]',
          onClick: () => props.editor.commands.setFontFamily('Arial')
        }, {
          label: 'Helvetica',
          customClass: 'font-[Helvetica]',
          onClick: () => props.editor.commands.setFontFamily('Helvetica')
        }, {
          label: 'Sans',
          slot: 'heading',
          disabled: true
        }, {
          label: 'Times New Roman',
          customClass: 'font-[TimesNewRoman]',
          onClick: () => props.editor.commands.setFontFamily('Times New Roman')
        }, {
          label: 'Garamond',
          customClass: 'font-[Garamond]',
          onClick: () => props.editor.commands.setFontFamily('Garamond')
        }, {
          label: 'Georgia',
          customClass: 'font-[Georgia]',
          onClick: () => props.editor.commands.setFontFamily('Georgia')
        }, {
          label: 'Monospace',
          slot: 'heading',
          disabled: true
        }, {
          label: 'Courier',
          customClass: 'font-[Courier]',
          onClick: () => props.editor.commands.setFontFamily('Courier')
        }, {
          label: 'Courier New',
          customClass: 'font-[CourierNew]',
          onClick: () => props.editor.commands.setFontFamily('Courier New')
        }]
      ] as FontItems[][]
    },
    {
      slug: 'more-options',
      type: 'additionals',
      icon: 'i-hugeicons-preference-horizontal',
      items: [
        [{
          label: 'Subscript',
          icon: 'i-hugeicons-text-subscript',
          onClick: () => props.editor.commands.toggleSubscript()
        }, {
          label: 'Superscript',
          icon: 'i-hugeicons-text-superscript',
          onClick: () => props.editor.commands.toggleSuperscript()
        }, {
          label: 'Align left',
          icon: 'i-hugeicons-text-align-left',
          onClick: () => props.editor.commands.setTextAlign('left')
        }, {
          label: 'Align center',
          icon: 'i-hugeicons-text-align-center',
          onClick: () => props.editor.commands.setTextAlign('center')
        }, {
          label: 'Align right',
          icon: 'i-hugeicons-text-align-right',
          onClick: () => props.editor.commands.setTextAlign('right')
        }, {
          label: 'Align justify',
          icon: 'i-hugeicons-text-align-justify-center',
          onClick: () => props.editor.commands.setTextAlign('justify')
        }]
      ] as AdditionalToolItems[][]
    },
  ]

  watch(() => props.content, () => {
    if (props.editor && props.content) {
      props.editor.commands.setContent(props.content)
    }
  }, { immediate: true })
</script>