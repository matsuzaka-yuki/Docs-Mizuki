---
title: 部署到Netlify
createTime: 2025/11/21 01:55:48
permalink: /guide/deploy/Netlify/
---

## 如何部署到 Netlify

Netlify 也是一个流行的静态网站托管平台。您可以直接从 GitHub 部署您的 Mizuki 博客。Netlify 会自动构建和部署您的项目，并提供持续部署功能。

### 网站用户操作界面部署方式
如果你的项目存储在 GitHub、GitLab、BitBucket 或 Azure DevOps 中，你可以使用 Netlify 的网站用户操作界面来部署你的 Astro 网站.
::: steps

1. 在 [Netlify dashboard](https://app.netlify.com/) 页面上，点击 Add a new site

2. 选择 Import an existing project

    当你从你的 Git 提供商中导入 Astro 仓库时，Netlify 应该会自动检测并预填充正确的配置设置。

3. 确保已输入以下设置，然后按下 Deploy 按钮：
    - **Build Command**: `astro build` or `npm run build`
    - **Publish directory**: `dist`

4. 部署后，你将被重定向到站点概览页面。在那里，你可以编辑你站点的详细信息。

:::
根据你的部署配置，未来对源代码库的任何修改都将触发预览和生产部署。

**netlify.toml 文件**

你可以选择在项目仓库的顶层创建一个新的 `netlify.toml` 文件，用来配置你的构建命令和发布目录，以及其他项目设置，包括环境变量和重定向。Netlify 将读取此文件并自动配置你的部署。

为了配置默认设置，创建一个 netlify.toml 文件，并填入以下内容：
```toml
[build]
  command = "npm run build"
  publish = "dist"
```
更多信息可以在 Netlify 的博客文章 [部署现有的 Astro Git 仓库](https://www.netlify.com/blog/how-to-deploy-astro/#deploy-an-existing-git-repository-to-netlify) 中找到。

### CLI 部署方式
你也可以在 Netlify 上创建一个新的站点，并通过安装和使用 Netlify CLI 来关联你的 Git 仓库。

:::steps
1. 全局安装 Netlify CLI 工具
    ```bash
    npm install --global netlify-cli
    ```
2. 运行 `netlify login` 并按照指示进行登录并授权 Netlify。
3. 运行 `netlify init` 并按照指示进行操作。
4. 确认你的构建命令 (`astro build`)

    CLI 将自动检测构建设置（`astro build`）和部署目录（`dist`），并将提供一个自动生成且有这些对应设置的 `netlify.toml` 文件。

5. 推送到 Git 来触发构建和部署

    CLI 将向仓库添加一个部署密钥，这意味着每次你使用 git push 时，你的网站都会在 Netlify 上自动重新构建。
:::
<LinkCard title="更多详情请参阅 Netlify 的文章" href="https://www.netlify.com/blog/how-to-deploy-astro/#link-your-astro-project-and-deploy-using-the-netlify-cli">

</LinkCard>