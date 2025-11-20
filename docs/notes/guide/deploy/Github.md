---
title: 部署到Github Pages
createTime: 2025/11/21 01:56:44
permalink: /guide/deploy/Github/
---

## 部署到 GitHub Pages(不在推荐)

如果您希望将博客托管在 GitHub Pages 上，Mizuki 项目通常会包含一个 GitHub Actions 工作流，可以帮助您自动化部署过程。您需要确保在 `astro.config.mjs` 中配置正确的 `base` 路径。

### 部署到 github.io 网址
在 `astro.config.mjs` 中配置文件设置 `site` 和 `base` 选项。

```astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://astronaut.github.io',
  base: 'my-repo',
})
```
**Site**

`site` 的值必须是以下之一：
- 基于你的用户名的以下网址: `https://<username>.github.io`
- 为 GitHub 组织的私有页面 自动生成的随机网址：`https://<random-string>.pages.github.io/`



**Base**

`base` 的值应该是你的仓库名称，以正斜杠开头，例如 `/my-blog`。这样做是为了让 Astro 理解你的网站根目录是 `/my-repo`，而不是默认的 `/`。

:::warning
当配置了这个值后，你所有的内部页面链接都必须以你的 base 值作为前缀：
```html
<a href="/my-repo/about">关于本站</a>
```
查看更多关于配置 [`base`](https://docs.astro.build/zh-cn/reference/configuration-reference/#base) 值的信息。
:::

### 在 GitHub Pages 上使用自定义域名
::: card title="设置一个自定义域" icon="twemoji:astonished-face"
    你可以选择通过将一个 ./public/CNAME 文件添加到你的项目中，来设置自定义域
    这会将你的站点部署在你的自定义域而不是 <YOUR_USERNAME>.github.io。
    不要忘记为你的域名提供商配置 DNS。
:::

```CNAME
sub.mydomain.com
```

要配置 Astro 以在 GitHub Pages 上使用自定义域名，请将你的域名设置为 site 的值。不要为 `base` 设置值：

```astro.config.mjs
import { defineConfig } from 'astro/config'

export default defineConfig({
    site: 'https://example.com',
})
```
### 配置 GitHub Action
:::steps
1. 在你的项目中的 `.github/workflows/` 目录创建一个新文件 `deploy.yml`，并粘贴以下 YAML 配置信息。

```deploy.yml
name: Deploy to GitHub Pages
on:
  # 每次推送到 `main` 分支时触发这个“工作流程”
  # 如果你使用了别的分支名，请按需将 `main` 替换成你的分支名
  push:
    branches: [ main ]
  # 允许你在 GitHub 上的 Actions 标签中手动触发此“工作流程”
  workflow_dispatch:
# 允许 job 克隆 repo 并创建一个 page deployment
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout your repository using git
        uses: actions/checkout@v4
      - name: Install, build, and upload your site
        uses: withastro/action@v3
        # with:
          # path: . # 存储库中 Astro 项目的根位置。（可选）
          # node-version: 20 # 用于构建站点的特定 Node.js 版本，默认为 20。（可选）
          # package-manager: pnpm@latest # 应使用哪个 Node.js 包管理器来安装依赖项和构建站点。会根据存储库中的 lockfile 自动检测。（可选）
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```
2. （可选）如果你在本地开发期间或预览构建期间，将环境变量传入给 Astro 项目，则需要定义 deploy.yml 文件中的任何公共变量，以便在部署到 Github 页面时处理它们。
```deploy.yml
jobs:
   build:
     runs-on: ubuntu-latest
     steps:
       - name: Checkout your repository using git
         uses: actions/checkout@v4
       - name: Install, build, and upload your site
         uses: withastro/action@v3
         env:
           # 使用单引号来包裹变量值
           PUBLIC_EVM_WALLET_ADDRESS: '0x4bFc229A40d41698154336aFF864f61083E76659'
```
3. 在 GitHub 上，跳转到存储库的 Settings 选项卡并找到设置的 Pages 部分。
4. 选择 GitHub Actions 作为你网站的 Source，然后按 Save。
**小tips:** 提交前记得把workflows里的另外两个文件删了，不然action会报错喔OvO
:::

你的网站现在应该已完成发布了！当你将更改推送到 Astro 项目的存储库时，GitHub Action 将自动为你部署它们。