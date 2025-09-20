import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  return await prisma.project.findUnique({
    where: {
      code: id,
    },
    select: {
      id: true,
      code: true,
      slug: true,
      name: true,
      description: true,
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
})
