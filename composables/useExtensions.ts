import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TextStyle from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextAlign from '@tiptap/extension-text-align'
import CharacterCount from '@tiptap/extension-character-count'
import Table from '@tiptap/extension-table'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import FontFamily from '@tiptap/extension-font-family'
import Image from '@tiptap/extension-image'

import SlashCommands from '~/utils/extensions/commands'
import suggestion from '~/utils/extensions/commands/suggestion'

import { all, createLowlight } from 'lowlight'

const lowlight = createLowlight(all)

export default function useExtensions() {
  const extensions = ref([
    StarterKit.configure({
      codeBlock: false,
      history: false,
    }),
    Placeholder.configure({
      placeholder: 'Type / to browse option',
    }),
    Underline,
    TextStyle,
    Color,
    TaskList,
    Subscript,
    Superscript,
    CodeBlockLowlight.configure({
      lowlight,
    }),
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    }),
    Highlight.configure({
      multicolor: true,
    }),
    TaskItem.configure({
      nested: true,
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    CharacterCount,
    Table.configure({
      resizable: true,
    }),
    TableHeader,
    TableRow,
    TableCell,
    FontFamily,
    Image.configure({
      allowBase64: true,
    }),
    SlashCommands.configure({
      suggestion,
    }),
  ])

  return {
    extensions,
  }
}
