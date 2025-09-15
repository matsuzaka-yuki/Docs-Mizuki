---
title: Z-BlogからMizukiへの移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/zblog-import/
---

# Z-BlogからMizukiへの移行ガイド

このガイドでは、既存のZ-BlogコンテンツをMizukiテーマに移行する方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 多様なコンテンツ形式をサポート

## Z-BlogとMizukiの記事形式の違い

Z-Blogは通常、記事コンテンツをデータベースに保存し、HTMLまたはリッチテキスト形式で表示します。Mizukiの記事は主にMarkdownファイルであり、記事のメタデータを定義するために特定のFrontmatter（YAMLヘッダー情報）が必要です。

移行の鍵は、Z-Blogデータベースから記事コンテンツをエクスポートし、Markdown形式に変換し、必要なメタデータを抽出してFrontmatterを生成することです。

### Z-Blog記事コンテンツの例（データベースではHTMLの場合があります）：
```html
<p>これはZ-Blogの記事コンテンツです。</p>
<h2>記事のサブタイトル</h2>
<p>さらにコンテンツ...</p>
```

### Mizuki形式の例（Frontmatter付きのMarkdownに変換）：
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

# 私のZ-Blog記事

これはZ-Blogの記事コンテンツです。
```

## 移行手順

### 1. 環境準備

まず、Mizukiプロジェクトが正しくセットアップされていることを確認してください。まだMizukiをインストールしていない場合は、公式ドキュメントを参照してインストールしてください。

### 2. Z-Blogからのデータエクスポート

Z-Blogから記事データをエクスポートするには、以下の方法があります。

- **データベースから直接エクスポート**: phpMyAdminなどのツールを使用して、Z-Blogのデータベースから記事データをエクスポートします。通常、記事コンテンツはHTML形式で保存されています。
- **プラグインを使用**: Z-Blogには、記事をエクスポートするプラグインが存在する場合があります。適切なプラグインを探して利用してください。

エクスポートされたデータは、通常、記事のタイトル、コンテンツ、作成日、更新日、タグ、カテゴリなどの情報を含んでいます。

### 3. HTMLからMarkdownへの変換とFrontmatterの追加

エクスポートされたHTMLコンテンツをMarkdownに変換し、Mizukiが必要とするFrontmatterを追加します。オンラインツールやプログラミングライブラリ（例: Pythonの`html2text`、Node.jsの`turndown`）を使用できます。

**例：**

Z-Blogから取得したHTMLコンテンツ:
```html
<h1>私のZ-Blog記事</h1>
<p>これはZ-Blogの記事コンテンツです。</p>
```

変換後のMarkdownとFrontmatter:
```yaml
---
title: "私のZ-Blog記事"
published: 2023-10-26
description: "Z-Blogからの移行記事"
tags: [Z-Blog, 移行]
category: ブログ
---

# 私のZ-Blog記事

これはZ-Blogの記事コンテンツです。
```

### 4. 静的アセットの移行

Z-Blogで画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、記事内のパスを更新する必要があります。

**例：**

Z-Blogのパス:
```html
<img src="/zb_users/upload/2023/10/my-image.jpg" alt="画像">
```

Mizukiのパス:
```markdown
![画像](/my-image.jpg)
```

### 5. 設定の移行

Z-Blogのサイト設定（サイトタイトル、説明など）をMizukiの`src/config.ts`ファイルに移行します。

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

### 6. 移行後の確認

すべての記事とアセットを移行したら、Mizukiプロジェクトをビルドして、すべてが正しく表示されることを確認してください。

```bash
pnpm run build
pnpm run preview
```

ブラウザでプレビューを確認し、リンク、画像、レイアウトが期待通りに機能していることを確認します。

## 高度な移行オプション

### カスタムスクリプト

大量の記事がある場合、PythonやNode.jsなどのスクリプト言語を使用して、Z-Blogからのデータエクスポート、HTMLからMarkdownへの変換、Frontmatterの追加、アセットパスの更新を自動化できます。

### URLリダイレクト

Z-BlogとMizukiで記事のURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
