---
title: 本地部署
createTime: 2025/11/21 02:12:49
permalink: /guide/deploy/local/
---


本地构建部署是一种灵活的方式，你可以在本地构建 Mizuki 博客，然后将生成的 dist 文件夹部署到你喜欢的任何平台。这种方式适合对构建过程有完全控制的用户。

## 为什么选择本地构建？

1. **灵活性高**：可以将构建结果部署到任何支持静态文件的托管平台
2. **控制力强**：可以完全控制构建过程和结果
3. **节省构建时间**：避免每次推送都重新构建
4. **离线工作**：即使没有网络连接也能构建博客

## 准备工作

1. 安装 Node.js（推荐 18.x 或更高版本）
2. 安装 pnpm 包管理器
3. 克隆或拥有 Mizuki 博客源码

## 第一步：安装依赖

在你的 Mizuki 项目根目录下运行：

```bash
pnpm install
```

## 第二步：构建项目

运行构建命令生成静态文件：

```bash
pnpm build
```

构建完成后，你会在项目目录下看到 `dist` 文件夹，这个文件夹包含了所有需要部署的静态文件。Astro 会生成高度优化的静态文件，包括 HTML、CSS 和 JavaScript。

## 第三步：预览构建结果

在部署前，你可以本地预览构建结果：

```bash
pnpm preview
```

或者使用任何静态文件服务器：

```bash
# 使用 Python
cd dist
python -m http.server 8080

# 使用 Node.js serve
npx serve dist -p 8080
```

然后在浏览器中访问 `http://localhost:8080` 查看效果。

## 第四步：部署到不同平台

现在你可以将 `dist` 文件夹部署到各种平台。以下是几种常见平台的部署方法：

### 方案一：传统虚拟主机

大多数虚拟主机都支持 FTP/SFTP 上传文件：

1. 使用 FTP 客户端（如 FileZilla）连接你的虚拟主机
2. 将 `dist` 文件夹中的所有文件上传到网站根目录
3. 确保服务器有正确的 MIME 类型配置：
   - `.html` → `text/html`
   - `.css` → `text/css`
   - `.js` → `application/javascript`
   - `.json` → `application/json`

### 方案二：对象存储 + CDN

使用阿里云 OSS、腾讯云 COS 等对象存储服务：

#### 阿里云 OSS

1. 登录阿里云控制台，创建 OSS 存储桶
2. 开启静态网站托管功能
3. 将 `dist` 文件夹中的所有文件上传到 OSS
4. 配置 CDN 加速（可选）

#### 腾讯云 COS

1. 创建 COS 存储桶
2. 开启静态网站功能
3. 上传 `dist` 文件夹中的所有文件
4. 配置自定义域名和 CDN

### 方案三：CDN 边缘平台

使用又拍云、七牛云等 CDN 服务：

#### 又拍云

1. 注册又拍云账号，创建云存储服务
2. 开启 CDN 加速
3. 使用又拍云官方工具上传：
   ```bash
   npm install -g upx
   upx login your-operator your-password
   upx sync dist /your-bucket-name/
   ```

### 方案四：个人 NAS

如果你有 NAS 设备（如群晖、威联通）：

1. 登录 NAS 管理界面
2. 创建 Web Station 或类似服务
3. 将 `dist` 文件夹复制到 Web 目录
4. 配置端口和访问权限

### 方案五：VPS 简单部署

在 VPS 上简单部署（不需要复杂配置）：

1. 安装 Nginx 或 Apache
2. 创建网站目录
3. 上传 `dist` 文件夹内容
4. 配置简单的 Web 服务器：

```nginx title="nginx.conf"
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 高级技巧

### 自动化构建脚本

创建一个自动化脚本来简化部署过程：

```bash
#!/bin/bash
# build-and-deploy.sh

echo "开始构建 Mizuki 博客..."
pnpm install
pnpm build

echo "构建完成！"
echo "dist 文件夹位置：$(pwd)/dist"

# 根据你的部署方式取消注释相应部分

# FTP 部署（需要安装 lftp）
# lftp -u username,password -e "mirror -R dist /remote/path" ftp.example.com

# SCP 部署
# scp -r dist/* user@server:/path/to/website/

# AWS S3 部署（需要安装 AWS CLI）
# aws s3 sync dist s3://your-bucket-name --delete

echo "部署脚本执行完成！"
```

使用方法：
```bash
chmod +x build-and-deploy.sh
./build-and-deploy.sh
```

### 优化构建结果

在 `astro.config.mjs` 中添加优化配置：

```javascript title="astro.config.mjs"
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ...其他配置
  
  // 启用压缩优化
  build: {
    // 启用压缩
    minify: 'terser',
    // 优化图片
    vite: {
      build: {
        rollupOptions: {
          output: {
            manualChunks: {
              vendor: ['astro', '@astrojs/vue'],
              ui: ['vue']
            }
          }
        }
      }
    }
  }
});
```

### 多环境部署

为不同环境创建不同的构建命令：

```json
{
  "scripts": {
    "build": "astro build",
    "build:prod": "NODE_ENV=production astro build",
    "build:dev": "NODE_ENV=development astro build",
    "preview": "astro preview",
    "dev": "astro dev"
  }
}
```

## 常见问题

### Q: 构建后图片不显示
A: 检查图片路径是否正确，确保图片文件位于正确的目录中，并且在 Markdown 中使用相对路径引用。

### Q: 部署后页面 404
A: 配置 Web 服务器的重写规则，将所有路由指向 index.html。Nginx 的配置示例在上方已提供。

### Q: 如何处理多语言部署
A: 构建后的文件结构会保持多语言目录，确保 Web 服务器正确处理路径。

### Q: 如何添加自定义域名
A: 这取决于你使用的平台。大多数平台都提供域名绑定功能，在平台控制台中查找相关设置。

## 最佳实践

1. **定期备份**：保留最新的构建结果和源代码
2. **使用版本控制**：即使使用本地构建，也应该将源码托管在 Git 仓库中
3. **性能监控**：使用 Google PageSpeed Insights 等工具监控网站性能
4. **SEO 优化**：确保所有页面都有正确的 meta 标签和结构化数据

## 总结

本地构建部署提供了最大的灵活性和控制力，适合：

- 需要将博客部署到特殊平台的用户
- 对构建过程有定制需求的开发者
- 希望减少依赖，简化部署流程的用户

通过这种方式，你可以将 Mizuki 博客部署到任何支持静态文件的平台，同时保持对整个过程的完全控制。