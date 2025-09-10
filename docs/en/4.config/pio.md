---
title: Live2D Mascot Configuration
createTime: 2025/08/17 17:21:41
permalink: /en/config/pio/
---

::: tip Tip
The Live2D mascot configuration file is located in the `pioConfig` object within the `src/config.ts` file.
:::
You can enable or disable the Live2D mascot feature as needed.
```typescript
// Pio Live2D Mascot Configuration
export const pioConfig: import("./types/config").PioConfig = {
	enable: true, // Enable mascot
	models: ["/pio/models/pio/model.json"], // Default model path
	position: "left", // Default position on the right
	width: 280, // Default width
	height: 250, // Default height
	mode: "draggable", // Default to draggable mode
	hiddenOnMobile: true, // Hidden on mobile devices by default
	dialog: {
		welcome: "Welcome to Mizuki website!", // Welcome message
		touch: [
			"What are you doing?",
			"If you touch me again, I'll call the police!",
			"HENTAI!",
			"You can't bully me like this!",
		], // Touch prompts
		home: "Click here to return to the homepage!", // Homepage prompt
		skin: ["Want to see my new clothes?", "My new clothes are so pretty~"], // Change skin prompt
		close: "QWQ See you next time~", // Close prompt
		link: "https://github.com/matsuzaka-yuki/Mizuki", // About link
	},
};
```