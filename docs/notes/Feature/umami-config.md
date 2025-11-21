---
title: Umami访问量统计配置说明
createTime: 2025/10/20 12:36:33
permalink: /Feature/umami-config/
---

# Umami 统计配置教程(V3版本)

Umami 是一个开源、注重隐私的网站分析工具，可以替代 Google Analytics。本教程将指导您如何在 Mizuki 主题中配置 Umami 统计功能。  
注意：本教程适用于 Mizuki 5.1.0 或更高版本。

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
- **API 密钥** (API Key)
- **网站ID** (Website ID)
- **跟踪脚本地址** (Tracking Script URL)

### 3. 配置 Mizuki

打开 `src/config.ts` 文件，找到 `umamiConfig` 配置项：

```typescript title="src/config.ts"
export const umamiConfig = {
  enabled: false, // 是否启用 Umami 统计
  apiKey: "api_XXXXXXXXXX", // 你的 API 密钥
  baseUrl: "https://api.umami.is", // Umami Cloud API 地址
  scripts: `
<script defer src="XXXX.XXX" data-website-id="ABCD1234"></script>
  `.trim(), // 上面填你要插入的 Script，不用再去 Layout 中插入
} as const;
```

### 4. 修改配置参数

根据您的 Umami 账户信息，修改以下参数：

#### enabled
设置为 `true` 以启用 Umami 统计功能：
```typescript
enabled: true,
```

#### apiKey
替换为您的实际 API 密钥：
```typescript
apiKey: "your_actual_api_key_here",
```

#### baseUrl
如果您使用 Umami Cloud，保持默认值；如果使用自建服务，请替换为您的服务地址：
```typescript
baseUrl: "https://api.umami.is", // Umami Cloud
// 或者
baseUrl: "https://your-umami-instance.com", // 自建服务
```

#### scripts
替换为您的实际跟踪脚本，包含您的网站ID：
```typescript
scripts: `
<script defer src="https://analytics.umami.is/script.js" data-website-id="your_website_id_here"></script>
`.trim(),
```

### 5. 完整配置示例

以下是一个完整的配置示例：

```typescript tite="src/config.ts"
export const umamiConfig = {
  enabled: true,
  apiKey: "api_a1b2c3d4e5f6g7h8i9j0",
  baseUrl: "https://api.umami.is",
  scripts: `
<script defer src="https://analytics.umami.is/script.js" data-website-id="abcd1234-ef56-7890-abcd-ef1234567890"></script>
  `.trim(),
} as const;
```

### 6. 保存并重新构建

1. 保存 `src/config.ts` 文件
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

1. **确认 enabled 设置为 true**
2. **检查 API 密钥是否正确**
3. **确认网站ID是否正确**
4. **检查跟踪脚本地址是否正确**
5. **查看浏览器控制台是否有错误信息**
6. **确认 Umami 服务是否正常运行**

## 隐私保护

Umami 重视用户隐私，不会收集个人身份信息。您可以在您的隐私政策中添加 Umami 的使用说明，以确保透明度。

