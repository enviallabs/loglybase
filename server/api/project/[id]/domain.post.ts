import prisma from '~/lib/prisma'
import { auth } from '~/server/utils/auth'
import dns from 'dns/promises'
import fs from 'fs/promises'
import path from 'path'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { id } = getRouterParams(event)
  const body = await readBody(event)
  const session = await auth.api.getSession({
    headers: event.headers,
  })

  if (!session?.user) {
    return createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    })
  }

  const domain = body.domain.trim().toLowerCase()

  const records: any[] = await dns.resolveCname(domain).catch(() => [])

  if (!records.includes(config.BASE_URL)) {
    return createError({
      statusCode: 400,
      statusMessage: 'Domain does not point to this server',
    })
  }

  const routerId = `custom-${domain.replace(/\./g, '-')}`
  const fileName = `${domain}.toml`
  const filePath = path.join('/etc/traefik/custom_domains', fileName)

  const tomlContent = `
    [http.services]
      [http.services.app.loadBalancer]
        [[http.services.app.loadBalancer.servers]]
          url = "http://app:3000"
  
    [http.routers]
      [http.routers.${routerId}]
        rule = "Host(\`${domain}\`)"
        entrypoints = ["https"]
        service = "app"
        [http.routers.${routerId}.tls]
          certResolver = "myresolver"
  `

  const exists = await fs
    .stat(filePath)
    .then(() => true)
    .catch(() => false)

  if (!exists) {
    await fs.writeFile(filePath, tomlContent, 'utf-8')
  }

  const project = await prisma.project.update({
    where: {
      code: id,
      createdBy: {
        id: session?.user.id,
      },
    },
    data: {
      customDomain: body.domain,
    },
    select: {
      id: true,
      code: true,
      slug: true,
      name: true,
      description: true,
      logo: true,
      customDomain: true,
      meta: true,
      theme: true,
      primaryColor: true,
      fontFamily: true,
      fontSize: true,
      customCss: true,
      createdAt: true,
      updatedAt: true,
    },
  })

  return project
})
