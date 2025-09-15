---
title: Hexo から Mizuki への移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/hexo-to-mizuki/
---

# Hexo から Mizuki への移行ガイド

このガイドは、Hexo のブログ記事を Mizuki テーマに移行するのに役立ちます。

## Mizuki とは？

Mizuki は Astro をベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れた SEO サポート
- レスポンシブなレイアウト
- さまざまなコンテンツ形式をサポート

## Hexo と Mizuki の記事形式の違い

### Hexo 形式の例:
```yaml
title: "私の最初の記事"
date: 2024-01-15 10:30:00
tags:
  - Hexo
  - Blog
categories:
  - Essay
```

### Mizuki 形式の例:
```yaml
---
title: Markdown チュートリアル
published: 2025-01-20
pinned: true
description: Markdown ブログ記事の簡単な例。
tags: [Markdown, Blogging]
category: Examples
licenseName: "Unlicensed"
author: emn178
sourceLink: "https://github.com/emn178/markdown"
draft: false
---
```

## 移行手順

### 1. 準備

1. Hexo ブログファイルをバックアップします
2. Mizuki テーマがインストールされていることを確認します
3. 記事の保存ディレクトリを準備します: `src/content/posts/`

### 2. 記事コンテンツの移行

Hexo の `source/_posts/` ディレクトリからすべての `.md` ファイルを Mizuki の `src/content/posts/` ディレクトリにコピーします。

### 3. Frontmatter の手動調整

変換後、以下の手動調整が必要です。

- `date` フィールドを `pubDate` に変更し、`YYYY-MM-DD` 形式にフォーマットします
- `updated` フィールドを `updatedDate` に変更し、`YYYY-MM-DD` 形式にフォーマットします
- `excerpt` フィールドを `description` に変更します
- `categories` 配列の最初の要素を `category` 文字列として使用します
- `tags` が文字列配列形式であることを確認します

### 4. 静的リソースの移行

#### 画像とメディアファイル

1. Hexo の `source/images/` ディレクトリを Mizuki の `public/images/` にコピーします
2. 画像パスは通常変更されません:
   - Hexo: `![画像](/images/example.jpg)`
   - Mizuki: `![画像](/images/example.jpg)`

### 5. 内部リンクの更新

記事内の内部リンクの形式を更新します:
- Hexo: `[リンク](/2023/01/01/post-name/)`
- Mizuki: `[リンク](/posts/post-name/)`

### 6. 移行結果の検証

移行後、以下の項目を確認してください:

- [ ] 記事のタイトル、日付、タグが正しいこと
- [ ] 画像とメディアファイルが正常に表示されること
- [ ] 内部リンクにアクセスできること
- [ ] 記事のカテゴリとタグが正しく表示されること
- [ ] 記事の要約が正常に表示されること

## よくある質問

### Q: 日付形式の変換に関する問題
A: Hexo の `YYYY-MM-DD HH:mm:ss` 形式が Mizuki の `YYYY-MM-DD` 形式に変換されていることを確認してください。

### Q: 画像が表示されない
A: 画像パスが正しいか、画像ファイルが `public/images/` ディレクトリにコピーされていることを確認してください。

### Q: タグとカテゴリの表示異常
A: Frontmatter の `tags` が配列形式で、`category` が文字列形式であることを確認してください。

## 高度な機能の移行

### コメントシステム
Mizuki は現在、Twikoo コメントシステムのみをサポートしており、設定ファイルで有効にできます。

### SEO 最適化
- 各記事に `description` フィールドがあることを確認します
- 記事の URL 構造が SEO 要件を満たしているか確認します
- サイトマップと RSS フィードの機能を確認します

### RSS フィード
Mizuki は RSS フィードを自動的に生成するため、追加の設定は不要です。

## まとめ

これらの手順に従うことで、Hexo ブログを Mizuki テーマに正常に移行できます。移行中に最も重要な側面は、正しい Frontmatter 形式と静的リソースパスの正確性を確保することです。問題が発生した場合は、ファイル形式とパス設定を注意深く確認してください。
