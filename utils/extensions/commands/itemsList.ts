import type { CommandProps } from '@/types/extensions'

export const commandsList = [
  {
    title: 'Heading 1',
    icon: 'i-hugeicons-heading-01',
    command: ({ editor, range }: CommandProps): void => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 1 })
        .run()
    },
  },
  {
    title: 'Heading 2',
    icon: 'i-hugeicons-heading-02',
    command: ({ editor, range }: CommandProps): void => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 2 })
        .run()
    },
  },
  {
    title: 'Heading 3',
    icon: 'i-hugeicons-heading-03',
    command: ({ editor, range }: CommandProps): void => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .setNode('heading', { level: 3 })
        .run()
    },
  },
  {
    title: 'Bullet list',
    icon: 'i-hugeicons-left-to-right-list-bullet',
    command: ({ editor, range }: CommandProps): void => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run()
    },
  },
  {
    title: 'Numbered list',
    icon: 'i-hugeicons-left-to-right-list-number',
    command: ({ editor, range }: CommandProps): void => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run()
    },
  },
  {
    title: 'Task list',
    icon: 'i-hugeicons-check-list',
    command: ({ editor, range }: CommandProps): void => {
      editor.chain().focus().deleteRange(range).toggleTaskList().run()
    },
  },
  {
    title: 'Code block',
    icon: 'i-hugeicons-source-code',
    command: ({ editor, range }: CommandProps): void => {
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run()
    },
  },
  {
    title: 'Divider',
    icon: 'i-hugeicons-solid-line-01',
    command: ({ editor, range }: CommandProps): void => {
      editor.chain().focus().deleteRange(range).setHorizontalRule().run()
    },
  },
  {
    title: 'Table',
    icon: 'i-hugeicons-layout-table-01',
    command: ({ editor, range }: CommandProps): void => {
      editor.chain().focus().deleteRange(range).insertTable().run()
    },
  },
]
