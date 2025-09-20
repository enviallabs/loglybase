import type { Editor, Range } from '@tiptap/vue-3'

export interface CommandProps {
  editor: Editor
  range: Range
}

export interface Item {
  title: string
  icon: string
  command: ({ editor, range }: CommandProps) => void
}

export interface SuggestionProps {
  query: string
}

export interface StartEndProps {
  editor: Editor
  clientRect: () => any
  event: KeyboardEvent
}
