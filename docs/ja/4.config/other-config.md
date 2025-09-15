---
title: その他の設定手順
createTime: 2025/08/17 17:21:41
permalink: /ja/config/other-config/
---

**その他の設定手順**

サイト、ナビゲーションバー、プロフィール設定に加えて、Mizukiはライセンス、コードブロック、コメントシステムなど、いくつかの追加設定オプションも提供しています。

## ライセンス設定

ライセンス設定は、`src/config.ts`ファイル内の`licenseConfig`オブジェクトにあり、記事下部のライセンス表示を制御します。

```typescript
export const licenseConfig: LicenseConfig = {
  enable: true,                   // ライセンス表示を有効にするかどうか
  name: "CC BY-NC-SA 4.0",      // ライセンス名
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // ライセンスリンク
};
```

- `enable`: `false`に設定すると、記事下部のライセンス情報が非表示になります。
- `name`: 表示されるライセンス名
- `url`: ライセンス詳細ページへのリンク

## コードブロック設定

コードブロック設定は、`src/config.ts`ファイル内の`expressiveCodeConfig`オブジェクトにあり、コードブロックの表示スタイルを制御します。

```typescript
export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // 注: 一部のスタイル（例: 背景色）は上書きされています。astro.config.mjsファイルを参照してください。
  // このブログテーマは現在ダーク背景のみをサポートしているため、ダークテーマを選択してください。
  theme: "github-dark",  // コードブロックのテーマ
};
```

- `theme`: コードブロックのシンタックスハイライトテーマ
  - Mizukiテーマは現在ダーク背景のみをサポートしているため、ダークテーマを使用することをお勧めします。
  - 利用可能なテーマには、`github-dark`、`dracula`、`one-dark`などがあります。

## コメントシステム設定

コメントシステム設定は、`src/config.ts`ファイル内の`commentConfig`オブジェクトにあり、記事下部のコメントシステムを制御します。

```typescript
export const commentConfig: CommentConfig = {
  enable: false,  // コメント機能を有効にするかどうか
  twikoo: {
    envId: "", // Twikoo環境ID
    region: "", // Twikooリージョン（オプション）
    // ... その他のTwikoo設定
  },
  giscus: {
    repo: "", // Giscusリポジトリ (例: "owner/repo")
    repoId: "", // GiscusリポジトリID
    category: "", // Giscusカテゴリ
    categoryId: "", // GiscusカテゴリID
    // ... その他のGiscus設定
  },
  artalk: {
    server: "", // ArtalkサーバーURL
    site: "", // Artalkサイト名
    // ... その他のArtalk設定
  },
  // ... その他のコメントシステム
};
```

- `enable`: コメント機能を有効にするかどうか。デフォルトは`false`。
- `twikoo`: Twikooコメントシステムの設定
  - `envId`: Twikoo環境ID。必須。
  - `region`: Twikooリージョン。オプション。
- `giscus`: Giscusコメントシステムの設定
  - `repo`: Giscusリポジトリ。例: `"owner/repo"`。必須。
  - `repoId`: GiscusリポジトリID。必須。
  - `category`: Giscusカテゴリ。必須。
  - `categoryId`: GiscusカテゴリID。必須。
- `artalk`: Artalkコメントシステムの設定
  - `server`: ArtalkサーバーURL。必須。
  - `site`: Artalkサイト名。必須。

## その他の設定

`src/config.ts`ファイルには、サイトのタイトル、説明、言語、テーマなどのグローバル設定も含まれています。これらの設定は、ウェブサイトの全体的な動作と外観を制御します。

## ベストプラクティス

- **必要な機能のみ有効にする**: 不要な機能を無効にすることで、ウェブサイトのパフォーマンスを向上させます。
- **コメントシステムの選択**: ウェブサイトのニーズと好みに合わせて、適切なコメントシステムを選択します。
- **定期的な確認**: 設定ファイルを定期的に確認し、最新の状態に保ちます。

## よくある質問

- **Q: ライセンス情報が表示されません。**
  - A: `licenseConfig.enable`が`true`に設定されているか確認してください。
- **Q: コードブロックのテーマが適用されません。**
  - A: `expressiveCodeConfig.theme`に有効なダークテーマが設定されているか確認してください。また、`astro.config.mjs`ファイルでスタイルが上書きされていないか確認してください。
- **Q: コメントシステムが機能しません。**
  - A: `commentConfig.enable`が`true`に設定されているか、選択したコメントシステム（Twikoo、Giscus、Artalkなど）の必要な設定がすべて正しく入力されているか確認してください。
