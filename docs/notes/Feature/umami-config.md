---
title: Umami访问量统计配置说明
createTime: 2025/10/20 12:36:33
permalink: /Feature/umami-config/
---

# Umami 统计配置教程(V3版本)

Umami 是一个开源、注重隐私的网站分析工具，可以替代 Google Analytics。本教程将指导您如何在 Mizuki 主题中配置 Umami 统计功能。  

注意：本教程适用于 Mizuki 8.2(1dcaa61) 或更高版本。

## 什么是 Umami？

Umami 是一个开源的网站分析工具，具有以下特点：
- 开源且注重用户隐私
- 轻量级，不会影响网站性能
- 提供详细的访问统计信息
- 可自建服务或使用云服务

## 配置步骤

### 1. 注册并创建 Umami 账户

首先，您需要注册一个 Umami 账户：
1. 访问 [Umami 官网](https://umami.is/) 或使用自建的 Umami 服务
2. 注册账户并登录
3. 创建一个新的网站，获取网站ID

### 2. 获取必要信息

在 Umami 仪表板中，您需要获取以下信息：
- **umami统计分享链接** (shareURL)
- **跟踪脚本地址** (Tracking Script URL)

### 3. 配置 astro.config.mjs

打开 `astro.config.mjs` 文件，找到 `umami` 集成配置项：

```typescript title="astro.config.mjs"
import { umami } from "oddmisc";

export default defineConfig({
  integrations: [
    umami({
      shareUrl: "YOUR_SHARE_URL", // Umami 分享链接（见下方说明）如设置为 false 则禁用组件的umami访问量信息显示,不影响umami统计
    }),
    // ... 其他集成
  ],
});
```

:::warning Umami Cloud 用户注意
如果您使用的是 **Umami Cloud（官方托管服务）**，请注意：

从仪表盘复制的分享链接格式通常为：
```
https://cloud.umami.is/share/xxxxx
```

**不能直接使用此链接！** 您需要：
1. 在浏览器中手动访问该分享链接
2. 等待页面加载完成，浏览器会自动重定向到一个新的地址
3. 复制浏览器地址栏中最终显示的链接（格式类似 `https://cloud.umami.is/analytics/us/share/xxxxxxxxx`,具体是us还是eu取决于你注册时选择的数据中心位置）
4. 使用这个最终重定向后的链接作为 `shareUrl` 的值

:::

### 4. 手动插入统计脚本到 Layout.astro

打开 `src/layouts/Layout.astro` 文件，在 `<head>` 标签内添加 Umami 跟踪脚本：

```astro title="src/layouts/Layout.astro"
<head>
  <!-- Umami 统计脚本 -->
  <script defer src="https://analytics.umami.is/script.js" data-website-id="your-website-id"></script>
  
  <!-- 其他 head 内容 -->
</head>
```

如果您使用自建 Umami 服务，请替换为您的服务地址：

```astro
<script defer src="https://your-umami-instance.com/script.js" data-website-id="your-website-id"></script>
```

### 5. 完整配置示例

#### astro.config.mjs

```typescript title="astro.config.mjs"
import { umami } from "oddmisc";

export default defineConfig({
  integrations: [
    umami({
      shareUrl: "https://cloud.umami.is/analytics/us/share/pNrbzntfHm1jet1f",
    }),
    // ... 其他集成
  ],
});
```

#### Layout.astro

```astro title="src/layouts/Layout.astro"
<head>
  <!-- Umami 统计脚本 -->
  <script defer src="https://cloud.umami.is/script.js" data-website-id="606672ff-6f67-4dc0-8006-bfc094539ecb"></script>
  
  <!-- 其他 head 内容 -->
</head>
```

### 6. 保存并重新构建

1. 保存所有修改的文件
2. 重新构建您的网站：
   ```bash
   pnpm build
   ```
3. 部署您的网站

## 验证配置

配置完成后，您可以通过以下方式验证是否配置成功：

1. 访问您的网站
2. 打开浏览器开发者工具
3. 查看网络请求，确认是否有发送到 Umami 服务器的请求
4. 在 Umami 仪表板中查看实时访问数据

## 故障排除

如果配置后没有数据，请检查：

1. **确认 shareUrl 配置正确**（Umami Cloud 用户请确保使用重定向后的链接）
2. **确认网站ID是否正确**
3. **检查跟踪脚本地址是否正确**
4. **查看浏览器控制台是否有错误信息**
5. **确认 Umami 服务是否正常运行**

## 隐私保护

Umami 重视用户隐私，不会收集个人身份信息。您可以在您的隐私政策中添加 Umami 的使用说明，以确保透明度。
