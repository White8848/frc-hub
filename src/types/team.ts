export interface SocialLink {
  platform: string
  url: string
}

export interface Team {
  number: number
  name: string
  school: string
  city: string
  province: string
  yearFounded: number
  logo?: string
  description?: string
  socialLinks?: SocialLink[]
}
