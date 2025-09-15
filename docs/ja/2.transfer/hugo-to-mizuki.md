---
title: HugoからMizukiへの移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/hugo-to-mizuki/
---

# HugoからMizukiへの移行ガイド

このガイドでは、Hugoブログの投稿をMizukiテーマに移行する方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 多様なコンテンツ形式をサポート

## HugoとMizukiの記事形式の違い

### Hugo形式の例：
```yaml
---
title: "私の最初の記事"
date: 2024-01-15T10:30:00+08:00
lastmod: 2024-01-16T15:20:00+08:00
description: "これは記事の要約です"
tags:
  - テクノロジー
  - チュートリアル
categories:
  - テックシェア
images:
  - /images/cover.jpg
draft: false
---
```

### Mizuki形式の例：
```yaml
---
title: Markdownチュートリアル
published: 2025-01-20
pinned: true
description: Markdownブログ投稿の簡単な例。
tags: [Markdown, ブログ]
category: 例
licenseName: "Unlicensed"
---
```

## 移行手順

### 1. 環境準備

まず、Mizukiプロジェクトが正しくセットアップされていることを確認してください。まだMizukiをインストールしていない場合は、公式ドキュメントを参照してインストールしてください。

### 2. 記事の変換

Hugoの記事はMarkdown形式で、Frontmatterを含んでいます。MizukiもMarkdownとFrontmatterに基づいているため、移行は比較的簡単です。ただし、Frontmatterのフィールド名をMizukiの要件に合わせて調整する必要があります。

**一般的なFrontmatterフィールドのマッピング：**

| Hugoフィールド | Mizukiフィールド | 説明                               |
| :------------- | :--------------- | :--------------------------------- |
| `title`        | `title`          | 記事のタイトル                     |
| `date`         | `published`      | 記事の公開日                       |
| `lastmod`      | `updated`        | 記事の最終更新日                   |
| `description`  | `description`    | 記事の概要（SEO用）                |
| `tags`         | `tags`           | 記事のタグ                         |
| `categories`   | `category`       | 記事のカテゴリ（Mizukiは単数形）   |
| `images`       | `image`          | 記事のサムネイル画像               |
| `draft`        | `draft`          | 下書き状態（`true`または`false`） |

**例：**

HugoのFrontmatter:
```yaml
---
title: "私の最初の記事"
date: 2024-01-15T10:30:00+08:00
lastmod: 2024-01-16T15:20:00+08:00
description: "これは記事の要約です"
tags:
  - テクノロジー
  - チュートリアル
categories:
  - テックシェア
images:
  - /images/cover.jpg
draft: false
---
```

MizukiのFrontmatter:
```yaml
---
title: "私の最初の記事"
published: 2024-01-15T10:30:00+08:00
updated: 2024-01-16T15:20:00+08:00
description: "これは記事の要約です"
tags: [テクノロジー, チュートリアル]
category: テックシェア
image: /images/cover.jpg
draft: false
---
```

必要に応じて、スクリプトを作成して一括変換することも可能です。

### 3. 静的アセットの移行

Hugoで画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、記事内のパスを更新する必要があります。

**例：**

Hugoのパス:
```markdown
![画像](/images/my-image.jpg)
```

Mizukiのパス:
```markdown
![画像](/my-image.jpg)
```

### 4. 設定の移行

Hugoのサイト設定（サイトタイトル、説明など）をMizukiの`src/config.ts`ファイルに移行します。

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

HugoとMizukiで記事のURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
