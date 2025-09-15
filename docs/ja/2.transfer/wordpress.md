---
title: WordPressからの移行
createTime: 2025/08/17 17:21:41
permalink: /ja/transfer/wordpress/
---

**WordPressからMizukiテーマへの移行ガイド**

WordPressブログをMizukiテーマ（Astro）に移行する詳細な手順を説明します。

## 移行前の準備

### 1. WordPressデータのエクスポート

WordPressの管理画面から：
1. **ツール** → **エクスポート** に移動
2. **すべてのコンテンツ** を選択
3. **エクスポートファイルをダウンロード** をクリック

### 2. 必要なツールのインストール

```bash
# WordPress XMLパーサーのインストール
npm install -g wordpress-export-to-markdown
```

## コンテンツの変換

### 1. 記事の変換

```bash
# WordPressエクスポートファイルをMarkdownに変換
npx wordpress-export-to-markdown --input=wordpress-export.xml --output=./converted-posts
```

### 2. Frontmatterの調整

変換後のファイルを手動で調整：

WordPress形式：
```xml
<title>記事タイトル</title>
<pubDate>Mon, 15 Jan 2023 10:30:00 +0000</pubDate>
<category>カテゴリ1</category>
<category>タグ1</category>
```

Mizuki形式：
```yaml
---
title: 記事タイトル
date: 2023-01-15
categories:
  - カテゴリ1
tags:
  - タグ1
description: 記事の説明
---
```

### 3. 画像の処理

```bash
# WordPressの画像をダウンロード
wget -r -np -k -E -p https://your-wordpress-site.com/wp-content/uploads/

# publicディレクトリに移動
mv your-wordpress-site.com/wp-content/uploads/* public/images/
```

## ショートコードの変換

### 1. 一般的なショートコード

WordPress：
```
[gallery ids="1,2,3"]
[caption]画像の説明[/caption]
[youtube id="VIDEO_ID"]
```

Mizuki（Astro）：
```astro
<!-- ギャラリー -->
<div class="gallery">
  <img src="/images/1.jpg" alt="画像1" />
  <img src="/images/2.jpg" alt="画像2" />
  <img src="/images/3.jpg" alt="画像3" />
</div>

<!-- キャプション -->
<figure>
  <img src="/images/example.jpg" alt="例" />
  <figcaption>画像の説明</figcaption>
</figure>

<!-- YouTube -->
<iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/VIDEO_ID"
  frameborder="0" 
  allowfullscreen>
</iframe>
```

### 2. 自動変換スクリプト

```javascript
// convert-shortcodes.js
const fs = require('fs');
const path = require('path');

function convertShortcodes(content) {
  // YouTubeショートコード
  content = content.replace(
    /\[youtube id="([^"]+)"\]/g,
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/$1" frameborder="0" allowfullscreen></iframe>'
  );
  
  // キャプションショートコード
  content = content.replace(
    /\[caption[^\]]*\](.*?)\[\/caption\]/gs,
    '<figure><figcaption>$1</figcaption></figure>'
  );
  
  return content;
}

// 変換処理
const postsDir = './src/content/blog';
fs.readdirSync(postsDir).forEach(file => {
  if (path.extname(file) === '.md') {
    const filePath = path.join(postsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = convertShortcodes(content);
    fs.writeFileSync(filePath, content);
  }
});
```

## テーマ設定の移行

### 1. サイト基本情報

WordPress：
```php
// wp-config.php
define('WP_DEBUG', false);
define('WPLANG', 'ja');

// functions.php
add_theme_support('post-thumbnails');
```

Mizuki：
```typescript
// src/config.ts
export const siteConfig: SiteConfig = {
  title: 'サイトタイトル',
  description: 'サイトの説明',
  lang: 'ja',
  timezone: 'Asia/Tokyo',
  author: 'あなたの名前'
}
```

### 2. メニューの移行

WordPress：
```php
// functions.php
register_nav_menus(array(
  'primary' => 'プライマリメニュー',
  'footer' => 'フッターメニュー'
));
```

Mizuki：
```typescript
// src/config.ts
export const navConfig = [
  { name: 'ホーム', url: '/' },
  { name: 'ブログ', url: '/blog' },
  { name: 'About', url: '/about' },
  { name: '連絡先', url: '/contact' }
]
```

## プラグイン機能の移行

### 1. SEOプラグイン（Yoast SEO）

WordPress：
```php
// Yoast SEO設定
$wpseo_titles = array(
  'title-home-wpseo' => 'サイトタイトル',
  'metadesc-home-wpseo' => 'サイトの説明'
);
```

