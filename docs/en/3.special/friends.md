---
title: Friends Page
createTime: 2025/08/17 17:21:41
permalink: /en/special/friends/
---

**Friends Link Page**

The friends link page is used to display links to other websites or friends' blogs related to your blog. Mizuki provides a beautiful and feature-rich friends link page.

## Page Location

The friends link page is located at `src/pages/friends.astro`, which is an Astro component file.

## Configuring Friends Links

### 1. Editing Friends Link Data

In the `src/pages/friends.astro` file, you can find the `items` array, where all friends links are defined:

```javascript
const items = [
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?s=48&v=4",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
	// Add more friends links...
];
```

### 2. Friends Link Field Descriptions

Each friends link object contains the following fields:

- **title**: Name of the website or blog
- **imgurl**: URL of the website's avatar or logo
- **desc**: Short description of the website
- **siteurl**: URL of the website
- **tags**: Array of tags for categorization (optional)

### 3. Adding New Friends Links

To add new friends links, simply add new objects to the `items` array:

```javascript
const items = [
	{
		title: "Astro",
		imgurl: "https://avatars.githubusercontent.com/u/44914786?s=48&v=4",
		desc: "The web framework for content-driven websites. ⭐️ Star to support our work!",
		siteurl: "https://github.com/withastro/astro",
		tags: ["Framework"],
	},
	{
		title: "Your Friend's Blog",
		imgurl: "https://example.com/avatar.jpg",
		desc: "This is my friend's personal blog, sharing technology and life",
		siteurl: "https://friend-blog.com",
		tags: ["Personal Blog", "Technology"],
	},
];
```

## Page Features

### 1. Random Sorting

Friends links are randomly sorted each time the page loads, ensuring all links have equal display opportunities:

```javascript
function shuffleArray(array) {
	const newArray = [...array];
	for (let i = newArray.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[newArray[i], newArray[j]] = [newArray[j], newArray[i]];
	}
	return newArray;
}
```

### 2. Responsive Design

The friends link page adopts a responsive design, displaying well on different devices:
- Desktop: 2-column grid layout
- Mobile: 1-column layout

### 3. Tag Display

Each friends link can display relevant tags to help visitors understand the website type. If there are no tags, "No Tags" will be displayed.

## Custom Styles

The friends link page uses Tailwind CSS for styling. You can modify style classes as needed:

- Card container: `flex flex-nowrap items-stretch h-28 gap-4 rounded-[var(--radius-large)]`
- Avatar container: `w-28 h-28 flex-shrink-0 rounded-lg overflow-hidden`
- Title style: `font-bold transition text-lg text-neutral-900 dark:text-neutral-100`

## Adding Page Content

In addition to the friends link list, you can also add extra Markdown content to the page. This content is defined in the `src/content/spec/friends.md` file and will be displayed below the friends link list.

## Navigation Bar Configuration

To display friends links in the navigation bar, ensure that `LinkPreset.Friends` is included in `src/config.ts`'s `navBarConfig`:

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		LinkPreset.About,
		LinkPreset.Friends, // Friends Links
		// ... Other links
	],
};
```

## Notes

1. **Image Optimization**: It is recommended to use avatar images of appropriate size (recommended 48x48 or 64x64 pixels)
2. **Description Length**: Keep descriptions concise to avoid overly long text affecting page layout
3. **Link Validity**: Regularly check the validity of friends links and remove invalid links
4. **Tag Consistency**: Use consistent tag naming for easy categorization and management

With the above configuration, you can create a beautiful and fully functional friends link page!