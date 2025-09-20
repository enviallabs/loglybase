import { createId } from '@paralleldrive/cuid2'

import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const { title, status, content, projectCode } = body

  return await prisma.post.create({
    data: {
      code: `post_${createId()}`,
      title,
      status,
      content: content || [],
      project: {
        connect: {
          code: projectCode,
        },
      },
      createdBy: {
        connect: {
          id: session?.user.id,
        },
      },
    },
    select: {
      id: true,
      code: true,
      title: true,
      status: true,
      meta: true,
      content: true,
      createdAt: true,
      updatedAt: true,
      publishedAt: true,
    },
  })
})
