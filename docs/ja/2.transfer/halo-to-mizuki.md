---
title: HaloからMizukiへの移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/halo-to-mizuki/
---

# HaloからMizukiへの移行ガイド

このガイドでは、Haloブログの投稿をMizukiテーマに移行する方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 多様なコンテンツ形式をサポート

## HaloとMizukiの記事形式の違い

### Haloエクスポート形式の例：

HaloからエクスポートされたMarkdownファイルには通常Frontmatterがなく、純粋なMarkdown形式です。

```markdown
# 私の最初の記事

これは記事のコンテンツです...
```

記事のメタデータ（タイトル、日付、タグなど）は通常、エクスポートされたJSONファイルに含まれているか、Haloのバックエンドから別途取得する必要があります。

### Mizuki形式の例：
```yaml
---
title: HaloからMizukiへの移行
published: 2025-01-20
pinned: true
description: HaloからMizukiへの詳細な移行ガイド。
tags: [移行, Halo, Mizuki]
category: 移行ガイド
licenseName: "Unlicensed"
author: あなたの名前
sourceLink: ""
draft: false
---
```

## 移行手順

### 1. 環境準備

まず、Mizukiプロジェクトが正しくセットアップされていることを確認してください。まだMizukiをインストールしていない場合は、公式ドキュメントを参照してインストールしてください。

### 2. 記事の変換

HaloからエクスポートされたMarkdownファイルは、Mizukiでそのまま使用できます。ただし、記事のメタデータ（タイトル、公開日、タグ、カテゴリなど）をFrontmatterとして追加する必要があります。

**Haloからメタデータを取得する方法：**

- Haloの管理画面から記事のメタデータを手動でコピーする。
- HaloのAPIを利用してメタデータをエクスポートする。
- Haloのデータベースから直接メタデータを取得する。

取得したメタデータをMizukiのFrontmatter形式に変換します。

**例：**

Haloの記事タイトルが「私の最初の記事」、公開日が「2023-10-26」の場合、MizukiのFrontmatterは以下のようになります。

```yaml
---
title: "私の最初の記事"
published: 2023-10-26
tags: [タグ1, タグ2]
categories: [カテゴリ1]
---
```

### 3. 静的アセットの移行

Haloで画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、記事内のパスを更新する必要があります。

**例：**

Haloのパス:
```markdown
![画像](/upload/2023/10/my-image.jpg)
```

Mizukiのパス:
```markdown
![画像](/my-image.jpg)
```

### 4. 設定の移行

Haloのサイト設定（サイトタイトル、説明など）をMizukiの`src/config.ts`ファイルに移行します。

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

大量の記事がある場合、PythonやNode.jsなどのスクリプト言語を使用して、Frontmatterの追加やアセットパスの更新を自動化できます。

### URLリダイレクト

HaloとMizukiで記事のURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
