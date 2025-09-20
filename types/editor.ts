export interface Block {
  type: string
  label: string
  icon: string
  defaultProps?: Record<string, any>
}

type OptionType = 'button' | 'color' | 'dropdown' | 'additionals'

export interface ColorItems {
  label: string
  color: string
  onClick: () => void
}

export interface FontItems {
  label: string
  customClass: string
  slot?: string
  disabled?: boolean
  onClick: () => void
}

export interface AdditionalToolItems {
  label: string
  icon: string
  onClick: () => void
}

export interface ToolbarOptions {
  slug: string
  type: OptionType
  icon: string
  items?: any[][]
  callback?: () => void
  suggestion?: ({ query }: SuggestionProps) => Item[]
}