Mizuki：
```astro
---
// src/layouts/BaseLayout.astro
const { title, description, image } = Astro.props;
---

<head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={image} />
</head>
```

### 2. コンタクトフォーム

WordPress（Contact Form 7）：
```
[contact-form-7 id="123" title="お問い合わせ"]
```

Mizuki（Astro）：
```astro
<!-- src/components/ContactForm.astro -->
<form action="/api/contact" method="POST">
  <input type="text" name="name" placeholder="お名前" required />
  <input type="email" name="email" placeholder="メールアドレス" required />
  <textarea name="message" placeholder="メッセージ" required></textarea>
  <button type="submit">送信</button>
</form>
```

## URLリダイレクトの設定

### 1. パーマリンク構造の維持

WordPress：
```
https://example.com/2023/01/15/post-title/
```

Mizuki：
```javascript
// astro.config.mjs
export default defineConfig({
  redirects: {
    '/2023/01/15/old-post-title/': '/blog/new-post-slug/',
    '/category/tech/': '/blog/tags/tech/',
    '/page/about/': '/about/'
  }
});
```

### 2. .htaccessファイル

```apache
# .htaccess
RewriteEngine On

# 旧WordPressのURLを新しいURLにリダイレクト
RewriteRule ^([0-9]{4})/([0-9]{2})/([0-9]{2})/(.+)/?$ /blog/$4/ [R=301,L]
RewriteRule ^category/(.+)/?$ /blog/tags/$1/ [R=301,L]
RewriteRule ^page/(.+)/?$ /$1/ [R=301,L]
```

## データベースからの直接移行

### 1. MySQLからの記事取得

```sql
-- 記事データの取得
SELECT 
  post_title,
  post_content,
  post_date,
  post_name
FROM wp_posts 
WHERE post_status = 'publish' 
AND post_type = 'post';

-- カテゴリとタグの取得
SELECT 
  p.post_title,
  t.name as term_name,
  tt.taxonomy
FROM wp_posts p
JOIN wp_term_relationships tr ON p.ID = tr.object_id
JOIN wp_term_taxonomy tt ON tr.term_taxonomy_id = tt.term_taxonomy_id
JOIN wp_terms t ON tt.term_id = t.term_id
WHERE p.post_status = 'publish' 
AND p.post_type = 'post';
```

### 2. Node.jsスクリプトでの変換

```javascript
// migrate-from-db.js
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'wordpress_db'
});

connection.query(`
  SELECT 
    post_title,
    post_content,
    post_date,
    post_name
  FROM wp_posts 
  WHERE post_status = 'publish' 
  AND post_type = 'post'
`, (error, results) => {
  if (error) throw error;
  
  results.forEach(post => {
    const frontmatter = `---
title: ${post.post_title}
date: ${post.post_date.toISOString().split('T')[0]}
slug: ${post.post_name}
---

`;
    
    const content = frontmatter + post.post_content;
    const filename = `${post.post_name}.md`;
    
    fs.writeFileSync(
      path.join('./src/content/blog', filename),
      content
    );
  });
});
```

## 移行後の最適化

### 1. パフォーマンスの改善

```typescript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto'
  },
  image: {
    service: squooshImageService()
  },
  compressHTML: true
});
```

### 2. 検索機能の実装

```typescript
// src/utils/search.ts
import { getCollection } from 'astro:content';

export async function searchPosts(query: string) {
  const posts = await getCollection('blog');
  const searchTerm = query.toLowerCase();
  
  return posts.filter(post => 
    post.data.title.toLowerCase().includes(searchTerm) ||
    post.body.toLowerCase().includes(searchTerm) ||
    post.data.tags?.some(tag => 
      tag.toLowerCase().includes(searchTerm)
    )
  );
}
```

## トラブルシューティング

### よくある問題

1. **文字化け**
   - UTF-8エンコーディングの確認
   - データベースの文字セット設定

2. **画像の表示問題**
   - 相対パスから絶対パスへの変更
   - 画像ファイルの存在確認

3. **リンク切れ**
   - 内部リンクの更新
   - リダイレクト設定の確認

### サポートリソース

- [WordPress Export to Markdown](https://github.com/lonekorean/wordpress-export-to-markdown)
- [Astro Migration Guide](https://docs.astro.build/en/guides/migrate-to-astro/)
- [GitHub Issues](https://github.com/mizuki-theme/mizuki/issues)

移行に関するご質問やサポートが必要な場合は、お気軽にお問い合わせください。