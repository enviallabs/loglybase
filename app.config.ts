export default defineAppConfig({
  ui: {
    colors: {
      primary: 'neutral',
      stable: 'green',
      beta: 'yellow',
      alpha: 'red',
      rc: 'purple',
      patch: 'blue',
      added: 'green',
      changed: 'yellow',
      removed: 'red',
      deprecated: 'orange',
      fixed: 'blue',
      security: 'purple',
    },

    navigationMenu: {
      variants: {
        active: {
          false: {
            link: 'text-neutral',
            linkLeadingIcon: 'text-neutral',
          },
        },
      },
      compoundVariants: [
        {
          variant: 'pill',
          active: true,
          highlight: false,
          class: {
            link: 'before:bg-zinc-100 before:border before:border-zinc-200',
          },
        },
      ],
    },

    tabs: {
      variants: {
        variant: {
          pill: {
            list: 'rounded-xl',
            indicator: 'rounded-lg',
          },
        },
      },
    },

    button: {
      slots: {
        base: 'rounded-lg',
      },
    },
  },
})
