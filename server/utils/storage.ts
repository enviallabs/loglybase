import { PutBucketCorsCommand, S3Client } from '@aws-sdk/client-s3'

const runtimeConfig = useRuntimeConfig()

export const storage = new S3Client({
  region: 'eu-central',
  endpoint: `https://${runtimeConfig.STORAGE_ENDPOINT}`,
  credentials: {
    accessKeyId: runtimeConfig.STORAGE_ACCESS_KEY,
    secretAccessKey: runtimeConfig.STORAGE_SECRET_KEY,
  },
  forcePathStyle: true,
})

storage.send(
  new PutBucketCorsCommand({
    Bucket: runtimeConfig.STORAGE_BUCKET,
    CORSConfiguration: {
      CORSRules: [
        {
          AllowedHeaders: ['*'],
          AllowedMethods: ['GET', 'PUT', 'POST', 'HEAD', 'DELETE'],
          AllowedOrigins: [
            `${runtimeConfig.SSL_PREFIX}://${runtimeConfig.BASE_URL}`,
          ],
          ExposeHeaders: ['ETag'],
          MaxAgeSeconds: 3000,
        },
      ],
    },
  }),
)
