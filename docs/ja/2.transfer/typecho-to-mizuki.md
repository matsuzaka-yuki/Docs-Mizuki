---
title: TypechoからMizukiへの移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/typecho-to-mizuki/
---

# TypechoからMizukiへの移行ガイド

このガイドでは、Typechoブログの投稿をMizukiテーマに移行する方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 多様なコンテンツ形式をサポート

## TypechoとMizukiの記事形式の違い

### Typechoデータベース構造
Typechoは記事をデータベースに保存しており、主に以下のフィールドが含まれています。
- `title`: 記事のタイトル
- `text`: 記事のコンテンツ（Markdown形式）
- `created`: 作成時間
- `modified`: 更新時間
- `slug`: 記事のスラッグ
- `tags`: タグ
- `category`: カテゴリ

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

### 2. Typechoからのデータエクスポート

Typechoから記事データをエクスポートするには、以下の方法があります。

- **データベースから直接エクスポート**: phpMyAdminなどのツールを使用して、`typecho_contents`テーブルから記事データをエクスポートします。必要に応じて、`typecho_metas`テーブルからタグやカテゴリの情報を取得します。
- **プラグインを使用**: Typechoには、記事をMarkdownやXML形式でエクスポートするプラグインが存在する場合があります。適切なプラグインを探して利用してください。

エクスポートされたデータは、通常、記事のタイトル、コンテンツ、作成日、更新日、スラッグ、タグ、カテゴリなどの情報を含んでいます。

### 3. 記事の変換とFrontmatterの追加

エクスポートされたTypechoの記事コンテンツはMarkdown形式であるため、Mizukiでそのまま使用できます。ただし、Mizukiが必要とするFrontmatterを追加する必要があります。

**一般的なFrontmatterフィールドのマッピング：**

| Typechoフィールド | Mizukiフィールド | 説明                               |
| :---------------- | :--------------- | :--------------------------------- |
| `title`           | `title`          | 記事のタイトル                     |
| `created`         | `published`      | 記事の公開日                       |
| `modified`        | `updated`        | 記事の最終更新日                   |
| `tags`            | `tags`           | 記事のタグ                         |
| `category`        | `category`       | 記事のカテゴリ                     |
| `description`     | `description`    | 記事の概要（SEO用）                |
| `slug`            | （permalinkに利用） | 記事のパーマリンクの一部として利用 |

**例：**

Typechoから取得したデータ:
```json
{
  "title": "私のTypecho記事",
  "text": "これはTypechoの記事コンテンツです。",
  "created": 1672531200, // Unixタイムスタンプ
  "modified": 1672617600,
  "slug": "my-typecho-article",
  "tags": "Typecho,ブログ",
  "category": "技術"
}
```

MizukiのFrontmatter:
```yaml
---
title: "私のTypecho記事"
published: 2023-01-01 09:00:00
updated: 2023-01-02 09:00:00
description: "これはTypechoの記事コンテンツです。"
tags: [Typecho, ブログ]
category: 技術
---

これはTypechoの記事コンテンツです。
```

Unixタイムスタンプは、JavaScriptの`new Date(timestamp * 1000).toISOString()`などでISO 8601形式に変換できます。

### 4. 静的アセットの移行

Typechoで画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、記事内のパスを更新する必要があります。

**例：**

Typechoのパス:
```markdown
![画像](/usr/uploads/2023/01/my-image.jpg)
```

Mizukiのパス:
```markdown
![画像](/my-image.jpg)
```

### 5. 設定の移行

Typechoのサイト設定（サイトタイトル、説明など）をMizukiの`src/config.ts`ファイルに移行します。

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

大量の記事がある場合、PythonやNode.jsなどのスクリプト言語を使用して、Typechoからのデータエクスポート、Frontmatterの追加、アセットパスの更新を自動化できます。

### URLリダイレクト

TypechoとMizukiで記事のURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
