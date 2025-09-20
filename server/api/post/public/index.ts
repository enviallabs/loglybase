import prisma from '~/lib/prisma'

export default defineEventHandler(async (event) => {
  const { slug } = await getQuery(event)
  
  return await prisma.post.findMany({
    where: {
      project: {
        slug: slug as string,
      },
      status: 'PUBLISHED'
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
})