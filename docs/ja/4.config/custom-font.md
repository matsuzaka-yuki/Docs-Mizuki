---
title: カスタムフォント設定
createTime: 2025/09/16 10:00:00
permalink: /ja/config/custom-font/
---

# Mizuki テーマフォントカスタマイズチュートリアル

このチュートリアルでは、Mizuki テーマでカスタムフォントを追加・設定する方法をご案内します。

## 事前準備

始める前に、以下をご用意ください：
- 追加するフォントファイル（`.ttf`、`.woff`、`.woff2` などに対応）
- フォント名と基本情報の把握
- 基本的なファイル編集スキル

## ステップ1：フォントファイルの追加

1. フォントファイルをプロジェクトのフォントディレクトリにコピーします：
   ```
   public/assets/font/
   ```

2. フォントファイル名は分かりやすく命名してください。例：
   - `MyCustomFont.ttf`
   - `SpecialFont-Bold.woff2`

## ステップ2：フォント定義の設定

### 2.1 CSS でフォントを定義

`src/styles/main.css` ファイルを開き、既存の `@font-face` 定義の後にフォントを追加します：

```css
/* カスタムフォントをインポート */
@font-face {
    font-family: 'YourFontName';
    src: url('/assets/font/YourFontFile.ttf') format('truetype');
    font-weight: normal;
    font-display: swap;
}
```

**パラメータ説明：**
- `font-family`: CSS で参照するフォント名
- `src`: フォントファイルのパス
- `font-weight`: フォントの太さ（normal、bold、100-900）
- `font-display`: フォント読み込み戦略、`swap` を推奨

### 2.2 フォント適用クラスの作成

同じファイルに、フォント適用クラスを追加します：

```css
/* カスタムフォントが有効な場合にグローバルフォントとして適用 */
.your-font-enabled {
    font-family: 'YourFontName', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

**注意：** クラス名は小文字とハイフンを使用することを推奨します。例：`custom-font-enabled`

## ステップ3：設定ファイルの更新

### 3.1 メイン設定ファイルの修正

`src/config.ts` ファイルを開き、`font` 設定セクションにフォントオプションを追加します：

```typescript
// フォント設定
font: {
    zenMaruGothic: {
        enable: true, // グローバル丸ゴシックを有効化
    },
    yourCustomFont: {
        enable: false, // カスタムフォントを有効化
    },
},
```

**設定説明：**
- キー名はキャメルケースを使用
- `enable` プロパティでフォントの有効/無効を制御
- 複数のフォントを同時に有効化可能

### 3.2 型定義の更新

`src/types/config.ts` ファイルを開き、`SiteConfig` 型の `font` セクションに型定義を追加します：

```typescript
font: {
    zenMaruGothic: {
        enable: boolean; // グローバル丸ゴシックを有効化
    };
    yourCustomFont: {
        enable: boolean; // カスタムフォントを有効化
    };
};
```

## ステップ4：レイアウトへのフォント適用

`src/layouts/Layout.astro` ファイルを開き、`<body>` タグを見つけて、`class:list` にフォントクラスを追加します：

```astro
<body class="min-h-screen" class:list={[
    {
        "lg:is-home": isHomePage, 
        "enable-banner": enableBanner,
        "zen-maru-gothic-enabled": siteConfig.font.zenMaruGothic.enable,
        "your-font-enabled": siteConfig.font.yourCustomFont.enable
    }
]}
    data-overlayscrollbars-initialize
>
```

## ステップ5：テストと使用

1. **フォントの有効化**：`src/config.ts` でフォントの `enable` を `true` に設定

2. **開発サーバーの再起動**：
   ```bash
   npm run dev
   ```

3. **効果の確認**：ブラウザでフォントが正しく適用されているか確認

## 高度な設定

### 複数フォントの優先順位

複数のフォントを同時に有効化した場合、CSS で後に定義されたフォントクラスが優先されます。CSS でのクラスの順序を調整することで優先順位を制御できます。

### フォントフォールバック

フォント定義にシステムフォントをフォールバックとして含めることを推奨します：

```css
.your-font-enabled {
    font-family: 'YourFontName', 'Helvetica Neue', Arial, sans-serif;
}
```

### フォントサブセット

大きなフォントファイルの場合、フォントサブセットを使用してファイルサイズを削減することを検討してください：

```css
@font-face {
    font-family: 'YourFontName';
    src: url('/assets/font/YourFontFile.woff2') format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153;
}
```

## トラブルシューティング

### フォントが表示されない
1. フォントファイルのパスが正しいか確認
2. フォントファイル形式がサポートされているか確認
3. ブラウザの開発者ツールでネットワークリクエストを確認
4. CSS 構文が正しいか検証

### フォント読み込みが遅い
1. `font-display: swap` を使用して読み込み体験を最適化
2. WOFF2 形式を使用してファイルサイズを削減
3. フォントプリロードを有効化

### 設定が反映されない
1. すべてのファイルが保存されているか確認
2. 開発サーバーを再起動
3. ブラウザキャッシュをクリア
4. 設定ファイルの構文を確認

## 例：源ノ角ゴシックの追加

源ノ角ゴシックフォントを追加する完全な例：

1. **フォントファイルの追加**：`SourceHanSans.ttf` を `public/assets/font/` に配置

2. **CSS 定義**：
```css
@font-face {
    font-family: 'SourceHanSans';
    src: url('/assets/font/SourceHanSans.ttf') format('truetype');
    font-weight: normal;
    font-display: swap;
}

.source-han-sans-enabled {
    font-family: 'SourceHanSans', system-ui, sans-serif;
}
```

3. **設定ファイル**：
```typescript
font: {
    zenMaruGothic: {
        enable: true,
    },
    sourceHanSans: {
        enable: false,
    },
},
```

4. **型定義**：
```typescript
font: {
    zenMaruGothic: {
        enable: boolean;
    };
    sourceHanSans: {
        enable: boolean;
    };
};
```

5. **レイアウト適用**：
```astro
"source-han-sans-enabled": siteConfig.font.sourceHanSans.enable
```

## まとめ

これらのステップに従うことで、Mizuki テーマでカスタムフォントを正常に追加・使用できます。設定の一貫性を保ち、各修正後にテストを行って期待通りの効果が得られることを確認してください。

問題が発生した場合は、ブラウザの開発者ツールを確認してより詳細なデバッグ情報を取得してください。