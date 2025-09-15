---
title: サイト設定ガイド
createTime: 2025/08/17 17:21:41
permalink: /ja/config/site-config/
---


**サイト設定説明**

サイト設定は`src/config.ts`ファイル内の`siteConfig`オブジェクトにあり、ブログの基本情報とグローバル設定を制御します。

## 設定項目の詳細説明

### 基本情報


```typescript

// サイト言語を定義
const SITE_LANG = "zh_CN"; // 言語コード、例：'en', 'zh_CN', 'ja'など


export const siteConfig: SiteConfig = {
  title: "Mizuki",        // ウェブサイトタイトル
  subtitle: "One demo website",  // ウェブサイトサブタイトル
  lang: SITE_LANG,         // 設定不要；SITE_LANGに基づいて自動設定されます
}
```

- `title`: ウェブサイトのメインタイトル、ブラウザタブとページヘッダーに表示されます
- `subtitle`: ウェブサイトのサブタイトル、通常ホームページバナーの下に表示されます
- `lang`: ウェブサイトのデフォルト言語、日付フォーマット、翻訳、その他の機能に影響します

### テーマカラー

```typescript
  themeColor: {
    hue: 210,     // テーマカラーの色相値、範囲0-360
    fixed: false, // 訪問者のテーマカラーセレクターを非表示にするかどうか
  },
```

- `hue`: テーマカラーの色相値、0から360の任意の値を設定できます
  - 赤: 0
  - シアン: 200
  - ティール: 250
  - ピンク: 345
- `fixed`: `true`に設定すると、訪問者はテーマカラーを変更できなくなります

### 翻訳設定