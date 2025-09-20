import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { host } = await getQuery(event)

  if (!host) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing host',
    })
  }

  const project = await prisma.project.findFirst({
    where: {
      customDomain: host as string,
    },
  })

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    })
  }

  return {
    slug: project?.slug,
  }
})
