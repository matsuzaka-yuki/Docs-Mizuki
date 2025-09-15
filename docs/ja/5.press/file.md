---
title: 単一ファイルソリューション
createTime: 2025/09/01 20:29:52
permalink: /ja/press/file/
---
# 記事を直接Postsディレクトリに作成する

これはMizukiブログシステムで記事を作成する2つの方法の1つです。この方法は、大量の画像リソースを管理する必要がないシンプルな記事に適しています。
単一ファイルソリューションでは、RSSが画像パス（ローカル画像を指します。画像ホスティングサービスを使用している場合は問題ありません）を正しく構築できない場合があります。RSS機能を使用する必要がある場合は、フォルダーベースの書き込みソリューションを使用してください。

## 記事を作成する

1. `src/content/posts`ディレクトリに新しいMarkdownファイルを作成します。ファイル名は`my-first-post.md`のように分かりやすいものにしてください。

2. ファイルにフロントマター（front-matter metadata）を追加します。これは記事の設定情報であり、`title`と`description`フィールドを含める必要があります。

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
  url: 'https://example.com/image.jpg'
  alt: '画像の説明'
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
  - `url`: 画像のURL
  - `alt`: 画像の説明

## ベストプラクティス

- **一意のファイル名**: 記事ごとに一意で分かりやすいファイル名を使用します。
- **完全なフロントマター**: 記事のメタデータを完全に含めることで、検索エンジン最適化（SEO）とユーザーエクスペリエンスを向上させます。
- **画像パス**: ローカル画像を使用する場合は、RSSの互換性のためにフォルダーベースのソリューションを検討してください。

## よくある質問

- **Q: 記事が公開されない。**
  - A: `draft`フィールドが`false`に設定されているか、`published`または`pubDate`が正しく設定されているか確認してください。
- **Q: 画像が表示されない。**
  - A: `image.url`が正しいパスを指しているか確認してください。
- **Q: RSSフィードに画像が表示されない。**
  - A: 単一ファイルソリューションを使用している場合、ローカル画像はRSSで正しく表示されない可能性があります。フォルダーベースのソリューションの使用を検討してください。
