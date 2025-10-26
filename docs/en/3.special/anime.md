---
title: Anime Page
createTime: 2025/09/01 17:21:41
permalink: /en/special/anime/
---

**Anime Page Modification Tutorial (Local Data Source)**

The Mizuki theme provides a built-in anime page, allowing you to easily customize the displayed anime list.

## Anime Page Structure

The anime page is located in the `src/data/anime.ts` file. The core of the page is an anime data array:

```typescript
const localAnimeList: AnimeItem[] = [
  {
		title: "Lycoris Recoil",
		status: "completed",
		rating: 9.8,
		cover: "assets/anime/lkls.webp",
		description: "Girl gunfight, flawed but not hidden",
		episodes: "12 episodes",
		year: "2022",
		genre: ["Action", "Slice of Life"],
		studio: "A-1 Pictures",
		link: "https://www.bilibili.com/bangumi/media/md28338623",
		progress: 12,
		totalEpisodes: 12,
		startDate: "2022-07",
		endDate: "2022-09",
	},
  // More anime...
];
```

## Modifying the Anime List

To add, delete, or modify anime information, directly edit the `AnimeItem` array:

1. **Add Anime**: Copy an existing anime object and modify its properties
2. **Modify Anime Information**: Directly modify the property values of an existing anime object
3. **Delete Anime**: Remove the corresponding anime object from the array

## Anime Property Descriptions

Each anime object contains the following properties:

- `title`: Anime title - The official name or translated name of the anime
- `status`: Viewing status ("watching" or "completed") - Current viewing progress status
- `rating`: Rating (0-10) - Personal rating for the anime
- `cover`: Cover image path (relative to public directory) - Storage path of the anime cover image
- `description`: Anime description - A brief review or plot summary of the anime
- `episodes`: Episode information - Description of the total number of episodes of the anime
- `year`: Broadcast year - The year the anime was first broadcast
- `genre`: Genre tags - An array of genre tags for the anime, such as ["Action", "Slice of Life"]
- `studio`: Production company - The animation studio responsible for producing the anime
- `link`: Anime link (can point to Bilibili or other platforms) - Link to watch or learn more
- `progress`: Viewing progress - Number of episodes currently watched
- `totalEpisodes`: Total episodes - The total number of episodes of the anime
- `startDate`: Start broadcast date - The start broadcast time of the anime (format: YYYY-MM)
- `endDate`: End broadcast date - The end broadcast time of the anime (format: YYYY-MM)

## Anime Images

To add cover images for anime:

1. Place image files in the `public/assets/anime/` directory
2. Specify the image filename in the `cover` property of the anime object

Ensure image format is WebP for best performance.




## Enable Bangumi Mode

**Anime Page Modification Tutorial (Bangumi Data Source)**

The switch is located in the `src/config.ts` file.
```typescript
bangumi: {
		userId: "your-bangumi-id", // Set your Bangumi user ID here, you can set it to "sai" for testing
	},
	anime: {
		mode: "bangumi", // Anime page mode: "bangumi" uses Bangumi API, "local" uses local configuration
	},
```

1. Replace "your-bangumi-id" in the brackets with your Bangumi user ID.
2. Configure mode as "bangumi" to fetch anime data from the Bangumi API.
