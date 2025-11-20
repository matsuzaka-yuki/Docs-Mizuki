---
title: EdgeOne Pages 部署
createTime: 2025/11/21 02:01:00
permalink: /guide/deploy/Edge/
---

# 部署到 EdgeOne Pages

EdgeOne Pages 是腾讯云提供的静态网站托管服务，支持自动部署，与 GitHub 集成良好，非常适合部署 Mizuki 博客。

## 准备工作

1. 拥有一个 GitHub 账号
2. 准备好你的 Mizuki 博客项目代码
3. 注册腾讯云账号（如果还没有）

## 部署步骤

### 第一步：创建 GitHub 仓库

1. 登录你的 [GitHub](https://github.com) 账号
2. 点击右上角的 "+" 号，选择 "New repository"
3. 填写仓库名称（如：mizuki-blog）
4. 选择公开（Public）或私有（Private）仓库
5. 勾选 "Add a README file"（可选）
6. 点击 "Create repository" 创建仓库
7. 将你的 Mizuki 博客代码推送到这个仓库

### 第二步：配置 EdgeOne Pages

1. 登录 [腾讯云控制台](https://console.cloud.tencent.com/)
2. 在搜索框中输入 "EdgeOne"，点击进入 EdgeOne 产品页面
3. 在左侧导航栏找到 "EdgeOne Pages" 并点击
4. 点击 "添加站点" 或 "新建应用" 按钮

### 第三步：连接 GitHub 仓库

1. 在部署设置页面，选择 "GitHub" 作为代码源
2. 系统会跳转到 GitHub 授权页面，点击 "Authorize" 授权 EdgeOne 访问你的 GitHub 账号
3. 返回 EdgeOne 页面后，从下拉列表中选择你刚刚创建的仓库
4. 选择要部署的分支（通常是 main 或 master）

### 第四步：配置构建设置

这是关键步骤，需要正确配置构建命令：

1. **框架预设**：选择 "VuePress" 或 "静态网站"
2. **构建命令**：修改为 `pnpm i && pnpm build`
3. **输出目录**：设置为 `.vuepress/dist`
4. **Node.js 版本**：建议选择 18.x 或更高版本

完成配置后，EdgeOne Pages 会自动开始构建你的网站。

### 第五步：访问网站

构建完成后，EdgeOne Pages 会提供一个默认的域名（通常是一个随机字符串加上 `.edgeone.pages.dev`）。你可以：

1. 使用这个默认域名访问你的网站
2. 在域名设置中绑定自定义域名（可选）

## 重要提示

### 1. 构建命令配置

**必须**使用以下构建命令：
```bash
pnpm i && pnpm build
```

**注意**：不要使用默认的 `npm install` 或 `yarn install`，因为 Mizuki 项目使用 pnpm 作为包管理器。

### 2. 构建失败排查

如果构建失败，检查以下几点：

1. **包管理器**：确认使用了 `pnpm` 而不是 `npm` 或 `yarn`
2. **Node.js 版本**：使用 18.x 或更高版本
3. **构建输出**：确认输出目录设置正确（`.vuepress/dist`）
4. **依赖安装**：检查 package.json 中的依赖是否完整

### 3. 自动部署

EdgeOne Pages 会自动监听你的 GitHub 仓库变化：

- 当你向仓库推送新代码时，EdgeOne 会自动触发构建
- 构建成功后，网站会自动更新
- 可以在 EdgeOne 控制台查看构建历史和日志

## 自定义域名（可选）

如果你想使用自己的域名：

1. 在 EdgeOne Pages 控制台点击 "域名设置"
2. 添加你的自定义域名（如：blog.yourdomain.com）
3. 按照提示配置 DNS 记录
4. 等待 SSL 证书自动颁发

## 优化建议

1. **启用缓存**：在 EdgeOne 中开启适当的缓存策略，提高网站访问速度
2. **CDN 加速**：EdgeOne 自带全球 CDN，无需额外配置
3. **压缩资源**：EdgeOne 会自动压缩静态资源，无需手动配置

## 总结

通过 EdgeOne Pages 部署 Mizuki 博客非常简单，只需要：

1. 创建 GitHub 仓库
2. 在 EdgeOne 中连接仓库
3. 配置正确的构建命令（`pnpm i && pnpm build`）
4. 等待自动部署完成

整个过程通常只需要几分钟，而且完全免费，非常适合个人博客使用。
