---
title: Aboutページ
createTime: 2025/08/17 17:21:41
permalink: /ja/special/about/
---

**Aboutページの設定**

Aboutページは、あなた自身やブログについて訪問者に紹介するための重要なページです。

## Aboutページの作成

### 1. ファイルの作成

`src/pages/about.astro`ファイルを作成します：

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro'
import { siteConfig } from '../config'

const title = 'About'
const description = 'About me and this blog'
---

<BaseLayout title={title} description={description}>
  <main class="container mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">About Me</h1>
    
    <div class="prose prose-lg max-w-none">
      <p>ここに自己紹介を書きます。</p>
      
      <h2>経歴</h2>
      <p>あなたの経歴について書きます。</p>
      
      <h2>スキル</h2>
      <ul>
        <li>プログラミング言語</li>
        <li>フレームワーク</li>
        <li>ツール</li>
      </ul>
      
      <h2>趣味</h2>
      <p>趣味について書きます。</p>
      
      <h2>連絡先</h2>
      <p>連絡方法について書きます。</p>
    </div>
  </main>
</BaseLayout>
```

### 2. ナビゲーションに追加

`src/config.ts`でナビゲーションメニューにAboutページを追加します：

```typescript
export const navConfig = [
  { name: 'ホーム', url: '/' },
  { name: 'ブログ', url: '/blog' },
  { name: 'About', url: '/about' },
  { name: '連絡先', url: '/contact' }
]
```

## カスタマイズオプション

### プロフィール画像

```astro
<div class="flex flex-col md:flex-row items-center mb-8">
  <img 
    src="/profile.jpg" 
    alt="プロフィール画像" 
    class="w-32 h-32 rounded-full mb-4 md:mb-0 md:mr-8"
  />
  <div>
    <h1 class="text-4xl font-bold mb-2">あなたの名前</h1>
    <p class="text-xl text-gray-600">職業・肩書き</p>
  </div>
</div>
```

### スキルセクション

```astro
<section class="mb-8">
  <h2 class="text-2xl font-bold mb-4">スキル</h2>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
    <div class="bg-gray-100 p-4 rounded">
      <h3 class="font-semibold">フロントエンド</h3>
      <p>HTML, CSS, JavaScript, React</p>
    </div>
    <div class="bg-gray-100 p-4 rounded">
      <h3 class="font-semibold">バックエンド</h3>
      <p>Node.js, Python, PHP</p>
    </div>
    <div class="bg-gray-100 p-4 rounded">
      <h3 class="font-semibold">データベース</h3>
      <p>MySQL, PostgreSQL, MongoDB</p>
    </div>
  </div>
</section>
```

### タイムライン

```astro
<section class="mb-8">
  <h2 class="text-2xl font-bold mb-4">経歴</h2>
  <div class="space-y-4">
    <div class="border-l-4 border-blue-500 pl-4">
      <h3 class="font-semibold">現在の職業</h3>
      <p class="text-gray-600">2020年 - 現在</p>
      <p>現在の仕事について説明します。</p>
    </div>
    <div class="border-l-4 border-blue-500 pl-4">
      <h3 class="font-semibold">前職</h3>
      <p class="text-gray-600">2018年 - 2020年</p>
      <p>前の仕事について説明します。</p>
    </div>
  </div>
</section>
```

## SEO最適化

### メタデータの設定

```astro
---
const title = 'About - あなたの名前'
const description = 'ウェブ開発者のあなたの名前について。経歴、スキル、プロジェクトを紹介します。'
const image = '/profile-og.jpg'
---

<BaseLayout 
  title={title} 
  description={description}
  image={image}
>
```

### 構造化データ

```astro
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "あなたの名前",
  "jobTitle": "ウェブ開発者",
  "url": "https://yoursite.com/about",
  "image": "https://yoursite.com/profile.jpg",
  "description": "経験豊富なウェブ開発者"
}
</script>
```

## 注意事項

1. **個人情報の管理** - 公開する情報を慎重に選択してください
2. **定期的な更新** - 情報を最新の状態に保ってください
3. **レスポンシブデザイン** - モバイルデバイスでも見やすくしてください
4. **アクセシビリティ** - すべてのユーザーがアクセスできるようにしてください