import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'
import fs from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
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
  })

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  if (!project.customDomain) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project does not have a custom domain',
    })
  }

  const customDomain = project.customDomain
  const filePath = path.join(
    '/etc/traefik/custom_domains',
    `${customDomain}.toml`,
  )

  await fs.unlink(filePath).catch(() => null)

  const updatedProject = await prisma.project.update({
    where: {
      code: id,
      createdBy: {
        id: session?.user.id,
      },
    },
    data: {
      customDomain: null,
    },
  })

  return updatedProject
})
