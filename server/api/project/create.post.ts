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

  const { name, description, logo } = body
  const code = createId()

  if (!name) {
    return createError({
      statusCode: 400,
      statusMessage: 'Project name is required',
    })
  }

  const project = await prisma.project.create({
    data: {
      code: `pr_${code}`,
      slug: name.toLowerCase().replace(/\s/g, '-'),
      name,
      description,
      logo,
      createdBy: {
        connect: {
          id: session?.user.id,
        },
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
      statusCode: 500,
      statusMessage: 'Project creation failed',
    })
  }

  await prisma.user.update({
    where: {
      id: session?.user.id,
    },
    data: {
      onboardingCompleted: true,
    },
  })

  return project
})
