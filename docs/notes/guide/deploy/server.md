---
title: 服务器部署
createTime: 2025/11/21 02:02:00
permalink: /guide/deploy/server/
---


将 Mizuki 博客部署到自己的服务器可以获得更高的自由度和控制权。本文介绍三种常见的部署方案：宝塔面板、1Panel 和纯命令行部署。

## 准备工作

无论使用哪种方案，你都需要：

1. 一台云服务器（推荐配置：1核2G内存，10G硬盘，Ubuntu/CentOS系统）
2. 域名（可选，但建议使用）
3. SSH 客户端（如 PuTTY 或 Terminal）

## 方案一：宝塔面板部署

宝塔面板是国内最受欢迎的服务器管理面板，操作简单直观。

### 第一步：安装宝塔面板

连接到你的服务器，执行以下命令安装宝塔面板：

```bash
if [ -f /usr/bin/curl ];then curl -sSO https://download.bt.cn/install/install_panel.sh;else wget -O install_panel.sh https://download.bt.cn/install/install_panel.sh;fi;bash install_panel.sh ed8484bec
```


安装完成后，保存显示的宝塔面板登录地址、用户名和密码。

### 第二步：配置环境

1. 登录宝塔面板
2. 在"软件商店"中安装以下软件：
   - Nginx（推荐）或 Apache
   - Node.js 版本管理器
   - PM2 进程管理器

### 第三步：部署网站

1. 在宝塔面板中创建新站点
2. 输入你的域名（如果没有域名，可以临时使用 IP 地址）
3. 选择 PHP 项目（只是为了创建目录结构）
4. 站点创建后，进入文件管理，删除网站根目录下的所有文件

### 第四步：上传项目代码

有两种方式上传代码：

**方式一：直接上传压缩包**
1. 在本地将 Mizuki 项目打包为 zip 文件
2. 在宝塔文件管理中上传压缩包
3. 解压到网站根目录
4. 删除压缩包文件

**方式二：使用 Git（推荐）**
1. 在宝塔面板的"终端"中进入网站根目录
2. 克隆你的项目：
   ```bash
   git clone https://github.com/matsuzaka-yuki/Mizuki.git
   ```

### 第五步：构建项目

1. 在宝塔终端中进入网站根目录
2. 安装依赖：
   ```bash
   pnpm install
   ```
3. 构建项目：
   ```bash
   pnpm build
   ```

### 第六步：选择网站目录

1. 在宝塔面板中，进入网站设置

2. 将网站根目录设置为 `/dist`

## 方案二：1Panel 部署

1Panel 是一款现代化的服务器管理面板，界面简洁，功能强大。

### 第一步：安装 1Panel

执行以下命令安装 1Panel：

```bash
curl -sSL https://resource.fit2cloud.com/1panel/package/quick_start.sh -o quick_start.sh && sh quick_start.sh
```

安装完成后，保存显示的登录地址和密码。

### 第二步：安装运行环境

1. 登录 1Panel 控制台
2. 在"应用商店"中安装：
   - OpenResty（基于 Nginx）
   - Node.js 运行环境
   - PM2

### 第三步：创建网站

1. 点击"网站" > "创建网站"
2. 选择"运行环境"
3. 填写域名和网站路径
4. 选择 Node.js 环境

### 第四步：部署代码

1. 进入 1Panel 文件管理
2. 上传或克隆你的项目代码
3. 在终端中安装依赖并构建：
   ```bash
   pnpm install
   pnpm build
   ```

### 第五步：配置网站

1. 在网站设置中，配置网站根目录为 `/dist`
2. 配置重定向规则，确保所有路由都指向 index.html
3. 启用 HTTPS（推荐）

## 方案三：纯命令行部署

纯命令行部署适合熟悉 Linux 操作的用户，可以获得最大的灵活性和性能。

### 第一步：连接服务器

```bash
ssh root@your-server-ip
```

### 第二步：安装必要软件

**Ubuntu/Debian：**
```bash
apt update
apt install -y nginx git
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs
npm install -g pnpm pm2
```

**CentOS：**
```bash
yum update
yum install -y nginx git
curl -fsSL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs
npm install -g pnpm pm2
```

### 第三步：创建网站目录

```bash
mkdir -p /var/www/mizuki
cd /var/www/mizuki
```

### 第四步：克隆项目

```bash
git clone https://github.com/matsuzaka-yuki/Mizuki.git
```

### 第五步：构建项目

```bash
pnpm install
pnpm build
```

### 第六步：配置 Nginx

创建 Nginx 配置文件：

```bash
nano /etc/nginx/sites-available/mizuki
```

输入以下内容：

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    root /var/www/mizuki/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # 缓存静态资源
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

启用站点：

```bash
ln -s /etc/nginx/sites-available/mizuki /etc/nginx/sites-enabled/
nginx -t  # 测试配置
systemctl restart nginx
```

### 第七步：设置自动部署脚本

创建部署脚本：

```bash
nano /var/www/deploy.sh
```

输入以下内容：

```bash
#!/bin/bash
cd /var/www/mizuki
git pull
pnpm install
pnpm build
systemctl reload nginx
echo "Deployment completed at $(date)"
```

设置执行权限：

```bash
chmod +x /var/www/deploy.sh
```

设置 Git 自动触发部署：

```bash
cd /var/www/mizuki
nano .git/hooks/post-receive
```

输入以下内容：

```bash
#!/bin/bash
/var/www/deploy.sh
```

设置执行权限：

```bash
chmod +x .git/hooks/post-receive
```

## 高级配置

### 启用 HTTPS

**使用 Let's Encrypt（推荐）：**

```bash
# Ubuntu/Debian
apt install certbot python3-certbot-nginx

# CentOS
yum install certbot python3-certbot-nginx

# 获取证书
certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 设置自动更新

创建定时任务：

```bash
crontab -e
```

添加以下内容（每天凌晨2点自动拉取更新）：

```bash
0 2 * * * /var/www/deploy.sh > /var/log/deploy.log 2>&1
```

### 性能优化

1. **开启 Gzip 压缩**：在 Nginx 配置中添加
2. **配置缓存策略**：设置适当的缓存头
3. **使用 CDN**：如 CloudFlare 或又拍云

## 常见问题

### Q: 构建失败怎么办？
A: 检查以下几点：
1. Node.js 版本是否合适（推荐 18.x+）
2. 内存是否足够（至少 1GB 可用内存）
3. 磁盘空间是否充足（至少 2GB）

### Q: 网站访问 404
A: 检查 Nginx 配置，确保 root 指向正确的目录，并且 try_files 配置正确

### Q: 如何更新网站内容？
A: 三种方案都支持 Git 自动更新，或手动执行部署脚本

### Q: 如何备份数据？
A: 定期备份网站目录和数据库（如果有评论系统）

## 总结

三种部署方案的对比：

| 方案 | 优点 | 缺点 | 适合人群 |
|------|------|------|----------|
| 宝塔面板 | 操作简单，可视化界面 | 资源占用较多 | 新手，不熟悉命令行 |
| 1Panel | 界面现代化，功能强大 | 相对较新，社区较小 | 追求现代化管理体验的用户 |
| 纯命令行 | 资源占用少，灵活性高 | 操作复杂，需要技术基础 | 有Linux基础的开发者 |

根据你的技术水平和需求选择合适的方案，新手推荐使用宝塔面板，有经验的用户可以尝试 1Panel 或纯命令行部署。