---
title: WordPressからMizukiへの移行
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/wordpress-to-mizuki/
---

# WordPressからMizukiへの移行ガイド

このガイドでは、WordPressブログの投稿をMizukiテーマに移行する方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに開発されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 複数のコンテンツ形式をサポート

## WordPressとMizukiの記事形式の違い

### WordPressエクスポート形式
WordPressは通常、XMLファイルを介してコンテンツをエクスポートします。これには、記事のタイトル、コンテンツ、カテゴリ、タグ、公開日、その他の情報が含まれます。

### Mizuki形式の例:
```yaml
---
title: Markdownチュートリアル
published: 2025-01-20
pinned: true
description: Markdownブログ投稿の簡単な例です。
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

1. WordPressウェブサイトのバックアップ
2. Mizukiテーマがインストールされていることを確認
3. 記事の保存ディレクトリを準備: `src/content/posts/`

### 2. WordPressコンテンツのエクスポート

#### 方法1: WordPress管理パネルからのエクスポート
1. WordPress管理パネルにログイン
2. 「ツール」→「エクスポート」に移動
3. 「投稿」を選択し、「エクスポートファイルをダウンロード」をクリック
4. XML形式のエクスポートファイルを取得

#### 方法2: プラグインを使用してMarkdownとしてエクスポート
WordPressコンテンツを直接Markdown形式でエクスポートするには、以下のプラグインを使用することをお勧めします。
- **WordPress to Static Site Generator**
- **Simply Static**
- **WP Gatsby Markdown Exporter**

### 3. 記事形式の変換

#### XMLからの変換
XMLファイルを取得した場合は、Markdown形式に変換する必要があります。オンラインツールを使用するか、手動で変換できます。

1. **手動変換**:
   - 記事のタイトルとコンテンツをコピー
   - 新しい`.md`ファイルを作成
   - Frontmatterを追加

2. **オンライン変換ツール**:
   - WordPress to Markdownコンバーター
   - Pandocコマンドラインツール

#### Frontmatterの追加
各記事にMizukiに必要なFrontmatterを追加します。

```yaml
---
title: "あなたの記事タイトル"
pubDate: 2024-01-15  # WordPressの公開日
updatedDate: 2024-01-16  # WordPressの最終更新日
description: "記事の要約または説明"  # WordPressの抜粋から取得可能
tags: ["タグ1", "タグ2"]  # WordPressのタグ
category: "カテゴリ名"  # WordPressのメインカテゴリ
cover: "/images/cover.jpg"  # アイキャッチ画像 (もしあれば)
draft: false
---
```

### 4. 静的リソースの移行

#### 画像とメディアファイル

1. **WordPressメディアファイルのダウンロード**:
   - FTP経由で`/wp-content/uploads/`ディレクトリをダウンロード
   - またはWordPressメディアエクスポートプラグインを使用

2. **画像ファイルの整理**:
   - 画像をMizukiの`public/images/`ディレクトリにコピー
   - 元のディレクトリ構造を維持するか、再編成する

3. **画像パスの更新**:
   - WordPress: `https://yoursite.com/wp-content/uploads/2024/01/image.jpg`
   - Mizuki: `![画像](/images/2024/01/image.jpg)`

### 5. 内部リンクの更新

記事内の内部リンクの形式を更新します。
- WordPress: `https://yoursite.com/2024/01/15/post-name/`
- Mizuki: `[リンク](/posts/post-name/)`

### 6. WordPress固有機能の処理

#### ショートコード
WordPressのショートコードは、手動でMarkdownまたはHTMLに変換する必要があります。
- `[gallery]` → 手動で画像ギャラリーを作成
- `[caption]` → Markdownの画像構文を使用
- `[youtube]` → YouTubeリンクを直接埋め込む

#### カスタムフィールド
WordPressのカスタムフィールドを使用している場合は、Frontmatterフィールドに変換する必要があります。

### 7. 移行結果の確認

移行が完了したら、以下の項目を確認してください。

- [ ] 記事のタイトル、日付、タグが正しいか
- [ ] 画像とメディアファイルが正常に表示されるか
- [ ] 内部リンクが正常にアクセスできるか
- [ ] 記事のカテゴリとタグが正しく表示されるか
- [ ] 記事の要約が正常に表示されるか
- [ ] ショートコードが正しく変換されているか
- [ ] カスタムフィールドが移行されているか

## よくある問題

### Q: WordPressの多階層カテゴリを処理するにはどうすればよいですか？
A: Mizukiは単一カテゴリのみをサポートしています。メインカテゴリを`category`として選択し、他のカテゴリは`tags`に追加することをお勧めします。

### Q: WordPressのコメントを移行するにはどうすればよいですか？
A: Mizukiは現在、Twikooコメントシステムのみをサポートしています。WordPressのコメントは直接移行できません。バックアップのためにエクスポートし、新しいコメントシステムを使用することをお勧めします。

### Q: WordPressのカスタム投稿タイプを処理するにはどうすればよいですか？
A: カスタム投稿タイプは、そのコンテンツに基づいてMizukiの記事システムに移行するか、カスタムページを作成するかを決定する必要があります。

### Q: WordPressプラグインの機能を置き換えるにはどうすればよいですか？
A: ほとんどのWordPressプラグイン機能は、代替ソリューションを見つけるか、手動で実装する必要があります。例えば、SEOプラグイン機能はMizukiの組み込みSEOサポートを通じて実現できます。

## 高度な機能の移行

### コメントシステム
Mizukiは現在、Twikooコメントシステムのみをサポートしており、設定ファイルで有効にできます。

### SEO最適化
- すべての記事に`description`フィールドがあることを確認
- 記事のURL構造がSEO要件を満たしているか確認
- サイトマップとRSS購読機能の検証
- 適切なメタタグの設定

### RSS購読
MizukiはRSS購読を自動的に生成するため、追加の設定は不要です。

### リダイレクト設定
SEO値を維持するために、古いWordPressのURLから新しいMizukiのURLへのリダイレクトを設定することをお勧めします。

## まとめ

WordPressからMizukiへの移行は、形式変換と機能置換が主な課題となる比較的複雑なプロセスです。コア記事コンテンツから始め、徐々に画像、リンク、高度な機能を処理するなど、バッチで移行することをお勧めします。移行プロセス中は、必ず元のデータをバックアップし、移行後に包括的なテストを実行して、すべての機能が正しく動作することを確認してください。
