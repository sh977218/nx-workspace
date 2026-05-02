# Dark Cookie Editor

A browser extension for editing cookies with a dark theme interface.

## Features

- Edit browser cookies
- Dark theme UI
- Popup interface
- Manifest V3 compliant

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm >= 11

### Installation

Dependencies are installed at the workspace root.

### Build

Build the extension:

```bash
npx nx build dark-cookie-editor
```

### Development

For development, load the `dist/apps/dark-cookie-editor` directory as an unpacked extension in your browser.

### Testing

Run tests:

```bash
npx nx test dark-cookie-editor
```

### Linting

```bash
npx nx lint dark-cookie-editor
```

## Project Structure

```
apps/dark-cookie-editor/src/
├── manifest.json        # Extension manifest
├── popup.html           # Popup HTML
├── popup.ts             # Popup script
├── environments/        # Environment configs
└── lib/                 # Utility libraries
```

## Technologies

- **TypeScript**: Language
- **Chrome Extension API**: Browser integration
- **Webpack**: Build tool
