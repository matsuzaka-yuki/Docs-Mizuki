---
title: MarkdownファイルをMizukiにインポートする
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/markdown-import/
---

# MarkdownファイルをMizukiにインポートするガイド

このガイドでは、既存のMarkdownファイルをMizukiテーマにインポートする方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 多様なコンテンツ形式をサポート

## MarkdownファイルとMizuki記事形式の違い

Mizuki記事の核はMarkdownファイルですが、記事のメタデータを定義するために特定のFrontmatter（YAMLヘッダー情報）を含める必要があります。

### 純粋なMarkdownファイルの例：
```markdown
# 私の最初の記事

これは純粋なMarkdown形式の記事のコンテンツです。

## 小見出し

さらにコンテンツ...
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
author: emn178
sourceLink: "https://github.com/emn178/markdown"
draft: false
---
```

## 移行手順

### 1. 環境準備

まず、Mizukiプロジェクトが正しくセットアップされていることを確認してください。まだMizukiをインストールしていない場合は、公式ドキュメントを参照してインストールしてください。

### 2. Frontmatterの追加

既存のMarkdownファイルに、Mizukiが必要とするFrontmatterを追加します。最低限、`title`と`published`フィールドが必要です。

**例：**

```yaml
---
title: あなたのMarkdown記事のタイトル
published: 2023-10-26
description: 記事の概要
tags: [タグ1, タグ2]
categories: [カテゴリ1]
---

# あなたのMarkdown記事のタイトル

これは既存のMarkdownコンテンツです。

## 小見出し

さらにコンテンツ...
```

### 3. 静的アセットの移行

Markdownファイル内で画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、Markdownファイル内のパスを更新する必要があります。

**例：**

元のパス:
```markdown
![画像](/images/my-image.jpg)
```

Mizukiのパス:
```markdown
![画像](/my-image.jpg)
```

### 4. 移行後の確認

すべての記事とアセットを移行したら、Mizukiプロジェクトをビルドして、すべてが正しく表示されることを確認してください。

```bash
pnpm run build
pnpm run preview
```

ブラウザでプレビューを確認し、リンク、画像、レイアウトが期待通りに機能していることを確認します。

## 高度な移行オプション

### カスタムスクリプト

大量のMarkdownファイルがある場合、PythonやNode.jsなどのスクリプト言語を使用して、Frontmatterの追加やアセットパスの更新を自動化できます。

### URLリダイレクト

元のMarkdownファイルのURL構造とMizukiのURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
