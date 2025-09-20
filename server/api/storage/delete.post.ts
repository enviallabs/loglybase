import { DeleteObjectCommand } from '@aws-sdk/client-s3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig()

  await storage.send(
    new DeleteObjectCommand({
      Bucket: runtimeConfig.STORAGE_BUCKET,
      Key: body.fileName,
    }),
  )

  return {
    success: true,
  }
})
