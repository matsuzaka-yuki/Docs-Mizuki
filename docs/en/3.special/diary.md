---
title: Diary Page
createTime: 2025/08/17 17:21:41
permalink: /en/special/diary/
---

**Diary Page Modification Tutorial**

Mizuka theme provides a built-in diary page for sharing life moments, similar to the short post function of social media.

## Diary Page Structure

The diary page is located in the `src/pages/diary.astro` file. The core of the page is a diary data array:

```typescript
const moments = [
  {
    id: 1,
    content: "Share some nice/beautiful/gorgeous wallpapersã€?,
    date: "2025-01-15T10:30:00Z",
    images: ["assets/images/1.webp", "assets/images/banner.webp"],
  },
  // More diary entries...
];
```

## Adding New Diary Entries

To add new diary entries, add new objects to the `moments` array:

1. Copy an existing diary object as a template
2. Modify the `id` to a unique value (incrementing number)
3. Update `content` with your diary content
4. Set `date` to a date and time in ISO 8601 format
5. If there are images, add image paths to the `images` array

## Diary Property Descriptions

Each diary object contains the following properties:

- `id`: Unique identifier (number)
- `content`: Diary content (text)
- `date`: Publication date (ISO 8601 format)
- `images`: Array of image paths (optional, relative to public directory)

## Diary Images

To add images to diary entries:

1. Place image files in the `public/assets/images/` directory
2. Add the image filename to the `images` array of the diary object

It is recommended to use WebP format images for best performance.