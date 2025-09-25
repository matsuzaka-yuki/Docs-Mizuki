---
title: アニメページ
createTime: 2025/09/01 17:21:41
permalink: /ja/special/anime/
---

**アニメページ変更チュートリアル (ローカルデータソース)**

Mizukaテーマには、組み込みのアニメページが用意されており、表示されるアニメリストを簡単にカスタマイズできます。

## アニメページの構造

アニメページは`src/data/anime.ts`ファイルにあります。ページの核となるのはアニメデータ配列です。

```typescript
const localAnimeList: AnimeItem[] = [
  {
		title: "リコリス・リコイル",
		status: "completed",
		rating: 9.8,
		cover: "assets/anime/lkls.webp",
		description: "少女たちのガンアクション、欠点はあるが隠せない魅力",
		episodes: "12話",
		year: "2022",
		genre: ["アクション", "日常系"],
		studio: "A-1 Pictures",
		link: "https://www.bilibili.com/bangumi/media/md28338623",
		progress: 12,
		totalEpisodes: 12,
		startDate: "2022-07",
		endDate: "2022-09",
	},
  // 他のアニメ...
];
```

## アニメリストの変更

アニメ情報の追加、削除、変更を行うには、`AnimeItem`配列を直接編集します。

1. **アニメの追加**: 既存のアニメオブジェクトをコピーし、そのプロパティを変更します。
2. **アニメ情報の変更**: 既存のアニメオブジェクトのプロパティ値を直接変更します。
3. **アニメの削除**: 対応するアニメオブジェクトを配列から削除します。

## アニメプロパティの説明

各アニメオブジェクトには以下のプロパティが含まれています。

- `title`: アニメのタイトル - アニメの公式名または翻訳名
- `status`: 視聴状況（"watching"または"completed"） - 現在の視聴進捗状況
- `rating`: 評価（0-10） - アニメの評価スコア
- `cover`: カバー画像パス - アニメのカバー画像への相対パス（publicディレクトリ相対）
- `description`: 説明 - アニメの簡単な説明またはプロット要約
- `episodes`: エピソード数 - アニメの総エピソード数
- `year`: 放送年 - アニメの放送年
- `genre`: ジャンルタグ - アニメのジャンルタグ配列、例: ["アクション", "日常系"]
- `studio`: 制作会社 - アニメを制作したスタジオ
- `link`: 関連リンク - アニメの公式ウェブサイトまたはストリーミングプラットフォームへのリンク（Bilibili等）
- `progress`: 視聴進捗 - 現在視聴しているエピソード数
- `totalEpisodes`: 総エピソード数 - アニメの総エピソード数
- `startDate`: 放送開始日 - アニメの放送開始日（形式: YYYY-MM）
- `endDate`: 放送終了日 - アニメの放送終了日（形式: YYYY-MM）

## アニメ画像

アニメにカバー画像を追加するには：

1. 画像ファイルを`public/assets/anime/`ディレクトリに配置します
2. アニメオブジェクトの`cover`プロパティに画像ファイル名を指定します

最高のパフォーマンスを得るために、画像形式をWebPにしてください。


**アニメページ変更チュートリアル (Bangumiデータソース)**

## Bangumiモードの有効化

スイッチは`src/config.ts`ファイルにあります。
```typescript
bangumi: {
		userId: "your-bangumi-id", // ここにBangumiユーザーIDを設定してください。テスト用に"sai"を設定できます
	},
	anime: {
		mode: "bangumi", // アニメページモード："bangumi"はBangumi APIを使用、"local"はローカル設定を使用
	},
```

1. 括弧内の"your-bangumi-id"をBangumiユーザーIDに置き換えます。
2. modeを"bangumi"に設定すると、Bangumi APIからアニメデータを取得できます。
