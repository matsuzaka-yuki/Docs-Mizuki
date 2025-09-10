---
title: Profile Configuration Instructions
createTime: 2025/08/17 17:21:41
permalink: /en/config/profile-config/
---

**Profile Configuration Instructions**

The profile configuration is located in the `profileConfig` object within the `src/config.ts` file, controlling the display of personal information in the website's sidebar.

## Configuration Item Details

```typescript
export const profileConfig: ProfileConfig = {
  avatar: "assets/images/avatar.jpg", // Avatar image path
  name: "Mizuki",                     // Username
  bio: "This is a description",       // Personal bio
  links: [                             // Social links
    {
      name: "Bilibli",                // Link name
      icon: "fa6-brands:bilibili",    // Icon
      url: "https://space.bilibili.com/701864046", // Link URL
    },
    // ... More links
  ],
};
```

### Avatar Settings

- `avatar`: Avatar image path, relative to the `/src` directory
  - If the path starts with `/`, it is relative to the `/public` directory
  - It is recommended to use a square image for best display results

### Basic Information

- `name`: Username displayed below the avatar
- `bio`: Personal bio, displayed below the username

### Social Links

Social links are displayed below the personal bio and support various icons:

```typescript
links: [
  {
    name: "Bilibli",              // Link name
    icon: "fa6-brands:bilibili",  // Icon name
    url: "https://space.bilibili.com/701864046", // Link URL
  },
  {
    name: "Gitee",                // Link name
    icon: "mdi:git",              // Icon name
    url: "https://gitee.com/matsuzakayuki", // Link URL
  },
  {
    name: "GitHub",               // Link name
    icon: "fa6-brands:github",    // Icon name
    url: "https://github.com/matsuzaka-yuki", // Link URL
  },
]
```

### Icon Selection

Mizuka uses the Iconify icon library, which supports various icon sets:

- `fa6-brands`: Font Awesome 6 Brand Icons
- `mdi`: Material Design Icons
- `fa6-solid`: Font Awesome 6 Solid Icons
- `fa6-regular`: Font Awesome 6 Regular Icons

### Modifying Profile

To modify your profile, edit the `profileConfig` object:

1. **Change Avatar**: Replace the image path of the `avatar` property
2. **Modify Username**: Change the `name` property
3. **Update Bio**: Modify the `bio` property
4. **Manage Social Links**: Edit the `links` array
   - Add new links: Add new link objects to the array
   - Delete links: Remove unwanted link objects from the array
   - Modify links: Change the properties of existing link objects