import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const { status } = await readBody(event)
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  await prisma.post.update({
    where: {
      code: id,
      createdBy: {
        id: session?.user.id,
      },
    },
    data: {
      status,
      publishedAt: new Date(),
    },
  })
})
