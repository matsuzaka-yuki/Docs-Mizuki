---
title: Navbar Configuration Instructions
createTime: 2025/08/17 17:21:41
permalink: /en/config/navbar-config/
---

**Navbar Configuration Instructions**

The navbar configuration is located in the `navBarConfig` object within the `src/config.ts` file, controlling the display content and links of the website's top navigation bar.

## Configuration Item Details

```typescript
export const navBarConfig: NavBarConfig = {
  links: [
    LinkPreset.Home,      // Home page link
    LinkPreset.Archive,   // Archive page link
    LinkPreset.About,     // About page link
    LinkPreset.Friends,   // Friends page link
    LinkPreset.Anime,     // Anime page link
    LinkPreset.Diary,     // Diary page link
    {
      name: "GitHub",    // Custom link name
      url: "https://github.com/matsuzaka-yuki",
      external: true,     // Whether it's an external link
    },
  ],
};
```

### Preset Links

Mizuka provides multiple preset links that can be used directly:

- `LinkPreset.Home`: Home page link
- `LinkPreset.Archive`: Archive page link
- `LinkPreset.About`: About page link
- `LinkPreset.Friends`: Friends page link
- `LinkPreset.Anime`: Anime page link
- `LinkPreset.Diary`: Diary page link

### Custom Links

You can add custom links to the navigation bar:

- `name`: Text displayed for the link
- `url`: Link address
- `external`: Whether it's an external link; set to `true` to open in a new tab

### Modifying the Navbar

To modify navbar links, edit the `navBarConfig.links` array:

1. **Add Link**: Add new preset links or custom link objects to the array
2. **Delete Link**: Remove unwanted links from the array
3. **Reorder**: Adjust the order of links in the array

For example, to add a new Twitter link:

```typescript
{
  links: [
    LinkPreset.Home,
    LinkPreset.Archive,
    // ... Other links
    {
      name: "Twitter",
      url: "https://twitter.com/yourusername",
      external: true,
    },
  ],
}
```