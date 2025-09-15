---
title: GrideaからMizukiへの移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/gridea-import/
---

# GrideaからMizukiへの移行ガイド

このガイドでは、既存のGrideaブログコンテンツをMizukiテーマに移行する方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 多様なコンテンツ形式をサポート

## GrideaとMizukiの記事形式の違い

Grideaは記事をMarkdown形式で保存し、Frontmatterを含んでいます。このため、GrideaからMizukiへの移行は、どちらもMarkdownとFrontmatterに基づいているため、比較的簡単です。

主な違いは、Frontmatterフィールドの名前付けと構造、および静的リソース（画像など）のパス処理にあります。

### Gridea記事の例：
```markdown
---
title: "私のGridea記事"
date: 2023-10-26 10:00:00
tags:
  - エッセイ
categories:
  - 日常
--- 

これはGrideaブログ投稿のコンテンツです。

## サブタイトル

さらにコンテンツ...
```

### Mizuki形式の例：
```yaml
---

title: Markdownチュートリアル
published: 2025-01-20
pinned: true
---
```

## 移行手順

### 1. 環境準備

まず、Mizukiプロジェクトが正しくセットアップされていることを確認してください。まだMizukiをインストールしていない場合は、公式ドキュメントを参照してインストールしてください。

### 2. 記事の変換

Grideaの記事はMarkdown形式なので、基本的にはMizukiでそのまま使用できます。ただし、Frontmatterのフィールド名をMizukiの要件に合わせて調整する必要があります。

**一般的なFrontmatterフィールドのマッピング：**

| Grideaフィールド | Mizukiフィールド | 説明                               |
| :--------------- | :--------------- | :--------------------------------- |
| `title`          | `title`          | 記事のタイトル                     |
| `date`           | `published`      | 記事の公開日                       |
| `tags`           | `tags`           | 記事のタグ                         |
| `categories`     | `categories`     | 記事のカテゴリ                     |
| `description`    | `description`    | 記事の概要（SEO用）                |
| `thumbnail`      | `image`          | 記事のサムネイル画像               |

**例：**

GrideaのFrontmatter:
```yaml
---
title: "私のGridea記事"
date: 2023-10-26 10:00:00
tags:
  - エッセイ
categories:
  - 日常
---
```

MizukiのFrontmatter:
```yaml
---
title: "私のGridea記事"
published: 2023-10-26 10:00:00
tags:
  - エッセイ
categories:
  - 日常
---
```

必要に応じて、スクリプトを作成して一括変換することも可能です。

### 3. 静的アセットの移行

Grideaで画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、記事内のパスを更新する必要があります。

**例：**

Grideaのパス:
```markdown
![画像](/post-images/my-image.jpg)
```

Mizukiのパス:
```markdown
![画像](/my-image.jpg)
```

### 4. 設定の移行

Grideaのサイト設定（サイトタイトル、説明など）をMizukiの`src/config.ts`ファイルに移行します。

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

GrideaとMizukiで記事のURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
