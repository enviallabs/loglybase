import type { PostStatus } from '@prisma/client'
import type { Project } from './project'

export interface Post {
  id: number
  code: string
  title: string
  status: PostStatus
  projectCode: string
  project?: Project
  content: any
  meta: any
  userId: string
  createdAt: string
  updatedAt: string
  publishedAt: string | null
}

export interface CreatePostInput {
  title: string
  status?: PostStatus
}

export interface UpdatePostInput {
  title?: string
  status?: PostStatus
  publishedAt?: string | null
}
