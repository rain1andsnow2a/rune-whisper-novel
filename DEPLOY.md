# GitHub Pages 部署指南

## 步骤1: 创建GitHub仓库

1. 登录到 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮，选择 "New repository"
3. 仓库名称填写: `rune-whisper-novel`
4. 描述填写: `网页互动小说-《符文的低语》- 一个基于React的交互式小说阅读器`
5. 选择 "Public" (公开仓库)
6. 不要勾选 "Add a README file"
7. 点击 "Create repository"

## 步骤2: 推送代码到GitHub

在项目根目录打开终端，执行以下命令:

```bash
# 初始化git仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 网页互动小说-符文的低语"

# 添加远程仓库 (替换YOUR_USERNAME为你的GitHub用户名)
git remote add origin https://github.com/YOUR_USERNAME/rune-whisper-novel.git

# 推送到main分支
git branch -M main
git push -u origin main
```

## 步骤3: 启用GitHub Pages

1. 在GitHub仓库页面，点击 "Settings" 标签
2. 在左侧菜单中找到 "Pages"
3. 在 "Source" 部分，选择 "Deploy from a branch"
4. 选择分支: `gh-pages`
5. 文件夹选择: `/ (root)`
6. 点击 "Save"

## 步骤4: 等待部署完成

- GitHub Actions会自动构建和部署你的网站
- 在仓库的 "Actions" 标签页可以查看部署进度
- 部署完成后，你的网站将在以下地址可访问:
  `https://YOUR_USERNAME.github.io/rune-whisper-novel/`

## 注意事项

- 首次部署可能需要几分钟时间
- 每次推送到main分支都会自动触发重新部署
- 如果遇到问题，请检查GitHub Actions的日志

## 本地开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm run dev

# 构建生产版本
pnpm run build
```