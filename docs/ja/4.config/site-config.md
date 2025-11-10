---
title: サイト設定ガイド
createTime: 2025/08/17 17:21:41
permalink: /config/site-config/
---

**サイト設定ガイド**

サイト設定は `src/config.ts` ファイル内の `siteConfig` オブジェクトにあり、ブログの基本情報とグローバル設定を制御します。

## 設定項目の詳細説明

### 基本情報

```typescript
// サイト言語を定義
const SITE_LANG = "zh_CN"; // 言語コード（例: 'en', 'zh_CN', 'ja' など）
// サイトのタイムゾーンを定義
const SITE_TIMEZONE = 8; // ウェブサイトのタイムゾーンを-12から12で設定（例: 北京時間はUTC+8）

export const siteConfig: SiteConfig = {
  title: "Mizuki",                    // ウェブサイトのタイトル
  subtitle: "One demo website",       // ウェブサイトのサブタイトル
  timeZone: SITE_TIMEZONE,           // 手動設定不要、SITE_TIMEZONEに基づき自動設定
  lang: SITE_LANG,                    // 手動設定不要、SITE_LANGに基づき自動設定
}
```

- `title`: ウェブサイトのメインタイトル。ブラウザのタブやページヘッダーに表示
- `subtitle`: ウェブサイトのサブタイトル。通常はホームページのバナーの下に表示
- `lang`: ウェブサイトのデフォルト言語。日付形式、翻訳などの機能に影響

### テーマカラー

```typescript
  themeColor: {
    hue: 210,     // テーマカラーの色相値、範囲0-360
    fixed: false, // 訪問者のテーマカラー選択を非表示にするかどうか
  },
```

- `hue`: テーマカラーの色相値、0-360の任意の数値
  - 赤: 0
  - シアン: 200
  - 青緑: 250
  - ピンク: 345
- `fixed`: `true`に設定すると、訪問者はテーマカラーを変更できなくなります

### バナー設定

バナー設定はホームページ上部のバナー表示を制御します：

```typescript
  banner: {
    enable: true,  // バナーを有効にするかどうか
    src: {         // バナー画像のパス
      desktop: [   // デスクトップ用画像配列
        "assets/desktop-banner/1.webp",
        "assets/desktop-banner/2.webp",
        // 複数画像をサポート、自動でカルーセルを有効化
      ],
      mobile: [    // モバイル用画像配列
        "assets/mobile-banner/1.webp",
        "assets/mobile-banner/2.webp",
        // モバイル専用画像
      ],
    },
    position: "center", // 画像の配置、'top', 'center', 'bottom'をサポート
    
    carousel: {
      enable: true,    // カルーセル機能を有効化（複数画像時）
      interval: 1,     // カルーセルの間隔時間（秒）
    },
    
    homeText: {
      enable: true,    // ホームページにカスタムテキストを表示
      title: "Mizuki", // ホームページバナーのメインタイトル
      subtitle: [      // サブタイトル配列、複数テキストをサポート
        "One demo website",
        "Carousel Text1",
        "Carousel Text2",
      ],
      typewriter: {
        enable: true,     // タイプライター効果を有効化
        speed: 100,       // タイピング速度（ミリ秒）
        deleteSpeed: 50,  // 削除速度（ミリ秒）
        pauseTime: 2000,  // 完全表示後の一時停止時間（ミリ秒）
      },
    },
    
    credit: {
      enable: false,    // バナー画像の出典テキストを表示
      text: "Describe", // 出典テキスト
      url: "",          // オプション: 原作または作者ページへのリンク
    },
  },

  navbar: {
    transparentMode: "semifull", // ナビゲーションバーの透過モード: "semi" 半透明で角丸、"full" 完全透過、"semifull" 動的透過
  },
```

#### バナー設定の詳細

- **画像パス**: `/src` ディレクトリからの相対パス。`/` で始まる場合は `/public` からの相対パス
- **カルーセル機能**: 画像配列の長さが1より大きい場合、自動的にカルーセルを有効化
- **レスポンシブデザイン**: デスクトップとモバイルで異なる画像を使用可能
- **タイプライター効果**: サブタイトルが動的なタイプライター効果をサポート。速度と一時停止時間を設定可能

