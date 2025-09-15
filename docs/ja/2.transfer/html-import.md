---
title: HTMLファイルをMizukiにインポートする
createTime: 2025/08/16 23:56:17
permalink: /ja/transfer/html-import/
---

# HTMLファイルをMizukiにインポートするガイド

このガイドでは、既存のHTMLファイルからMizukiテーマにコンテンツをインポートする方法を説明します。

## Mizukiとは？

MizukiはAstroをベースに構築されたモダンなブログテーマで、以下の特徴があります。
- 高速な静的サイト生成
- モダンなデザインスタイル
- 優れたSEOサポート
- レスポンシブなレイアウト
- 複数のコンテンツ形式との互換性

## HTMLファイルとMizuki記事形式の違い

Mizuki記事の核はMarkdownファイルであり、記事のメタデータを定義するために特定のFrontmatter（YAMLヘッダー情報）が必要です。HTMLファイルコンテンツを直接インポートするには、HTMLをMarkdown形式に変換し、必要なFrontmatterを追加する必要があります。

### プレーンなHTMLファイルの例：
```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>私の最初のHTML記事</title>
</head>
<body>
    <h1>私の最初のHTML記事</h1>
    <p>これはプレーンなHTML形式のコンテンツです。</p>
    <h2>小見出し</h2>
    <p>さらにコンテンツ...</p>
</body>
</html>
```

### Mizuki形式の例（Markdownに変換 + Frontmatterを追加）：
```yaml
---
title: HTMLインポートガイド
published: 2025-01-20
---
```

## 移行手順

### 1. 環境準備

まず、Mizukiプロジェクトが正しくセットアップされていることを確認してください。まだMizukiをインストールしていない場合は、公式ドキュメントを参照してインストールしてください。

### 2. HTMLからMarkdownへの変換

HTMLコンテンツをMarkdownに変換するには、オンラインツールやプログラミングライブラリ（例: Pythonの`html2text`、Node.jsの`turndown`）を使用できます。

**オンライン変換ツールの例：**
- [HTML to Markdown Converter](https://domchristie.github.io/to-markdown/)

**Pythonでの変換例：**
```python
import html2text

html_content = """
<!DOCTYPE html>
<html>
<body>
    <h1>私の最初のHTML記事</h1>
    <p>これはプレーンなHTML形式のコンテンツです。</p>
</body>
</html>
"""
h = html2text.HTML2Text()
h.ignore_links = False
markdown_content = h.handle(html_content)
print(markdown_content)
```

### 3. Frontmatterの追加

変換されたMarkdownコンテンツに、Mizukiが必要とするFrontmatterを追加します。最低限、`title`と`published`フィールドが必要です。

**例：**

```yaml
---
title: あなたのHTML記事のタイトル
published: 2023-10-26
description: 記事の概要
tags: [タグ1, タグ2]
categories: [カテゴリ1]
---

# あなたのHTML記事のタイトル

これは変換されたMarkdownコンテンツです。

## 小見出し

さらにコンテンツ...
```

### 4. 静的アセットの移行

HTMLファイル内で画像などの静的アセットを使用している場合、それらをMizukiプロジェクトの適切なディレクトリ（例: `public` フォルダ）にコピーし、Markdownファイル内のパスを更新する必要があります。

**例：**

HTMLのパス:
```html
<img src="/images/my-image.jpg" alt="画像">
```

Markdownのパス:
```markdown
![画像](/my-image.jpg)
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

大量のHTMLファイルがある場合、PythonやNode.jsなどのスクリプト言語を使用して、HTMLからMarkdownへの変換、Frontmatterの追加、アセットパスの更新を自動化できます。

### URLリダイレクト

元のHTMLファイルのURL構造とMizukiのURL構造が異なる場合、SEOを維持するためにリダイレクトを設定することを検討してください。これは、ウェブサーバーの設定（例: Nginx、Apache）またはCDNサービスで行うことができます。

## トラブルシューティング

- **画像が表示されない:** 画像のパスが正しいか、`public`フォルダにコピーされているかを確認してください。
- **記事が表示されない:** Frontmatterの形式がMizukiの要件と一致しているか確認してください。
- **ビルドエラー:** ターミナルのエラーメッセージを注意深く読み、指示に従って問題を解決してください。

## サポート

移行中に問題が発生した場合は、Mizukiの公式ドキュメントを参照するか、コミュニティフォーラムでサポートを求めてください。
