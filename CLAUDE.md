# FRC Hub - AI 工作流规范

## 项目概述
FRC Hub 是中国 FRC（FIRST Robotics Competition）一站式信息平台，提供比赛资讯、零件/设备信息、战队目录等功能。基于 React 18 + Vite + TypeScript 构建，部署于 GitHub Pages。

## 技术栈
- **框架**: React 18.3 + TypeScript 5.6
- **构建**: Vite, base 路径 `/frc-hub/`
- **路由**: React Router DOM v7（HashRouter），所有页面组件通过 `React.lazy` 懒加载
- **动画**: motion@12 + CSS keyframes
- **样式**: CSS Modules + CSS 变量（定义在 `variables.css`）
- **工具**: clsx（类名拼接）、react-icons（图标）
- **API**: The Blue Alliance API v3（比赛实时数据）
- **字体**: Inter（展示）+ Noto Sans SC（正文），Google Fonts CDN 加载
- **测试**: Vitest + @testing-library/react + @testing-library/jest-dom
- **截图**: Playwright（headless 视觉调试）

## 项目结构
```
src/
├── components/
│   ├── layout/        # Navbar, Footer, MobileMenu
│   ├── sections/      # 首页区块（HeroSection, CompetitionHighlights, FeaturedNews, StatsShowcase, CTASection）
│   ├── ui/            # 通用 UI（Button, Card, SearchInput, FilterBar, Badge, Skeleton, etc.）
│   └── competition/   # 赛事专用（MatchCard, RankingTable, EventCalendar）
├── pages/             # 页面组件
├── data/              # 静态数据（零件、设备、新闻、队伍、常量）
├── services/          # API 服务层（TBA API 封装）
├── hooks/             # 自定义 Hooks
├── types/             # TypeScript 类型定义
├── styles/            # 全局样式（variables.css, global.css, animations.css）
├── assets/images/     # WebP 图片资源
├── utils/             # 工具函数（cn.ts）
└── test/              # 测试文件
```

## 路由结构
- `/` — 首页
- `/competitions` — 赛事中心
- `/competitions/:key` — 赛事详情（TBA API）
- `/parts` — 零件商城
- `/parts/:id` — 零件详情
- `/equipment` — 设备指南
- `/equipment/:id` — 设备详情
- `/teams` — 战队目录
- `/teams/:number` — 战队详情（TBA API）
- `/news` — 新闻动态
- `/news/:id` — 新闻详情
- `/about` — 关于平台
- `*` — 404 页面

## 开发规范
- 组件使用函数式组件 + TypeScript
- 样式使用 CSS Modules，文件命名 `ComponentName.module.css`
- 所有颜色/间距/字号/阴影/圆角使用 CSS 变量
- 浅色主题：主色蓝 #2563EB，白色背景，柔和阴影
- 图片使用 WebP 格式，通过 OptimizedImage 组件懒加载
- 响应式设计：移动端优先，断点 sm(640px) / md(768px) / lg(1024px) / xl(1280px)

## TBA API 配置
- API Key 通过环境变量 `VITE_TBA_API_KEY` 注入
- 本地开发：`.env.local` 文件
- 生产环境：GitHub Repository Secrets → Actions 构建时注入
- 缓存策略：sessionStorage 缓存 API 响应

## 常用命令
- `npm run dev` — 启动开发服务器
- `npm run build` — TypeScript 检查 + 生产构建
- `npm run lint` — ESLint 代码检查
- `npm run test` — 运行单元测试
- `npm run preview` — 预览生产构建

## Git 提交规范
- 提交信息格式：`<type>: <description>`
- type: feat / style / refactor / fix / chore / docs
