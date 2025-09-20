import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { projectCode } = await getQuery(event)
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  return await prisma.post.findMany({
    where: {
      project: {
        code: projectCode as string,
      },
      createdBy: {
        id: session?.user.id,
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
    orderBy: {
      createdAt: 'desc',
    },
  })
})
