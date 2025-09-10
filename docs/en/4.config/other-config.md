---
title: Other Configuration Instructions
createTime: 2025/08/17 17:21:41
permalink: /en/config/other-config/
---

**Other Configuration Instructions**

In addition to site, navbar, and profile configurations, Mizuka also provides several other configuration options, including licenses, code blocks, and comment systems.

## License Configuration

The license configuration is located in the `licenseConfig` object within the `src/config.ts` file, controlling the display of the license at the bottom of articles.

```typescript
export const licenseConfig: LicenseConfig = {
  enable: true,                   // Whether to enable license display
  name: "CC BY-NC-SA 4.0",      // License name
  url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // License link
};
```

- `enable`: Set to `false` to hide license information at the bottom of articles
- `name`: Displayed license name
- `url`: Link to the license details page

## Code Block Configuration

The code block configuration is located in the `expressiveCodeConfig` object within the `src/config.ts` file, controlling the display style of code blocks.

```typescript
export const expressiveCodeConfig: ExpressiveCodeConfig = {
  // Note: Some styles (e.g., background color) have been overridden, please see astro.config.mjs file
  // Please choose a dark theme, as this blog theme currently only supports dark backgrounds
  theme: "github-dark",  // Code block theme
};
```

- `theme`: Syntax highlighting theme for code blocks
  - It is recommended to use a dark theme, as the Mizuka theme currently only supports dark backgrounds
  - Available themes include: `github-dark`, `dracula`, `one-dark`, etc.

## Comment System Configuration

The comment system configuration is located in the `commentConfig` object within the `src/config.ts` file, controlling the comment system at the bottom of articles.

```typescript
export const commentConfig: CommentConfig = {
  enable: false,  // Whether to enable comment function
  twikoo: {
    envId: "https://app.twikoo.js.org", // Twikoo environment ID
  },
};
```

