---
title: Live2D マスコット設定
createTime: 2025/08/17 17:21:41
permalink: /ja/config/pio/
---

::: tip ヒント
Live2D マスコットの設定ファイルは、`src/config.ts` ファイル内の `pioConfig` オブジェクトにあります。
:::
必要に応じて、Live2D マスコット機能を有効または無効にできます。
```typescript
// Pio Live2D マスコット設定
export const pioConfig: import("./types/config").PioConfig = {
	enable: true, // マスコットを有効にする
	models: ["/pio/models/pio/model.json"], // デフォルトのモデルパス
	position: "left", // デフォルトの位置は左
	width: 280, // デフォルトの幅
	height: 250, // デフォルトの高さ
	mode: "draggable", // デフォルトはドラッグ可能モード
	hiddenOnMobile: true, // デフォルトではモバイルデバイスで非表示
	dialog: {
		welcome: "Mizuki ウェブサイトへようこそ！", // ウェルカムメッセージ
		touch: [
			"何をしているの？",
			"もう一度触ったら、警察を呼ぶわよ！",
			"変態！",
			"こんな風にいじめないで！",
		], // タッチ時のプロンプト
		home: "ここをクリックしてホームページに戻る！", // ホームページへのプロンプト
		skin: ["新しい服を見たい？", "私の新しい服はとてもきれいよ〜"], // スキン変更のプロンプト
		close: "QWQ またね〜", // 閉じるプロンプト
		link: "https://github.com/matsuzaka-yuki/Mizuki", // 詳細リンク
	},
};
```