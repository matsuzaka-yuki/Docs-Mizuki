---
title: Umami Analytics Configuration Guide
createTime: 2025/10/20 12:36:33
permalink: /en/config/umami-config/
---

# Umami Analytics Configuration Tutorial (Version 3)
Umami is an open-source, privacy-focused website analytics tool that can replace Google Analytics. This tutorial will guide you through configuring the Umami analytics function in the Mizuki theme.  
Note: This tutorial is applicable to Mizuki version 5.1.0 or later.

## What is Umami?
Umami is an open-source website analytics tool with the following features:
- Open-source and privacy-focused
- Lightweight, without impacting website performance
- Provides detailed visitor analytics data
- Supports self-hosted services or cloud-based services

## Configuration Steps

### 1. Register and Create an Umami Account
First, you need to register for an Umami account:
1. Visit the [Umami official website](https://umami.is/) or use a self-hosted Umami service (Version 3 is not open-source yet).
2. Register an account and log in.
3. Create a new website and obtain the Website ID.

### 2. Obtain Required Information
In the Umami dashboard, you need to get the following information:
- **API Key**
- **Website ID**
- **Tracking Script URL**

### 3. Configure Mizuki
Open the `src/config.ts` file and find the `umamiConfig` configuration item:

```typescript
export const umamiConfig = {
  enabled: false, // Whether to enable Umami analytics
  apiKey: "api_XXXXXXXXXX", // Your API Key
  baseUrl: "https://api.umami.is", // Umami Cloud API address
  scripts: `
<script defer src="XXXX.XXX" data-website-id="ABCD1234"></script>
  `.trim(), // Fill in the Script you want to insert here; no need to insert it in Layout anymore
} as const;
```

### 4. Modify Configuration Parameters
Modify the following parameters based on your Umami account information:

#### enabled
Set to `true` to enable the Umami analytics function:
```typescript
enabled: true,
```

#### apiKey
Replace with your actual API Key:
```typescript
apiKey: "your_actual_api_key_here",
```

#### baseUrl
Keep the default value if you use Umami Cloud; replace with your service address if you use a self-hosted service:
```typescript
baseUrl: "https://api.umami.is", // Umami Cloud
// Or
baseUrl: "https://your-umami-instance.com", // Self-hosted service
```

#### scripts
Replace with your actual tracking script, including your Website ID:
```typescript
scripts: `
<script defer src="https://analytics.umami.is/script.js" data-website-id="your_website_id_here"></script>
`.trim(),
```

### 5. Complete Configuration Example
Below is a complete configuration example:

```typescript
export const umamiConfig = {
  enabled: true,
  apiKey: "api_a1b2c3d4e5f6g7h8i9j0",
  baseUrl: "https://api.umami.is",
  scripts: `
<script defer src="https://analytics.umami.is/script.js" data-website-id="abcd1234-ef56-7890-abcd-ef1234567890"></script>
  `.trim(),
} as const;
```

### 6. Save and Rebuild
1. Save the `src/config.ts` file.
2. Rebuild your website:
   ```bash
   pnpm build
   ```
3. Deploy your website.

## Verify Configuration
After configuration, you can verify if it is successful in the following ways:
1. Visit your website.
2. Open the browser developer tools.
3. Check network requests to confirm if there are requests sent to the Umami server.
4. View real-time visitor data in the Umami dashboard.

## Troubleshooting
If no data is displayed after configuration, please check:
1. **Ensure enabled is set to true**
2. **Check if the API Key is correct**
3. **Confirm if the Website ID is correct**
4. **Verify if the tracking script URL is correct**
5. **Check if there are error messages in the browser console**
6. **Confirm if the Umami service is running normally**

## Privacy Protection
Umami values user privacy and does not collect personally identifiable information. You can add instructions on the use of Umami to your privacy policy to ensure transparency.


