# Dark Cookie Editor – Chrome Extension

A lightweight Chrome extension to quickly view and edit the following cookies on any site:

| Cookie Name     | Type    | Description            |
| --------------- | ------- | ---------------------- |
| `dark_coire_ui` | string  | Free-text string value |
| `dark_ccs`      | boolean | `true` / `false`       |
| `dark_cams`     | boolean | `true` / `false`       |
| `dark_caas`     | boolean | `true` / `false`       |

## Setup

```bash
npm install
npm run build
```

## Installation (Developer Mode)

1. Run `npm run build` to compile TypeScript and copy assets into `dist/`.
2. Open **Chrome** and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right).
4. Click **Load unpacked** and select the `dist/` folder inside `dark-cookie-editor`.
5. The extension icon will appear in the toolbar.

## Usage

1. Navigate to any website.
2. Click the extension icon in the toolbar.
3. The popup shows the current cookie values for the active site.
4. Edit the values:
   - **dark_coire_ui** – type any string value.
   - **dark_ccs / dark_cams / dark_caas** – toggle on/off (`true`/`false`).
5. Click **Save** to write the cookies, or **Clear All** to remove them.

## File Structure

```
dark-cookie-editor/
+-- src/
|   +-- popup.ts        # TypeScript source (cookie read/write logic)
+-- manifest.json       # Extension manifest (MV3)
+-- popup.html          # Popup UI
+-- popup.css           # Styles
+-- package.json        # npm scripts and dev dependencies
+-- tsconfig.json       # TypeScript configuration
+-- icons/
|   +-- icon16.png
|   +-- icon48.png
|   +-- icon128.png
+-- dist/               # Build output (load this folder in Chrome)
+-- README.md
```
