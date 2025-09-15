---
title: Hexoからの移行
createTime: 2025/08/17 17:21:41
permalink: /ja/migration/hexo/
---

**HexoからMizukiテーマへの移行ガイド**

既存のHexoブログをMizukiテーマ（Astro）に移行する手順を説明します。

## 移行前の準備

### 1. バックアップの作成

```bash
# Hexoブログのバックアップを作成
cp -r your-hexo-blog your-hexo-blog-backup
```

### 2. 必要な情報の確認

- 記事ファイル（`source/_posts/`）
- 画像ファイル（`source/images/`）
- 設定ファイル（`_config.yml`）
- カスタムページ（`source/about/`など）

## 記事の移行

### 1. Frontmatterの変換

Hexoの記事形式：
```yaml
---
title: 記事タイトル
date: 2023-01-15 10:30:00
tags: 
  - タグ1
  - タグ2
categories:
  - カテゴリ1
---
```

Mizukiテーマの形式：
```yaml
---
title: 記事タイトル
date: 2023-01-15
tags: 
  - タグ1
  - タグ2
categories:
  - カテゴリ1
description: 記事の説明
---
```

### 2. 自動変換スクリプト

```javascript
// convert-posts.js
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const hexoPostsDir = './hexo-blog/source/_posts';
const astroPostsDir = './src/content/blog';

fs.readdirSync(hexoPostsDir).forEach(file => {
  if (path.extname(file) === '.md') {
    const filePath = path.join(hexoPostsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const { data, content: body } = matter(content);
    
    // Frontmatterの変換
    const newData = {
      title: data.title,
      date: data.date ? new Date(data.date).toISOString().split('T')[0] : null,
      tags: data.tags || [],
      categories: data.categories || [],
      description: data.description || data.excerpt || ''
    };
    
    // 新しいファイルの作成
    const newContent = matter.stringify(body, newData);
    const newFilePath = path.join(astroPostsDir, file);
    fs.writeFileSync(newFilePath, newContent);
  }
});
```

### 3. 画像の移行

```bash
# 画像ファイルをpublicディレクトリにコピー
cp -r hexo-blog/source/images/* public/images/
```

## 設定の移行

### 1. サイト基本情報

Hexoの`_config.yml`：
```yaml
title: My Blog
subtitle: A blog about web development
description: This is my personal blog
author: Your Name
language: ja
timezone: Asia/Tokyo
```

Mizukiの`src/config.ts`：
```typescript
export const siteConfig: SiteConfig = {
  title: 'My Blog',
  subtitle: 'A blog about web development',
  description: 'This is my personal blog',
  author: 'Your Name',
  lang: 'ja',
  timezone: 'Asia/Tokyo'
}
```

### 2. ナビゲーションメニュー

Hexoのテーマ設定：
```yaml
menu:
  Home: /
  Archives: /archives
  About: /about
```

Mizukiの設定：
```typescript
export const navConfig = [
  { name: 'ホーム', url: '/' },
  { name: 'アーカイブ', url: '/archives' },
  { name: 'About', url: '/about' }
]
```

## URLの移行

### 1. パーマリンクの設定

Hexoのパーマリンク：
```yaml
permalink: :year/:month/:day/:title/
```

Mizukiでの対応：
```typescript
// src/utils/permalink.ts
export function generatePermalink(date: Date, slug: string) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `/${year}/${month}/${day}/${slug}/`;
}
```

### 2. リダイレクトの設定

```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/2023/01/15/old-post-title/': '/blog/new-post-slug/',
    // 他のリダイレクト...
  }
});
```

## プラグインの移行

### 1. コメントシステム

Hexo（Disqus）：
```yaml
disqus_shortname: your-shortname
```

Mizuki（Giscus）：
```typescript
export const siteConfig: SiteConfig = {
  comment: {
    provider: 'giscus',
    giscus: {
      repo: 'your-username/your-repo',
      repoId: 'your-repo-id',
      category: 'General',
      categoryId: 'your-category-id'
    }
  }
}
```

### 2. 検索機能

HexoのAlgolia検索からAstroの検索機能への移行：

```typescript
// src/utils/search.ts
export async function searchPosts(query: string) {
  const posts = await getCollection('blog');
  return posts.filter(post => 
    post.data.title.toLowerCase().includes(query.toLowerCase()) ||
    post.body.toLowerCase().includes(query.toLowerCase())
  );
}
```

## 移行後の確認

### 1. チェックリスト

- [ ] すべての記事が正しく表示される
- [ ] 画像が正しく表示される
- [ ] 内部リンクが機能する
- [ ] メタデータが正しく設定されている
- [ ] SEO設定が適用されている
- [ ] サイトマップが生成される
- [ ] RSS フィードが機能する

### 2. パフォーマンステスト

```bash
# ビルドテスト
npm run build

# プレビューテスト
npm run preview
```

## トラブルシューティング

### よくある問題

1. **画像が表示されない**
   - パスの確認：`/images/` → `public/images/`
   - ファイル名の大文字小文字

2. **日付形式のエラー**
   - ISO形式への変換が必要
   - タイムゾーンの考慮

3. **Markdownの互換性**
   - 一部のHexo固有の記法は変換が必要
   - プラグインの依存関係

### サポート

移行に関する質問は、[GitHub Issues](https://github.com/mizuki-theme/mizuki/issues)でお気軽にお尋ねください。