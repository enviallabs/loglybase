import type { Block } from '@/types/editor'

const general: Block[] = [
  {
    type: 'text',
    label: 'Text',
    icon: 'text',
    defaultProps: { content: '' },
  },
  {
    type: 'heading',
    label: 'Heading',
    icon: 'heading',
    defaultProps: { text: 'Heading', level: 2 },
  },
  {
    type: 'list',
    label: 'List',
    icon: 'list',
    defaultProps: { items: [], ordered: false },
  },
  {
    type: 'code',
    label: 'Code',
    icon: 'code',
    defaultProps: { code: '// Code here', language: 'javascript' },
  },
]

const changelog: Block[] = [
  {
    type: 'category',
    label: 'Category',
    icon: 'category',
    defaultProps: { category: 'added', items: [] },
  },
  {
    type: 'divider',
    label: 'Divider',
    icon: 'divider',
    defaultProps: { style: 'solid' },
  },
]

const media: Block[] = [
  {
    type: 'image',
    label: 'Image',
    icon: 'image',
    defaultProps: { src: '', alt: '', uploadType: 'url' },
  },
  {
    type: 'video',
    label: 'Video',
    icon: 'video',
    defaultProps: { src: '', title: '', uploadType: 'url' },
  },
]

export const blockSections = [
  {
    title: 'General',
    blocks: general,
  },
  {
    title: 'Changelog',
    blocks: changelog,
  },
  {
    title: 'Media',
    blocks: media,
  },
]
