---
title: Site Configuration Guide
createTime: 2025/08/17 17:21:41
permalink: /en/config/site-config/
---

**サイト設定手順**

サイト設定は`src/config.ts`ファイル内の`siteConfig`オブジェクトにあり、ブログの基本情報とグローバル設定を制御します。

## 設定項目の詳細説明

### 基本情報

```typescripts
// サイト言語を定義
const SITE_LANG = "zh_CN"; // 言語コード、例: 'en', 'zh_CN', 'ja'など

export const siteConfig: SiteConfig = {
  title: "Mizuki",        // ウェブサイトのタイトル
  subtitle: "デモウェブサイト",  // ウェブサイトのサブタイトル
  lang: SITE_LANG,         // 設定不要。SITE_LANGに基づいて自動設定されます
}
```

- `title`: ウェブサイトの主題名で、ブラウザのタブとページヘッダーに表示されます
- `subtitle`: ウェブサイトのサブタイトルで、通常はホームページのバナーの下に表示されます
- `lang`: ウェブサイトのデフォルト言語で、日付のフォーマットや翻訳などの機能に影響します

### テーマカラー

```typescript
  themeColor: {
    hue: 210,     // テーマカラーの色相値、範囲0-360
    fixed: false, // 訪問者のテーマカラー選択ツールを非表示にするかどうか
  },
```

- `hue`: テーマカラーの色相値で、0から360の間の任意の値を指定できます
  - 赤: 0
  - シアン: 200
  - ティール: 250
  - ピンク: 345
- `fixed`: `true`に設定すると、訪問者はテーマカラーを変更できなくなります



### バナー設定

バナー設定はホームページのトップバナーの表示を制御します:

```typescript
  banner: {
    enable: true,  // バナーを有効にするかどうか
    src: {         // バナー画像のパス
      desktop: [   // デスクトップデバイス用の画像配列
        "assets/desktop-banner/1.webp",
        "assets/desktop-banner/2.webp",
        // 複数の画像をサポートし、自動的にカルーセルが有効になります
      ],
      mobile: [    // モバイルデバイス用の画像配列
        "assets/mobile-banner/1.webp",
        "assets/mobile-banner/2.webp",
        // モバイルデバイス専用の画像
      ],
    },
    position: "center", // 画像の配置、'top'、'center'、'bottom'をサポート
    
    carousel: {
      enable: true,    // カルーセル機能を有効にする（複数の画像がある場合）
      interval: 1,     // カルーセルの間隔時間（秒単位）
    },
    
    homeText: {
      enable: true,    // ホームページにカスタムテキストを表示するかどうか
      title: "Mizuki", // ホームページバナーの主題名
      subtitle: [      // サブタイトルの配列、複数のテキストをサポート
        "デモウェブサイト",
        "カルーセルテキスト1",
        "カルーセルテキスト2",
      ],
      typewriter: {
        enable: true,     // タイプライター効果を有効にする
        speed: 100,       // 入力速度（ミリ秒単位）
        deleteSpeed: 50,  // 削除速度（ミリ秒単位）
        pauseTime: 2000,  // 完全表示後のポーズ時間（ミリ秒単位）
      },
    },
    
    credit: {
      enable: false,    // バナー画像の出典テキストを表示するかどうか
      text: "説明", // 出典テキスト
      url: "",          // オプション: 原作品または作者のページへのリンク
    },
  },

navbar: {
		transparentMode: "semifull", // ナビゲーションバーの透明度モード: "semi"（半透明で角丸）、"full"（完全透明）、"semifull"（動的透明度）
	},
```

#### バナー設定の詳細説明

- **画像パス**: `/src`ディレクトリを基準とします。`/`で始まる場合は`/public`ディレクトリを基準とします
- **カルーセル機能**: 画像配列の長さが1より大きい場合に自動的に有効になります
- **レスポンシブデザイン**: デスクトップとモバイルデバイスで異なる画像を使用できます
- **タイプライター効果**: サブタイトルは動的なタイプライター効果をサポートし、速度とポーズ時間を設定できます

### 目次(TOC)設定

```typescript
  toc: {
    enable: true, // 目次機能を有効にするかどうか
    depth: 3,     // TOCの深さ、1-6。1はH1見出しのみ表示を意味します
  },
```

- `enable`: `false`に設定すると、記事の目次機能が無効になります
- `depth`: 目次に表示される見出しのレベル深度を制御します

### ナビゲーションバーの二次折りたたみメニュー設定(`navBarConfig`)

この設定はウェブサイトのナビゲーションバーの二次折りたたみメニューを制御するために使用されます。`src/config.ts`ファイルで検索して変更できます。

#### 主な設定項目:

*   **`links`**: `Array<Object>`
    *   ナビゲーションバーの各リンクを定義する配列。各リンクオブジェクトはプリセットリンク(`LinkPreset`)またはカスタムリンクオブジェクトです。
    *   カスタムリンクオブジェクトは多層メニューをサポートし、以下のプロパティを含みます:
        *   **`name`**: `string`
            *   メニュー項目の表示名。
        *   **`url`**: `string`
            *   メニュー項目をクリックしたときにジャンプするURL。
        *   **`children`**: `Array<Object>` (オプション)
            *   現在のメニュー項目のサブメニューを定義する配列。サブメニュー項目の構造はトップレベルのメニュー項目と同様で、さらにネストできます。
            *   各サブメニュー項目にも`name`、`url`、`external`などのプロパティを含めることができます。
            *   **`external`**: `boolean` (オプション)
                *   `true`に設定すると、外部リンクを示し、新しいタブで開きます。

#### 二次折りたたみメニューの作成方法:

二次折りたたみメニューを作成するには、`navBarConfig.links`配列に`children`プロパティを含むカスタムリンクオブジェクトを追加する必要があります。`children`配列の各要素は、現在のメニュー項目のサブメニューになります。

**例:**

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "リンク", // 一級メニューの名前
			url: "/links/", // 一級メニューのリンク（オプション。サブメニューのみの場合は空にできます）
			children: [
				{
					name: "GitHub", // 二級メニューの名前
					url: "https://github.com/matsuzaka-yuki/Mizuki", // 二級メニューのリンク
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
			name: "マイページ",
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

上記の例では:

*   `リンク`と`マイページ`は一級メニュー項目です。
*   `リンク`メニューには3つの二級サブメニュー（`GitHub`、`Bilibili`、`Gitee`）が含まれており、いずれも外部リンクです。
*   `マイページ`メニューには4つの二級サブメニュー（`About`、`Friends`、`Anime`、`Diary`）が含まれており、プリセットリンク（`LinkPreset`）を使用しています。

### ウェブサイトのドメイン設定

ウェブサイトのドメインを設定するには、`astro.config.mjs`ファイルで設定する必要があります:

```typescript
export default defineConfig({
	site: "https://mizuki.mysqil.com/",
})
```

これは単にウェブサイトのURLを指定するものです。`site`プロパティは、ウェブサイトのページやRSSフィードで正しいURLを生成するためなど、さまざまな目的でAstroによって使用されます。

### ソーシャルメディア共有画像(OpenGraph)の表示

`src/config.ts`ファイルでOpenGraph(OG)の有効化を設定する必要があります。

```typescript
generateOgImages: true, // OpenGraph画像の生成機能を有効にする
```