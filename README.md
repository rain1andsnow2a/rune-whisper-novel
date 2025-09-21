# 网页互动小说-《符文的低语》

一个基于React + Vite构建的交互式小说阅读器，支持多章节阅读、角色介绍、阅读设置等功能。

## 🚀 在线体验

项目已部署到GitHub Pages，可以直接访问：
[https://YOUR_USERNAME.github.io/rune-whisper-novel/](https://YOUR_USERNAME.github.io/rune-whisper-novel/)

## 📦 部署到GitHub Pages

详细部署步骤请查看 [DEPLOY.md](./DEPLOY.md) 文件，或者直接运行：

```bash
# Windows用户
deploy.bat

# 或手动执行
git remote add origin https://github.com/YOUR_USERNAME/rune-whisper-novel.git
git push -u origin main
```

## 🛠️ 本地开发

### 环境准备

- 安装 [Node.js](https://nodejs.org/en) (推荐 18+)
- 安装 [pnpm](https://pnpm.io/installation)

### 操作步骤

```sh
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build:client
```

- 在浏览器访问 http://localhost:3000

## ✨ 功能特性

- 📖 多章节互动小说阅读
- 🎭 角色介绍页面
- ⚙️ 个性化阅读设置
- 🎵 背景音乐支持
- 📱 响应式设计，支持移动端
- 🌙 深色/浅色主题切换
- 💾 阅读进度保存

## 🏗️ 技术栈

- **前端框架**: React 18 + TypeScript
- **构建工具**: Vite
- **样式**: Tailwind CSS
- **动画**: Framer Motion
- **路由**: React Router
- **状态管理**: React Context
- **部署**: GitHub Pages + GitHub Actions
