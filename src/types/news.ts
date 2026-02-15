export type NewsCategory =
  | '赛事报道'
  | '技术分享'
  | '社区动态'
  | '队伍风采'

export interface NewsArticle {
  id: string
  title: string
  summary: string
  content: string
  category: NewsCategory
  date: string
  image?: string
  featured?: boolean
}