### 目次設定

```typescript
  toc: {
    enable: true, // 目次機能を有効にするかどうか
    depth: 3,     // 目次の深さ、1-6、1はh1見出しのみ表示
  },
```

- `enable`: `false`に設定すると記事の目次機能を無効化
- `depth`: 目次に表示する見出し階層の深さを制御

### ナビゲーションバーのセカンダリ折りたたみメニュー設定 (`navBarConfig`)

この設定は、ウェブサイトのナビゲーションバー内のセカンダリ折りたたみメニューを制御するために使用されます。`src/config.ts` ファイルで見つけて変更できます。

#### 主な設定項目:

*   **`links`**: `Array<Object>`
    *   ナビゲーションバー内の各種リンクを定義する配列。各リンクオブジェクトはプリセットリンク（`LinkPreset`）またはカスタムリンクオブジェクトにできます。
    *   カスタムリンクオブジェクトはマルチレベルメニューをサポートし、以下の属性を含みます：
        *   **`name`**: `string`
            *   メニュー項目の表示名。
        *   **`url`**: `string`
            *   メニュー項目クリック時の遷移先URL。
        *   **`children`**: `Array<Object>` (オプション)
            *   現在のメニュー項目のサブメニューを定義する配列。サブメニュー項目の構造はトップレベルメニュー項目と同様で、さらにネスト可能。
            *   各サブメニュー項目も `name`, `url`, `external` などの属性を含むことができます。
            *   **`external`**: `boolean` (オプション)
                *   `true`に設定すると外部リンクとして扱われ、新しいタブで開きます。

#### セカンダリ折りたたみメニューの作成方法:

セカンダリ折りたたみメニューを作成するには、`children` プロパティを含むカスタムリンクオブジェクトを `navBarConfig.links` 配列に追加する必要があります。`children` 配列の各要素がそのメニュー項目のサブメニュー項目になります。

**例:**

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "リンク", // 第一レベルメニュー名
			url: "/links/", // 第一レベルメニューリンク（オプション、サブメニューのみの場合は空可）
			children: [
				{
					name: "GitHub", // 第二レベルメニュー名
					url: "https://github.com/matsuzaka-yuki/Mizuki", // 第二レベルメニューリンク
					external: true, // 外部リンク
				},
				{
					name: "Bilibili",
					url: "https://space.bilibili.com/701864046",
					external: true,
				},
				{
					name: "Gitee",
					url: "https://gitee.com/matsuzakayuki/Mizuki",
					external: true,
				},
			],
		},
		{
			name: "マイ",
			url: "/content/",
			children: [
				LinkPreset.About,
				LinkPreset.Friends,
				LinkPreset.Anime,
				LinkPreset.Diary,
			],
		},
	],
};
```

上記の例では：

*   `リンク` と `マイ` は第一レベルメニュー項目です。
*   `リンク` メニューには `GitHub`, `Bilibili`, `Gitee` の3つの第二レベルサブメニューが含まれ、すべて外部リンクです。
*   `マイ` メニューには `About`, `Friends`, `Anime`, `Diary` の4つの第二レベルサブメニューが含まれ、プリセットリンク（`LinkPreset`）を使用しています。

### ウェブサイトドメイン設定

`astro.config.mjs` ファイルでウェブサイトドメインを設定する必要があります。

```typescript
export default defineConfig({
	site: "https://mizuki.mysqil.com/",
})
```

これは単にウェブサイトのURLを指定するものです。siteプロパティは、ウェブサイトページやRSSフィードで正しいURLを生成するためなど、Astroによってさまざまな目的で使用されます。

### ソーシャルメディア共有画像（OG）の表示

`src/config.ts` ファイルでOGの有効化を設定する必要があります。

```typescript
generateOgImages: true, // OpenGraph画像生成機能を有効化
```
