---
title: Site Configuration Guide
createTime: 2025/08/17 17:21:41
permalink: /en/config/site-config/
---

**Site Configuration Guide**

Site configuration is located in the `siteConfig` object within the `src/config.ts` file, controlling the basic information and global settings of the blog.

## Configuration Items Explained

### Basic Information

```typescript
// Define site language
const SITE_LANG = "zh_CN"; // Language code, e.g.: 'en', 'zh_CN', 'ja', etc.
// Define site timezone
const SITE_TIMEZONE = 8; // Set your website timezone from -12 to 12, e.g., Beijing Time is UTC+8

export const siteConfig: SiteConfig = {
  title: "Mizuki",                    // Website title
  subtitle: "One demo website",       // Website subtitle
  timeZone: SITE_TIMEZONE,           // No need to configure manually, automatically set based on SITE_TIMEZONE
  lang: SITE_LANG,                    // No need to configure manually, automatically set based on SITE_LANG
}
```

- `title`: The main title of the website, displayed in browser tabs and page headers
- `subtitle`: The subtitle of the website, typically displayed below the homepage banner
- `lang`: The default language of the website, affecting date formats, translations, and other functions

### Theme Colors

```typescript
  themeColor: {
    hue: 210,     // Hue value of the theme color, range 0-360
    fixed: false, // Whether to hide the visitor's theme color selector
  },
```

- `hue`: Hue value of the theme color, can be any value between 0-360
  - Red: 0
  - Cyan: 200
  - Blue-green: 250
  - Pink: 345
- `fixed`: When set to `true`, visitors will not be able to change the theme color

### Banner Settings

Banner settings control the display of the banner at the top of the homepage:

```typescript
  banner: {
    enable: true,  // Whether to enable the banner
    src: {         // Banner image paths
      desktop: [   // Desktop image array
        "assets/desktop-banner/1.webp",
        "assets/desktop-banner/2.webp",
        // Supports multiple images, automatically enables carousel
      ],
      mobile: [    // Mobile image array
        "assets/mobile-banner/1.webp",
        "assets/mobile-banner/2.webp",
        // Mobile-specific images
      ],
    },
    position: "center", // Image alignment, supports 'top', 'center', 'bottom'
    
    carousel: {
      enable: true,    // Enable carousel functionality (when multiple images exist)
      interval: 1,     // Carousel interval time (seconds)
    },
    
    homeText: {
      enable: true,    // Display custom text on homepage
      title: "Mizuki", // Main title on homepage banner
      subtitle: [      // Subtitle array, supports multiple texts
        "One demo website",
        "Carousel Text1",
        "Carousel Text2",
      ],
      typewriter: {
        enable: true,     // Enable typewriter effect
        speed: 100,       // Typing speed (milliseconds)
        deleteSpeed: 50,  // Deletion speed (milliseconds)
        pauseTime: 2000,  // Pause time after full display (milliseconds)
      },
    },
    
    credit: {
      enable: false,    // Display banner image source text
      text: "Describe", // Source text
      url: "",          // Optional: Link to original work or author page
    },
  },

  navbar: {
    transparentMode: "semifull", // Navbar transparency mode: "semi" semi-transparent with rounded corners, "full" fully transparent, "semifull" dynamic transparency
  },
```

#### Banner Configuration Details

- **Image Paths**: Relative to the `/src` directory; if starting with `/`, then relative to the `/public` directory
- **Carousel Functionality**: Automatically enables when the image array length is greater than 1
- **Responsive Design**: Different images can be used for desktop and mobile
- **Typewriter Effect**: Subtitles support dynamic typewriter effect with configurable speed and pause time

### Table of Contents Settings

```typescript
  toc: {
    enable: true, // Whether to enable table of contents functionality
    depth: 3,     // TOC depth, 1-6, 1 means only display h1 headings
  },
```

- `enable`: Set to `false` to disable article table of contents functionality
- `depth`: Controls the heading hierarchy depth displayed in the TOC

### Navigation Bar Secondary Collapsible Menu Configuration (`navBarConfig`)

This configuration is used to control the secondary collapsible menu in the website navigation bar. You can find and modify it in the `src/config.ts` file.

#### Main Configuration Items:

*   **`links`**: `Array<Object>`
    *   An array defining the various links in the navigation bar. Each link object can be a preset link (`LinkPreset`) or a custom link object.
    *   Custom link objects support multi-level menus and contain the following attributes:
        *   **`name`**: `string`
            *   The display name of the menu item.
        *   **`url`**: `string`
            *   The URL to navigate to when the menu item is clicked.
        *   **`children`**: `Array<Object>` (Optional)
            *   An array defining the submenu of the current menu item. The structure of submenu items is similar to top-level menu items and can be nested further.
            *   Each submenu item can also contain attributes like `name`, `url`, `external`.
            *   **`external`**: `boolean` (Optional)
                *   If set to `true`, indicates this is an external link and will open in a new tab.

#### How to Create a Secondary Collapsible Menu:

To create a secondary collapsible menu, you need to add a custom link object containing a `children` property to the `navBarConfig.links` array. Each element in the `children` array will become a submenu item of that menu item.

**Example:**

```typescript
export const navBarConfig: NavBarConfig = {
	links: [
		LinkPreset.Home,
		LinkPreset.Archive,
		{
			name: "Links", // First-level menu name
			url: "/links/", // First-level menu link (Optional, can be empty if only submenus exist)
			children: [
				{
					name: "GitHub", // Second-level menu name
					url: "https://github.com/matsuzaka-yuki/Mizuki", // Second-level menu link
					external: true, // External link
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

In the example above:

*   `Links` and `My` are first-level menu items.
*   The `Links` menu contains three second-level submenus: `GitHub`, `Bilibili`, `Gitee`, all of which are external links.
*   The `My` menu contains four second-level submenus: `About`, `Friends`, `Anime`, `Diary`, which use preset links (`LinkPreset`).

### Website Domain Configuration

You need to configure the website domain in the `astro.config.mjs` file.

```typescript
export default defineConfig({
	site: "https://mizuki.mysqil.com/",
})
```

This only specifies the website's URL. The site property is used by Astro for various purposes, such as generating correct URLs in website pages and RSS feeds.

### Display Social Media Share Images (OG)

You need to configure the OG enable setting in the `src/config.ts` file.

```typescript
generateOgImages: true, // Enable OpenGraph image generation functionality
```
