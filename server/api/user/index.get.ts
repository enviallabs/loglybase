import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    return
  }

  return await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  })
})
