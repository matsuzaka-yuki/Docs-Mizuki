---
title: Cloudflare Pages 部署
createTime: 2025/11/21 12:00:00
permalink: /guide/deploy/Cloudflare/
---

# Cloudflare Pages 部署指南

Cloudflare Pages 是一个优秀的静态网站托管平台，具有全球 CDN、自动部署和免费 SSL 证书等特性。本指南将详细介绍如何将 Mizuki (Astro项目) 部署到 Cloudflare Pages。

## 准备工作

1. **Git 仓库**：确保您的 Mizuki 项目已上传到 GitHub、GitLab 或其他支持的 Git 平台
2. **Cloudflare 账号**：注册一个免费的 Cloudflare 账号

## 部署步骤

### 1. 登录 Cloudflare Pages

访问 [Cloudflare Dashboard](https://dash.cloudflare.com/)，使用您的账号登录，然后选择 "Pages" 服务。

### 2. 创建新项目

1. 点击 "Create a project" 或 "Connect to Git" 按钮
2. 选择您的 Git 提供商（GitHub、GitLab 等）并授权
3. 从列表中选择您的 Mizuki 项目仓库

### 3. 配置构建设置

在项目设置页面中，配置以下构建设置：

#### 基本设置

- **Project name**: 输入您的项目名称（如 `mizuki-blog`）
- **Production branch**: 设置主分支（通常为 `main` 或 `master`）

#### 构建配置

```yaml title="Cloudflare Pages 构建设置"
# 构建设置
Build command: pnpm i && pnpm build
Build output directory: dist
Root directory: / 
```

#### 环境变量（可选）

如果您的项目需要环境变量，可以在 "Environment variables" 部分添加：

| 变量名 | 值 | 说明 |
|--------|-----|------|
| NODE_VERSION | 18 | 指定 Node.js 版本 |
| PNPM_VERSION | 8 | 指定 pnpm 版本 |

### 4. 部署项目

配置完成后，点击 "Save and Deploy" 开始首次部署：

1. Cloudflare Pages 会克隆您的仓库
2. 安装依赖（`pnpm i`）
3. 构建项目（`pnpm build`）
4. 将 `dist` 目录部署到全球 CDN

首次部署可能需要几分钟时间。

### 5. 获取部署信息

部署完成后，您将获得：

- **站点 URL**：如 `https://mizuki-blog.pages.dev`
- **自动生成的 SSL 证书**
- **全球 CDN 分发**

## 高级配置

### 自定义域名

1. 在项目设置中，选择 "Custom domains"
2. 添加您的域名（如 `blog.yourdomain.com`）
3. 按照提示配置 DNS 记录
4. Cloudflare 会自动配置 SSL 证书

### 部署钩子

如果需要触发部署，可以使用部署钩子：

1. 在项目设置中找到 "Deploy hooks"
2. 创建新的部署钩子
3. 保存生成的 URL，用于触发重新部署

### 预览部署

每个推送的 PR 都会自动创建预览部署：

- URL 格式：`https://<branch-name>-<project-name>.pages.dev`
- 可以用于预览更改，不影响生产环境

## 常见问题

### Q: 构建失败怎么办？

A: 检查以下几点：

1. 确保 `package.json` 中包含 `pnpm` 的构建脚本
2. 检查 Node.js 版本是否兼容
3. 查看构建日志中的错误信息
4. 确保所有依赖已正确安装

### Q: 如何使用自定义镜像源？

A: 在根目录创建 `.npmrc` 文件：

```ini title=".npmrc"
registry=https://registry.npmmirror.com
```

### Q: 如何优化构建速度？

A: 可以尝试以下方法：

1. 启用构建缓存
2. 优化依赖安装，使用 `.npmrc` 配置
3. 减少不必要的依赖

## 本地预览部署

在部署前，您可以在本地预览构建结果：

```bash title="本地构建命令"
# 安装依赖
pnpm i

# 构建项目
pnpm build

# 本地预览
pnpm preview
```

访问 `http://localhost:4321` 查看构建后的网站。

## CI/CD 集成

Cloudflare Pages 支持自动部署，当您推送代码到指定分支时：

1. 自动触发构建流程
2. 构建成功后自动更新网站
3. 失败时发送通知

您可以在项目设置中配置：

- 部署分支
- 部署条件
- 失败时的操作

## 性能优化

### 图片优化

Cloudflare Pages 自动提供图片优化服务：

- 自动转换格式（如 WebP）
- 根据设备调整尺寸
- 自动压缩

### 缓存策略

默认缓存配置：

- HTML 文件：不缓存
- 静态资源（CSS、JS、图片）：长期缓存

您可以在 `_headers` 文件中自定义缓存策略：

```ini title="public/_headers"
/cache-control/*
  Cache-Control: public, max-age=31536000, immutable
```

## 监控与分析

Cloudflare 提供内置的分析工具：

1. **页面访问量**：查看访问统计
2. **性能指标**：监控加载速度
3. **安全分析**：查看威胁检测

访问 "Analytics" 部分查看详细数据。

## 成本

Cloudflare Pages 的免费计划包括：

- 每月 500 次构建
- 无限静态请求
- 20,000 次服务器请求
- 全球 CDN 分发
- 免费 SSL 证书

对于个人博客和小型网站，免费计划通常足够使用。

## 总结

Cloudflare Pages 是部署 Mizuki (Astro项目) 的优秀选择，具有以下优势：

- 🚀 部署简单，配置直观
- 🌍 全球 CDN，访问速度快
- 🔒 免费 SSL 证书
- 🔄 自动部署
- 📊 内置分析工具

按照本指南操作，您应该能够成功将 Mizuki 博客部署到 Cloudflare Pages，享受快速、稳定的访问体验。