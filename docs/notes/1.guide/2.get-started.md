---
title: 安装/使用
createTime: 2025/08/16 23:56:17
permalink: /guide/get-started/
---

Mizuki 项目入门指南



## 环境依赖

在开始使用 Mizuki 之前，您需要确保系统满足以下要求：

- **Node.js >= 20**
- **pnpm >= 9**
- **Git**

### 安装 Node.js

访问 [Node.js 官网](https://nodejs.org/) 下载并安装最新版本的 Node.js。建议使用 LTS 版本。

安装完成后，打开终端或命令提示符，运行以下命令验证 Node.js 是否安装成功：

```bash
node -v
npm -v
```

如果显示版本号，则表示安装成功。

### 安装 pnpm

如果您尚未安装 pnpm，可以通过 npm 安装：

```bash
npm install -g pnpm
```

安装完成后，打开终端或命令提示符，运行以下命令验证 pnpm 是否安装成功：

```bash
pnpm -v
```

如果显示版本号，则表示安装成功。

### 安装 Git

访问 [Git 官网](https://git-scm.com/downloads) 下载并安装适合您操作系统的 Git 版本。

安装完成后，打开终端或命令提示符，运行以下命令验证 Git 是否安装成功：

```bash
git --version
```

如果显示版本号，则表示安装成功。

## 项目启动步骤

### 1. 克隆项目

首先，克隆 Mizuki 项目到本地：

```bash
git clone https://github.com/matsuzaka-yuki/mizuki.git
cd Mizuki
```

### 2. 安装依赖

使用 pnpm 安装项目依赖：

```bash
pnpm install
```

### 3. 配置博客

在启动项目之前，您需要根据自己的需求进行配置：

- 编辑 `src/config.ts` 文件来自定义博客设置
- 更新站点信息、主题颜色、横幅图片和社交链接
- 配置翻译设置和特殊页面功能

### 4. 启动开发服务器

运行以下命令启动开发服务器：

```bash
pnpm dev
```

启动成功后，您可以在浏览器中访问 `http://localhost:4321` 查看您的博客。


### 5. 打包网站

运行以下命令将网站打包成静态文件，生成到 `dist` 目录中：

```bash
pnpm build
```

生成的 `dist` 目录可以部署到您自己的服务器上。


