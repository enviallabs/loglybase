import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
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

  const data = {
    ...body,
    publishedAt: body.status && body.status === 'published' ? new Date() : null,
  }

  const post = await prisma.post.update({
    where: {
      code: id,
      createdBy: {
        id: session?.user.id,
      },
    },
    data,
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

  if (!post) {
    return createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  return post
})
