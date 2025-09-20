import type { JSONContent } from '@tiptap/vue-3'

export interface TextContent {
  content: JSONContent | string
}

export type CategoryType =
  | 'added'
  | 'changed'
  | 'deprecated'
  | 'removed'
  | 'fixed'
  | 'security'

export interface CategoryContent {
  category: CategoryType
  items: string[]
}

export type CodeLanguage =
  | 'javascript'
  | 'typescript'
  | 'html'
  | 'css'
  | 'json'
  | 'markdown'
  | 'bash'
  | 'python'
  | 'go'
  | 'rust'
  | 'java'
  | 'c'
  | 'cpp'
  | 'csharp'
  | 'php'
  | 'ruby'
  | 'swift'
  | 'kotlin'
  | 'plaintext'

export interface CodeContent {
  language?: CodeLanguage
  code: string
}

export type DividerStyle = 'solid' | 'dashed' | 'dotted'

export interface DividerContent {
  style?: DividerStyle
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface HeadingContent {
  level: HeadingLevel
  text: string
}

export type UploadType = 'url' | 'upload'

export interface ImageContent {
  src: string
  alt: string
  uploadType: UploadType
}

export type ListType = 'ordered' | 'unordered'

export interface ListContent {
  ordered: boolean
  items: string[]
}

export type ReleaseType = 'stable' | 'beta' | 'alpha' | 'rc' | 'patch'

export interface VersionContent {
  type: ReleaseType
  version: string
  date: any
  description: string
  commitHash: string
}

export interface VideoContent {
  src: string
  title: string
  uploadType: UploadType
}
