# Shared Models

A library of shared TypeScript interfaces and models for the nx-workspace monorepo.

## Features

- Type-safe interfaces
- Zod schemas for validation
- Shared data structures

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm >= 11

### Installation

Dependencies are installed at the workspace root.

### Build

Build the library:

```bash
npx nx build shared-models
```

### Testing

Run tests:

```bash
npx nx test shared-models
```

### Linting

```bash
npx nx lint shared-models
```

## Usage

Import models:

```typescript
import { User } from '@nx-workspace/shared-models';
```

## Project Structure

```
libs/shared-models/src/
├── lib/                 # Model definitions
└── index.ts             # Public API
```

## Technologies

- **TypeScript**: Language
- **Zod**: Schema validation
