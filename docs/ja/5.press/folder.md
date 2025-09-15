---
title: フォルダーソリューション（推奨）
createTime: 2025/09/01 20:28:41
permalink: /ja/press/folder/
---

# サブフォルダーに記事を作成する（推奨）

これはMizukiブログシステムで記事を作成する推奨される方法です。この方法は、特に多数の画像やその他のリソースを含む複雑な記事に適しています。

## 記事を作成する

1. `src/content/posts`ディレクトリに新しいフォルダーを作成します。フォルダー名は`my-complex-post`のように分かりやすいものにしてください。

2. 新しく作成したフォルダー内に`index.md`という名前のファイルを作成します。

3. `index.md`ファイルにフロントマター（front-matter metadata）を追加します。これは記事の設定情報であり、`title`と`description`フィールドを含める必要があります。

```markdown
---
title: Markdownチュートリアル
published: 2025-01-20
pinned: true
description: Markdownブログ投稿の簡単な例。
tags: [Markdown, Blogging]
category: Examples
licenseName: "Unlicensed"
author: emn178
sourceLink: "https://github.com/emn178/markdown"
draft: false
date: 2025-01-20
image:
  url: './cover.jpg'
  alt: '記事のカバー'
pubDate: 2025-01-20
---
```

## フロントマターフィールドの詳細

サポートされているフロントマターフィールドは次のとおりです。

### 必須フィールド
- `title`: 記事のタイトル（必須）
- `description`: 記事の説明（必須）

### 公開関連
- `published`: 記事の公開日、YYYY-MM-DD形式
- `pubDate`: 記事の公開日（publishedと同様）
- `date`: 記事の作成日
- `draft`: ドラフトかどうか。trueはドラフト、falseは正式リリース

### その他のフィールド
- `pinned`: 記事をピン留めするかどうか。trueはピン留め、falseはピン留めしない
- `tags`: 記事のタグの配列
- `category`: 記事のカテゴリ
- `licenseName`: ライセンス名
- `author`: 著者名
- `sourceLink`: ソースリンク
- `image`: 記事の画像
  - `url`: 画像のURL。相対パスの場合、現在のフォルダーからの相対パスです。
  - `alt`: 画像の説明

## ベストプラクティス

- **整理されたリソース**: 記事に関連するすべてのリソース（画像など）を記事のフォルダー内に配置します。
- **一貫した命名**: フォルダー名と`index.md`のタイトルに一貫性を持たせます。
- **完全なフロントマター**: 記事のメタデータを完全に含めることで、検索エンジン最適化（SEO）とユーザーエクスペリエンスを向上させます。

## よくある質問

- **Q: 記事が公開されない。**
  - A: `draft`フィールドが`false`に設定されているか、`published`または`pubDate`が正しく設定されているか確認してください。
- **Q: 画像が表示されない。**
  - A: `image.url`が正しいパスを指しているか、画像ファイルが記事のフォルダー内に存在するか確認してください。
- **Q: RSSフィードに画像が表示されない。**
  - A: `image.url`が絶対パスまたは正しく解決できる相対パスであることを確認してください。
