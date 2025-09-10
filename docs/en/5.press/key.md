---
title: Client-side Article Encryption
createTime: 2025/09/01 20:29:52
permalink: /en/press/key/
---

## Overview

The theme uses `bcryptjs` for password hashing and `crypto-js` for symmetric content encryption.

## Workflow

This stage occurs in the visitor's browser when they access an encrypted page:

### 1. User Interaction

Visitors first see a password input interface instead of the article content.

### 2. Client-side Verification and Decryption

When visitors enter a password and click "Unlock", the embedded JavaScript on the page performs the following operations:

#### Password Verification
The script first uses `bcryptjs` to hash the visitor's input password in the same way, then compares it with the pre-stored hash value on the page. If they match, the password is correct. This is to quickly verify the password and avoid wasting computing resources by attempting to decrypt with an incorrect password.

#### Content Decryption
After password verification passes, the script uses the plaintext password just entered by the visitor (which only exists in the browser's memory and is not sent anywhere) as the key, and calls `crypto-js` to decrypt the encrypted article content stored on the page.

#### Dynamic Rendering
Once the ciphertext is successfully decrypted, the script dynamically inserts the restored HTML content, including full formatting, into the corresponding container on the page.

### 3. Display Completion

Only then can visitors see the true content of the article. In this way, we successfully simulated a secure "verification-decryption-rendering" process without a backend, achieving effective protection of static content.

## Usage

Add the following configuration to the article's Front Matter:

```markdown
---
title: 'This is an encrypted article'
encrypted: true
password: 'your-secret-password'
---
```

This definition allows for irreversible encryption of the article, and only by entering the correct password can the article content be viewed.