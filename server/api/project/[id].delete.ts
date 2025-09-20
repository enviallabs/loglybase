import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const project = await prisma.project.delete({
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
      createdAt: true,
      updatedAt: true,
    },
  })

  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  return project
})
