---
title: 部署到Vercel
createTime: 2025/11/21 01:54:40
permalink: /guide/deploy/Vercel/
---

## 如何部署到 Vercel
你可以通过 Vercel 的网站 UI 或使用 Vercel 提供的官方 CLI（命令行界面）部署 Astro 站点到 Vercel。部署静态站点和按需渲染站点的过程相同。

### 通过网站UI部署

::: steps

1. 将你的代码推送到你的在线 Git 存储库（GitHub、GitLab、BitBucket 等）.

2. [导入你的项目](https://vercel.com/new) 至 Vercel.

3. Vercel 将自动检测 Astro 项目并自动为其配置正确的设置.

4. 你的应用程序已部署完成了！（例如：astro.vercel.app）

:::

在你的项目完成导入和部署后，所有后续内容推送到（生产分支外的）分支都将自动生成 预览部署（Preview Deployments），以及对生产分支（通常是名为“main”的分支）所做的任何更改都将自动被部署为 生产部署（Production Deployment）。

### 通过 CLI 部署(推荐)

::: steps

1. 安装[Vercel CLI](https://vercel.com/docs/cli)并运行`vercel`进行部署
    ```bash
    pnpm add -g vercel
    vercel
    ```
2. Vercel 将自动检测 Astro 项目并自动为其配置正确的设置.
3. 当被问及`Want to override the settings? [y/N]`（想要覆盖配置吗？），选择 N（No）。
4. 你的应用程序已部署完成了！（例如：[astro.vercel.app](https://astro.vercel.app/)）
:::
### 使用 vercel.json 的项目配置
你可以使用 `vercel.json` 来覆盖 Vercel 的默认行为并配置其他设置。例如，你可以在部署时为 HTTP 响应附加标头。

<LinkCard title="详细请参考 Vercel 文档的项目配置" href="https://vercel.com/docs/project-configuration">

</LinkCard>