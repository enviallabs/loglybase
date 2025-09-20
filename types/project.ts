export interface Project {
  id: number
  code: string
  slug: string
  name: string
  description: string | null
  logo: string | null
  customDomain?: string | null
  meta?: {
    heading?: string
    subheading?: string
  }
  theme?: string | null
  fontFamily?: string | null
  fontSize?: string | null
  customCss?: string | null
  createdAt: string
  updatedAt: string
  userId: string
  createdBy?: {
    noBranding: boolean
  }
}

export interface CreateProjectInput {
  name: string
  description?: string | null
  logo?: string | null
  meta: {
    heading?: string
    subheading?: string
  }
}

export interface UpdateProjectInput {
  slug?: string
  name?: string
  description?: string | null
  logo?: string | null
  customDomain?: string | null
  meta?: {
    heading?: string
    subheading?: string
  }
  theme?: string | null
  fontFamily?: string | null
  fontSize?: string | null
}
