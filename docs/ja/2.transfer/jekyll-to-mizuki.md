---
title: JekyllからMizukiへの移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/jekyll-to-mizuki/
---

# JekyllからMizukiへの移行

このガイドでは、既存のJekyllブログをMizukiに移行する方法を説明します。

## Mizukiの特徴

MizukiはVuePressをベースにした静的ブログテーマで、以下の特徴があります。

- **軽量で高性能**: VuePress上に構築されており、高速なページ読み込み速度を提供します。
- **美しいインターフェース**: シンプルでモダンなデザインで、優れた読書体験を提供します。
- **簡単な設定**: シンプルな設定ファイルでブログをカスタマイズできます。
- **Markdownファースト**: すべての記事はMarkdown形式で記述されます。
- **豊富な機能**: タグ、カテゴリ、アーカイブ、コメント、SEO最適化などをサポートします。

## JekyllとMizukiの記事形式の違い

JekyllとMizukiはどちらもMarkdown形式で記事を記述しますが、Frontmatter（記事ヘッダーメタデータ）と静的リソースの処理においていくつかの違いがあります。

### Frontmatterの違い

Jekyll Frontmatterの例：

```yaml
---
layout: post
title: "私の最初の記事"
date: 2023-01-01 10:00:00 +0800
categories: [テクノロジー, プログラミング]
tags: [Jekyll, Markdown]
---
```

Mizuki Frontmatterの例：

```yaml
---
title: Markdownチュートリアル
published: 2025-01-20
pinned: true
description: Markdownブログ投稿の簡単な例。
tags: [Markdown, ブログ]
category: 例
licenseName: "Unlicensed"
author: emn178
---
```

## 移行手順

### 1. 環境準備

まず、Mizukiプロジェクトが正しくセットアップされていることを確認してください。まだMizukiをインストールしていない場合は、公式ドキュメントを参照してインストールしてください。

### 2. 記事の変換

Jekyllの記事はMarkdown形式なので、基本的にはMizukiでそのまま使用できます。ただし、Frontmatterのフィールド名をMizukiの要件に合わせて調整する必要があります。

**一般的なFrontmatterフィールドのマッピング：**

| Jekyllフィールド | Mizukiフィールド | 説明                               |
| :--------------- | :--------------- | :--------------------------------- |
| `title`          | `title`          | 記事のタイトル                     |
| `date`           | `published`      | 記事の公開日                       |
| `categories`     | `category`       | 記事のカテゴリ（Mizukiは単数形）   |
| `tags`           | `tags`           | 記事のタグ                         |
| `description`    | `description`    | 記事の概要（SEO用）                |
| `image`          | `image`          | 記事のサムネイル画像               |
| `layout`         | （Mizukiでは不要） | Jekyllのレイアウト指定             |

**例：**

JekyllのFrontmatter:
```yaml
---
layout: post
title: "私の最初の記事"
date: 2023-01-01 10:00:00 +0800
categories: [テクノロジー, プログラミング]
tags: [Jekyll, Markdown]
---
```

MizukiのFrontmatter:
```yaml
---
title: "私の最初の記事"
published: 2023-01-01 10:00:00 +0800
category: プログラミング
tags: [Jekyll, Markdown]
---
```

必要に応じて、スクリプトを作成して一括変換することも可能です。

### 3. 静的アセットの移行

Jekyllで画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、記事内のパスを更新する必要があります。

**例：**

Jekyllのパス:
```markdown
![画像](/assets/images/my-image.jpg)
```

Mizukiのパス:
```markdown
![画像](/my-image.jpg)
```

### 4. 設定の移行

Jekyllのサイト設定（サイトタイトル、説明など）をMizukiの`src/config.ts`ファイルに移行します。

**例：**

`src/config.ts`:
```typescript
export const siteConfig = {
  title: 'あなたのサイトタイトル',
  subtitle: 'あなたのサイトのサブタイトル',
  lang: 'ja',
  // ... その他の設定
};
```

### 5. 移行後の確認

すべての記事とアセットを移行したら、Mizukiプロジェクトをビルドして、すべてが正しく表示されることを確認してください。

```bash
pnpm run build
pnpm run preview
```

ブラウザでプレビューを確認し、リンク、画像、レイアウトが期待通りに機能していることを確認します。

## 高度な移行オプション

### カスタムスクリプト

大量の記事がある場合、PythonやNode.jsなどのスクリプト言語を使用して、Frontmatterの変換やアセットパスの更新を自動化できます。

### URLリダイレクト

JekyllとMizukiで記事のURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
