---
title: サイト設定ガイド
createTime: 2025/08/17 17:21:41
permalink: /ja/config/site-config/
---

**サイト設定の説明**

サイト設定は、`src/config.ts` ファイル内の `siteConfig` オブジェクトにあり、ブログの基本情報とグローバル設定を制御します。

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

- `title`: ウェブサイトのメインタイトルで、ブラウザのタブとページヘッダーに表示されます
- `subtitle`: ウェブサイトのサブタイトルで、通常ホームページのバナーの下に表示されます
- `lang`: ウェブサイトのデフォルト言語で、日付の書式設定、翻訳、その他の機能に影響します

### テーマカラー

```typescript
  themeColor: {
    hue: 210,     // テーマカラーの色相値、範囲0-360
    fixed: false, // 訪問者向けのテーマカラーセレクターを非表示にするかどうか
  },
```

- `hue`: テーマカラーの色相値で、0から360までの任意の値を設定できます
  - 赤: 0
  - シアン: 200
  - ティール: 250
  - ピンク: 345
- `fixed`: `true` に設定すると、訪問者はテーマカラーを変更できなくなります



### バナー設定

バナー設定は、ホームページのトップバナーの表示を制御します。

```typescript
  banner: {
    enable: true,  // バナーを有効にするかどうか
    src: {         // バナー画像のパス
      desktop: [   // デスクトップデバイス用の画像の配列
        "assets/desktop-banner/1.webp",
        "assets/desktop-banner/2.webp",
        // 複数の画像がサポートされており、カルーセルが自動的に有効になります
      ],
      mobile: [    // モバイルデバイス用の画像の配列
        "assets/mobile-banner/1.webp",
        "assets/mobile-banner/2.webp",
        // モバイルデバイス専用の画像
      ],
    },
    position: "center", // 画像の配置、'top', 'center', 'bottom'をサポート
    
    carousel: {
      enable: true,    // カルーセル機能を有効にする (複数の画像がある場合)
      interval: 1,     // カルーセル間隔時間 (秒単位)
    },
    
    homeText: {
      enable: true,    // ホームページにカスタムテキストを表示
      title: "Mizuki", // ホームページバナーのメインタイトル
      subtitle: [      // サブタイトルの配列、複数のテキストをサポート
        "One demo website",
        "Carousel Text1",
        "Carousel Text2",
      ],
      typewriter: {
        enable: true,     // タイプライター効果を有効にする
        speed: 100,       // タイピング速度 (ミリ秒単位)
        deleteSpeed: 50,  // 削除速度 (ミリ秒単位)
        pauseTime: 2000,  // 全表示後の停止時間 (ミリ秒単位)
      },
    },
    
    credit: {
      enable: false,    // バナー画像ソーステキストを表示
      text: "Describe", // ソーステキスト
      url: "",          // オプション: 元の作品または著者のページへのリンク
    },
  },

navbar: {
		transparentMode: "semifull", // ナビゲーションバーの透明度モード: "semi" (角が丸い半透明), "full" (完全に透明), "semifull" (動的な透明度)
	},
```

#### バナー設定の詳細説明

- **画像パス**: `/src` ディレクトリからの相対パス；`/` で始まる場合、`/public` ディレクトリからの相対パスです
- **カルーセル機能**: 画像配列の長さが1より大きい場合、自動的に有効になります
- **レスポンシブデザイン**: デスクトップとモバイルデバイスで異なる画像を使用できます
- **タイプライター効果**: サブタイトルは動的なタイプライター効果をサポートし、速度と一時停止時間を設定できます

### 目次 (TOC) 設定

```typescript
  toc: {
    enable: true, // 目次機能を有効にするかどうか
    depth: 3,     // TOCの深さ、1-6；1はH1見出しのみが表示されることを意味します
  },
```

- `enable`: 記事の目次機能を無効にするには `false` に設定します
- `depth`: 目次に表示される見出しのレベルの深さを制御します


### ナビゲーションバーの二次折りたたみ可能メニュー設定 (`navBarConfig`)

この設定は、ウェブサイトのナビゲーションバーにある二次折りたたみ可能メニューを制御するために使用されます。`src/config.ts` ファイルでこれを見つけて変更できます。

#### 主な設定項目:

*   **`links`**: `Array<Object>`
    *   ナビゲーションバー内の各リンクを定義する配列。各リンクオブジェクトは、プリセットリンク (`LinkPreset`) またはカスタムリンクオブジェクトのいずれかです。
    *   カスタムリンクオブジェクトは多階層メニューをサポートし、以下のプロパティを含みます。
        *   **`name`**: `string`
            *   メニュー項目の表示名。
        *   **`url`**: `string`
            *   メニュー項目がクリックされたときにジャンプするURL。
        *   **`children`**: `Array<Object>` (オプション)
            *   現在のメニュー項目のサブメニューを定義する配列。サブメニュー項目の構造はトップレベルメニュー項目の構造と似ており、さらにネストすることができます。
            *   各サブメニュー項目には、`name`、`url`、`external`などのプロパティを含めることもできます。
            *   **`external`**: `boolean` (オプション)
                *   `true` に設定されている場合、外部リンクであることを示し、新しいタブで開きます。

#### 二次折りたたみ可能メニューの作成方法:

二次折りたたみ可能メニューを作成するには、`children` プロパティを含むカスタムリンクオブジェクトを `navBarConfig.links` 配列に追加する必要があります。`children` 配列の各要素は、現在のメニュー項目のサブメニューになります。

**例:**

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Links", // 1階層目のメニュー名
			url: "/links/", // 1階層目のメニューのリンク (オプション; サブメニューのみの場合は空でも可)
			children: [
				{
					name: "GitHub", // 2階層目のメニュー名
					url: "https://github.com/matsuzaka-yuki/Mizuki", // 2階層目のメニューのリンク
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
			name: "My",
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