export interface NavLink {
  label: string
  path: string
}

export const NAV_LINKS: NavLink[] = [
  { label: '首页', path: '/' },
  { label: '赛事中心', path: '/competitions' },
  { label: '零件商城', path: '/parts' },
  { label: '设备指南', path: '/equipment' },
  { label: '战队目录', path: '/teams' },
  { label: '新闻动态', path: '/news' },
  { label: '关于', path: '/about' },
]

export const SITE_NAME = 'FRC Hub'
export const SITE_DESCRIPTION = '中国 FRC 一站式信息平台'

export const FOOTER_LINKS = {
  platform: [
    { label: '赛事中心', path: '/competitions' },
    { label: '零件商城', path: '/parts' },
    { label: '设备指南', path: '/equipment' },
    { label: '战队目录', path: '/teams' },
  ],
  community: [
    { label: '新闻动态', path: '/news' },
    { label: '关于平台', path: '/about' },
  ],
  external: [
    { label: 'FIRST 官网', url: 'https://www.firstinspires.org/' },
    { label: 'The Blue Alliance', url: 'https://www.thebluealliance.com/' },
    { label: 'Chief Delphi', url: 'https://www.chiefdelphi.com/' },
  ],
}

export const TBA_CURRENT_YEAR = new Date().getFullYear()
