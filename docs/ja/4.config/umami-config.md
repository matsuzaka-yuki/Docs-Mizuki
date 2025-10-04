---
title: Umamiアナリティクス設定ガイド
createTime: 2025/08/21 12:36:33
permalink: /ja/config/umami-config/
---

> ⚠️ **注意：原旧バージョンの設定方法は廃止されました。チュートリアルおよび技術詳細については、[https://ycenzh.github.io/Astro/umami.html](https://ycenzh.github.io/Astro/umami.html) をご覧ください**

**ナビゲーションバー設定ガイド**

Umamiの設定項目は、`src/config.ts`ファイル内の`profileConfig`オブジェクトにあります。これらは、ソーシャル情報カードの下にウェブサイトの総訪問数を表示し、記事内に記事の訪問数を表示します。

## 設定項目の詳細

```typescript
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.jpg", // /srcディレクトリからの相対パス。'/'で始まる場合、/publicディレクトリからの相対パス
	name: "Mizuki",
	bio: "これは説明です",
	links: [
		{
			name: "Bilibli",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/701864046",
		},
		{
			name: "Gitee",
			icon: "mdi:git",
			url: "https://gitee.com/matsuzakayuki",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/matsuzaka-yuki",
		},
	],
	// Umamiアナリティクスセクション。Umamiの<script>をsrc/layouts/MainGridLayout.astroに挿入することを忘れないでください
	umami: {
		enable: true, // Umamiアナリティクスを有効にするかどうか
		shareId: "", // 共有URLの末尾の文字列を記入します。例: https://eu.umami.is/api/share/2dKQ5T0WrUn6AYtrの場合、2dKQ5T0WrUn6AYtrを記入します
		region: "", // Umamiには2つのリージョンがあります。必要に応じて選択してください。例: https://eu.umami.isの場合、euを記入します
	},
};
```

## Umamiを登録してウェブサイトを追加する

[Umami公式サイト](https://umami.is/)にアクセスしてアカウントを登録し、**アナリティクスノードリージョン**を選択します。次に、[Websites](https://cloud.umami.is/settings/websites)でウェブサイトを追加し、ウェブサイトの横にある**編集**をクリックして、上部にある**ShareURL**を見つけてスイッチをオンにすると、以下の内容が表示されます。

```
https://cloud.umami.is/share/a-string-of-alphanumeric-characters/your-website-domain
```

## ベストプラクティス

- **Umamiの有効化**: ウェブサイトのトラフィックを追跡するためにUmamiアナリティクスを有効にします。
- **正確なshareIdとregion**: Umamiの共有URLから正確な`shareId`と`region`を設定します。
- **スクリプトの挿入**: `src/layouts/MainGridLayout.astro`にUmamiのスクリプトを挿入することを忘れないでください。

## よくある質問

- **Q: Umamiアナリティクスが機能しない。**
  - A: `umami.enable`が`true`に設定されているか、`shareId`と`region`が正しく設定されているか確認してください。また、`src/layouts/MainGridLayout.astro`にUmamiのスクリプトが挿入されているか確認してください。
- **Q: 訪問数が表示されない。**
  - A: Umamiの設定が正しく、データが収集されているか確認してください。また、`profileConfig`オブジェクトが正しく設定されているか確認してください。