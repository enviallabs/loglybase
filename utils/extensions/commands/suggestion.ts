import { CommandList } from '#components'

import { VueRenderer } from '@tiptap/vue-3'
import tippy, { type Instance, type Props } from 'tippy.js'

import type { Item, SuggestionProps, StartEndProps } from '@/types/extensions'

import { commandsList } from './itemsList'

export default {
  items: ({ query }: SuggestionProps): Item[] => {
    return commandsList
      .filter((item) =>
        item.title.toLowerCase().startsWith(query.toLowerCase()),
      )
      .slice(0, 10)
  },

  render: (): any => {
    let component: any
    let popup: Instance<Props>[]

    return {
      onStart: (props: StartEndProps): void => {
        component = new VueRenderer(CommandList, {
          props,
          editor: props.editor,
        })

        if (!props.clientRect) {
          return
        }

        popup = tippy('body', {
          getReferenceClientRect: props.clientRect,
          appendTo: () => document.body,
          content: component.element,
          showOnCreate: true,
          interactive: true,
          trigger: 'manual',
          placement: 'bottom-start',
        })
      },

      onUpdate(props: StartEndProps): void {
        component.updateProps(props)

        if (!props.clientRect) {
          return
        }

        popup[0].setProps({
          getReferenceClientRect: props.clientRect,
        })
      },

      onKeyDown(props: StartEndProps): any {
        if (props.event.key === 'Escape') {
          popup[0].hide()

          return true
        }

        return component?.ref?.onKeyDown(props)
      },

      onExit(): void {
        popup[0].destroy()
        component.destroy()
      },
    }
  },
}
