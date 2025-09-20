import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const runtimeConfig = useRuntimeConfig()

  const command = new PutObjectCommand({
    Bucket: runtimeConfig.STORAGE_BUCKET,
    Key: body.filename,
    ContentType: body.contentType,
  })

  const uploadUrl = await getSignedUrl(storage, command, { expiresIn: 60 })

  return {
    uploadUrl,
    publicUrl: `https://${runtimeConfig.STORAGE_BUCKET}.${runtimeConfig.STORAGE_ENDPOINT}/${body.filename}`,
  }
})
