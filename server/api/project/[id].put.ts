import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const id = event.context.params?.id
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
    updatedAt: new Date(),
  }

  const project = await prisma.project.findUnique({
    where: {
      code: id,
      createdBy: {
        id: session?.user.id,
      },
    },
  })

  if (!project) {
    return createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  if (body.name && body.name !== project.name) {
    data.slug = body.name.toLowerCase().replace(/\s/g, '-')
  }

  const updatedProject = await prisma.project.update({
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

  return updatedProject
})
