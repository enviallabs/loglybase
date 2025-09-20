import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!

  const project = await prisma.project.findUnique({
    where: {
      slug: id as string,
    },
    select: {
      slug: true,
      name: true,
      description: true,
      logo: true,
      meta: true,
      theme: true,
      fontFamily: true,
      fontSize: true,
      customCss: true,
      updatedAt: true,
      createdBy: {
        select: {
          noBranding: true,
        },
      },
    },
  })

  return project
})