- `enable`: Set to `true` to enable the comment function
- `twikoo.envId`: Environment ID for the Twikoo comment system
  - You need to create an environment on [Twikoo](https://twikoo.js.org/) and get the environment ID first

### Enabling the Comment System

To enable the comment system, follow these steps:

1. Create an environment on [Twikoo](https://twikoo.js.org/) and get the environment ID
2. Set `enable` to `true`
3. Update `twikoo.envId` with your environment ID

```typescript
export const commentConfig: CommentConfig = {
  enable: true,
  twikoo: {
    envId: "https://your-env-id.vercel.app", // Replace with your environment ID
  },
};
```

## Announcement Feature Configuration Instructions

```typescript
export const announcementConfig: AnnouncementConfig = {
	enable: true, // Enable announcement feature
	title: "Announcement", // Announcement title
	content: "Welcome to my blog! This is a sample announcement.", // Announcement content
	closable: true, // Allow users to close the announcement
	link: {
		enable: true, // Show link button
		text: "Learn More", // Link text
		url: "/about/", // Link URL
		external: true, // Whether to show external link button
	},
};

```

- `enable`: Set to `false` to hide the announcement
- `title`: Announcement title
- `content`: Announcement content
- `closable`: Set to `true` to allow users to close the announcement
- `link.enable`: Set to `true` to show the link button
- `link.text`: Link button text
- `link.url`: Link button URL
- `link.external`: Set to `true` to show the external link marker button


## Floating Music Player Configuration Instructions
1. First, set `enable` to `true` in the configuration file
```typescript
export const musicPlayerConfig: MusicPlayerConfig = {
	enable: true, // Enable music player feature
};
```

2. Fill in the configuration in `src/components/widget/MusicPlayer.svelte` to select the playback solution

Music player mode, optional "local" (calls local music library configuration) or "meting" (calls meting api configuration), gets from local configuration or uses default value "meting"

Setting this to play music using Meting API, you need to complete the parameters yourself
```typescript
let mode = musicPlayerConfig.mode ?? "meting";
```
Local playlist configuration, when local playlist is selected, local playlist needs to be configured
```typescript

const localPlaylist = [
	{
		id: 1,
		title: "ひとり上�?,
		artist: "Kaya",
		cover: "assets/music/cover/hitori.jpg",
		url: "assets/music/url/hitori.mp3",
		duration: 240,
	},
	{
		id: 2,
		title: "ハーピィハーピィ",
		artist: "Kaya",
		cover: "assets/music/cover/harp.jpg",
		url: "assets/music/url/harp.mp3",
		duration: 240,
	},]
```
The path is relative to the `public` directory, this needs attention


## Sidebar Layout Configuration (`sidebarLayoutConfig`)

This configuration controls the display, sorting, animation, and responsive behavior of the website's sidebar. You can find and modify it in the `src/config.ts` file.

### Main Configuration Items:

*   **`enable`**: `boolean`
    *   Whether to enable the sidebar feature. Set to `true` to enable, `false` to disable.
    *   Default value: `true`

*   **`position`**: `"left" | "right"`
    *   The position of the sidebar on the page. Optional values: `"left"` or `"right"`.
    *   Default value: `"left"`

*   **`components`**: `Array<Object>`
    *   An array defining the components included in the sidebar and their configurations. Each component object contains the following properties:
        *   **`type`**: `string`
            *   Component type, e.g., `"profile"` (user profile), `"announcement"` (announcement), `"categories"` (categories), `"tags"` (tags).
        *   **`enable`**: `boolean`
            *   Whether to enable this component. Set to `true` to enable, `false` to disable.
        *   **`order`**: `number`
            *   The display order of the component. Smaller numbers appear earlier in the sidebar.
        *   **`position`**: `"top" | "sticky"`
            *   The positioning method of the component in the sidebar. Optional values:
                *   `"top"`: Fixed at the top of the sidebar, does not scroll with the scrollbar.
                *   `"sticky"`: Sticky positioning, remains visible when scrolling.
        *   **`class`**: `string`
            *   CSS class name applied to the component, can be used for custom styles or animations.
        *   **`animationDelay`**: `number`
            *   The animation delay time (milliseconds) for the component. Used to stagger the animation effects of different components.
        *   **`responsive`**: `Object` (optional)
            *   Responsive configuration for specific components. For example, `categories` and `tags` components can configure `collapseThreshold`:
                *   **`collapseThreshold`**: `number`
                    *   Collapse threshold. When the number of items in the component exceeds this value, the component content will automatically collapse.

### Default Animation Configuration (`defaultAnimation`):

*   **`enable`**: `boolean`
    *   Whether to enable the default animation effect for sidebar components.
    *   Default value: `true`

*   **`baseDelay`**: `number`
    *   Base animation delay time (milliseconds).
    *   Default value: `0`

*   **`increment`**: `number`
    *   The animation delay time (milliseconds) incrementally added to each component. For example, the first component delays `baseDelay`, the second component delays `baseDelay + increment`, and so on.
    *   Default value: `50`

### Responsive Layout Configuration (`responsive`):

*   **`breakpoints`**: `Object`
    *   Defines screen width breakpoints (pixel values) for different devices:
        *   **`mobile`**: Mobile device breakpoint (e.g., `768`).
        *   **`tablet`**: Tablet device breakpoint (e.g., `1024`).
        *   **`desktop`**: Desktop device breakpoint (e.g., `1280`).

*   **`layout`**: `Object`
    *   Defines different devices screen width breakpoints (pixel values) for different devices:
        *   **`mobile`**: Mobile device breakpoint (e.g., `768`).
        *   **`tablet`**: Tablet device breakpoint (e.g., `1024`).
        *   **`desktop`**: Desktop device breakpoint (e.g., `1280`).

### Example:

```typescript:/c:/Users/Administrator/Desktop/mizuki/src/config.ts
export const sidebarLayoutConfig: SidebarLayoutConfig = {
	enable: true,
	position: "left",
	components: [
		{
			type: "profile",
			enable: true,
			order: 1,
			position: "top",
			class: "onload-animation",
			animationDelay: 0,
		},
		{
			type: "announcement",
			enable: true,
			order: 2,
			position: "top",
			class: "onload-animation",
			animationDelay: 50,
		},
		{
			type: "categories",
			enable: true,
			order: 3,
			position: "sticky",
			class: "onload-animation",
			animationDelay: 150,
			responsive: {
				collapseThreshold: 5,
			},
		},
		{
			type: "tags",
			enable: true,
			order: 4,
			position: "sticky",
			class: "onload-animation",
			animationDelay: 200,
			responsive: {
				collapseThreshold: 20,
			},
		},
	],

	defaultAnimation: {
		enable: true,
		baseDelay: 0,
		increment: 50,
	},

	responsive: {
		breakpoints: {
			mobile: 768,
			tablet: 1024,
			desktop: 1280,
		},
		layout: {
			mobile: "sidebar",
			tablet: "sidebar",
			desktop: "sidebar",
		},
	},
};
```


### Sakura Effect Configuration

```typescript
export const sakuraConfig: SakuraConfig = {
	enable: true, // Sakura effect is disabled by default
	sakuraNum: 21, // Number of sakura petals
	limitTimes: 2, // Limit for sakura petals going out of bounds; set to -1 for infinite loop
	size: {
		min: 0.5, // Minimum size multiplier of sakura petals
		max: 1.1, // Maximum size multiplier of sakura petals
	},
	speed: {
		horizontal: {
			min: -1.7, // Minimum horizontal movement speed
			max: -1.2, // Maximum horizontal movement speed
		},
		vertical: {
			min: 1.5, // Minimum vertical movement speed
			max: 2.2, // Maximum vertical movement speed
		},
		rotation: 0.03, // Rotation speed
	},
	zIndex: 100, // Z-index to ensure sakura petals display at the appropriate layer
```

We can configure the sakura effect in the `sakuraConfig` object.