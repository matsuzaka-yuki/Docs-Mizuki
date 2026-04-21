---
title: 迁移说明
createTime: 2025/11/20 23:14:37
permalink: /Other/migration/
copyright:
  author:
    name: LyraVoid Team
    url: https://github.com/LyraVoid
---

# Mizuki 内容迁移指南

本指南将帮助你将现有的 Mizuki 博客从单仓库模式迁移到代码内容分离模式。

> 💡 **提示**: 如果是新项目,建议先阅读内容分离完整指南

## 📋 迁移前准备

### 检查清单

- [ ] **备份整个项目** (重要!)
- [ ] 确保所有更改已提交到 Git
- [ ] 了解你要使用的模式 (推荐 Submodule)
- [ ] 在 GitHub/GitLab 创建新的内容仓库

## 🚀 迁移步骤

### 步骤 1: 创建内容仓库

```bash
# 创建并进入新目录
mkdir Mizuki-Content
cd Mizuki-Content

# 初始化 Git 仓库
git init

# 创建目录结构
mkdir -p posts spec data images/albums images/diary images/posts

# 创建 README
cat > README.md << 'EOF'
# Mizuki 博客内容

这是 Mizuki 博客的内容仓库,包含所有文章、数据和图片。

## 目录结构

- `posts/` - 博客文章
- `spec/` - 特殊页面 (关于、友链等)
- `data/` - 数据文件 (番剧、项目、技能、时间线)
- `images/` - 图片资源

## 使用方法

此仓库作为 Mizuki 代码仓库的内容源,通过 Git Submodule 或独立模式关联。

详细说明请查看: https://github.com/matsuzaka-yuki/Mizuki
EOF
```

### 步骤 2: 从 Mizuki 项目复制内容

```bash
# 设置路径变量
MIZUKI_PATH="/path/to/your/Mizuki"
CONTENT_PATH="/path/to/Mizuki-Content"

# 复制文章
cp -r "$MIZUKI_PATH/src/content/posts/"* "$CONTENT_PATH/posts/"

# 复制特殊页面
cp -r "$MIZUKI_PATH/src/content/spec/"* "$CONTENT_PATH/spec/"

# 复制数据文件
cp "$MIZUKI_PATH/src/data/anime.ts" "$CONTENT_PATH/data/" 2>/dev/null || echo "anime.ts not found"
cp "$MIZUKI_PATH/src/data/projects.ts" "$CONTENT_PATH/data/" 2>/dev/null || echo "projects.ts not found"
cp "$MIZUKI_PATH/src/data/skills.ts" "$CONTENT_PATH/data/" 2>/dev/null || echo "skills.ts not found"
cp "$MIZUKI_PATH/src/data/timeline.ts" "$CONTENT_PATH/data/" 2>/dev/null || echo "timeline.ts not found"

# 复制图片
cp -r "$MIZUKI_PATH/public/images/albums/"* "$CONTENT_PATH/images/albums/" 2>/dev/null || echo "albums not found"
cp -r "$MIZUKI_PATH/public/images/diary/"* "$CONTENT_PATH/images/diary/" 2>/dev/null || echo "diary not found"

echo "✅ 内容复制完成!"
```

### 步骤 3: 提交内容仓库

```bash
cd "$CONTENT_PATH"

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Migrate content from Mizuki monorepo"

# 添加远程仓库 (替换为你的仓库地址)
git remote add origin https://github.com/your-username/Mizuki-Content.git

# 推送
git branch -M master
git push -u origin master

echo "✅ 内容仓库已推送!"
```

### 步骤 4: 配置 Mizuki 代码仓库

```bash
cd "$MIZUKI_PATH"

# 创建 .env 文件
cp .env.example .env

# 编辑 .env 文件,启用内容分离
cat > .env << 'EOF'
# 启用内容分离
ENABLE_CONTENT_SYNC=true

# 内容仓库配置
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git
USE_SUBMODULE=true
EOF

# 运行同步脚本
pnpm run sync-content

# 提交更改
git add .env.example
git commit -m "Enable content separation"
git push
```

> 📖 更多配置选项请参考内容分离完整指南

### 步骤 5: 清理原仓库中的内容 (可选)

⚠️ **警告**: 只有在确认内容已成功迁移后才执行此步骤!

```bash
cd "$MIZUKI_PATH"

# 备份原内容 (以防万一)
mkdir -p ../mizuki-content-backup
cp -r src/content/posts ../mizuki-content-backup/
cp -r src/content/spec ../mizuki-content-backup/
cp -r src/data ../mizuki-content-backup/
cp -r public/images ../mizuki-content-backup/

# 删除已迁移的内容 (保留目录结构)
rm -rf src/content/posts/*
rm -rf src/content/spec/*
rm -f src/data/anime.ts src/data/projects.ts src/data/skills.ts src/data/timeline.ts
rm -rf public/images/albums/* public/images/diary/*

# 创建 .gitkeep 文件保留目录
touch src/content/posts/.gitkeep
touch src/content/spec/.gitkeep
touch public/images/albums/.gitkeep
touch public/images/diary/.gitkeep

# 提交更改
git add .
git commit -m "Remove migrated content (now in separate repository)"
git push
```

## 🧪 测试迁移

### 本地测试

```bash
cd "$MIZUKI_PATH"

# 同步内容
pnpm run sync-content

# 启动开发服务器
pnpm dev

# 访问 http://localhost:4321 检查:
# - 文章是否正常显示
# - 图片是否正确加载
# - 特殊页面是否工作
# - 数据页面是否正常 (番剧、项目等)
```

### 构建测试

```bash
# 构建项目
pnpm build

# 预览构建结果
pnpm preview

# 检查所有功能是否正常
```

## 🔄 日常工作流

### 更新内容

```bash
# 1. 在内容仓库中修改
cd "$CONTENT_PATH"
# 编辑文件...
git add .
git commit -m "Update content"
git push

# 2. 在代码仓库中同步
cd "$MIZUKI_PATH"
pnpm run sync-content
```

### 使用 Submodule 时

```bash
cd "$MIZUKI_PATH"

# 更新 submodule 到最新版本
git submodule update --remote --merge

# 或者使用同步脚本 (推荐)
pnpm run sync-content

# 提交 submodule 更新
git add content
git commit -m "Update content submodule"
git push
```

## 🚀 部署配置

迁移完成后,需要在部署平台配置环境变量:

```bash
ENABLE_CONTENT_SYNC=true
CONTENT_REPO_URL=https://github.com/your-username/Mizuki-Content.git
USE_SUBMODULE=true
```

详细的部署配置(包括私有仓库、GitHub Actions、Vercel 等)请参考内容分离完整指南

## ⚠️ 常见问题

### Q: 同步脚本失败怎么办?

A: 检查:
1. 网络连接是否正常
2. Git 凭据是否配置正确
3. `ENABLE_CONTENT_SYNC=true` 是否已设置
4. `CONTENT_REPO_URL` 是否正确
5. 是否有足够的磁盘空间

运行 `pnpm run check-env` 检查配置。

### Q: 符号链接在 Windows 上不工作?

A: 需要以管理员身份运行,或者脚本会自动切换到复制模式。

### Q: 如何回滚到单仓库模式?

A: 在 `.env` 中设置 `ENABLE_CONTENT_SYNC=false`,然后从备份或内容仓库复制内容回本地。

### Q: 遇到私有仓库认证问题?

A: 参考内容分离完整指南

## 📚 参考文档

- [Git Submodule 文档](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)

---

💡 **提示**: 迁移前建议先在测试环境中验证整个流程!
