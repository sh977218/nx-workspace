# Shared Components

A library of reusable Angular components for the nx-workspace monorepo.

## Features

- Standalone Angular components
- Accessibility compliant
- Responsive design
- Signals-based state management
- OnPush change detection

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm >= 11

### Installation

Dependencies are installed at the workspace root.

### Build

Build the library:

```bash
npx nx build shared-components
```

### Testing

Run tests:

```bash
npx nx test shared-components
```

### Linting

```bash
npx nx lint shared-components
```

## Usage

Import components from the library:

```typescript
import { SomeComponent } from '@nx-workspace/shared-components';
```

## Project Structure

```
libs/shared-components/src/
├── lib/                 # Component implementations
└── index.ts             # Public API
```

## Technologies

- **Angular**: Framework
- **TypeScript**: Language
- **Tailwind CSS**: Styling
