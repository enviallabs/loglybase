import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const project = await prisma.project.findUnique({
    where: {
      code: id,
      createdBy: {
        id: session?.user.id,
      },
    },
    select: {
      id: true,
      code: true,
      slug: true,
      name: true,
      description: true,
      logo: true,
      customDomain: true,
      meta: true,
      theme: true,
      primaryColor: true,
      fontFamily: true,
      fontSize: true,
      customCss: true,
      posts: {
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
      },
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  return project
})
