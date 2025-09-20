import { createAuthClient } from 'better-auth/vue'
import { apiKeyClient } from 'better-auth/client/plugins'

export default function useAuthClient() {
  const authClient = createAuthClient({
    baseURL: import.meta.env.BETTER_AUTH_URL,
    plugins: [apiKeyClient()],
  })

  return {
    authClient,
  }
}
