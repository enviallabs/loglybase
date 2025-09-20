import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params!
  const session = await auth.api.getSession({
    headers: event.headers,
  })
  const runtimeConfig = useRuntimeConfig()

  if (!session?.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const post = await prisma.post.delete({
    where: {
      code: id,
      createdBy: {
        id: session?.user.id,
      },
    },
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
  })

  if (!post) {
    return createError({
      statusCode: 404,
      statusMessage: 'Post not found',
    })
  }

  if (post.content) {
    const mediaElements = (post.content as any[]).filter((element: any) => {
      if (
        (element.type === 'image' && element.props.uploadType === 'upload') ||
        (element.type === 'video' && element.props.uploadType === 'upload')
      ) {
        return element
      }
    })

    for (const element of mediaElements) {
      const fileName = element.props.url.split('/').pop()

      await storage.send(
        new DeleteObjectCommand({
          Bucket: runtimeConfig.STORAGE_BUCKET,
          Key: fileName,
        }),
      )
    }
  }

  return post
})
