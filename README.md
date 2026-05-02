# Nx Workspace

This is a monorepo workspace built with Nx, containing multiple applications and libraries for a full-stack web application ecosystem.

## Technologies Used

- **Nx**: Monorepo build system
- **Angular**: Frontend framework
- **NestJS**: Backend framework
- **Playwright**: End-to-end testing
- **TypeScript**: Programming language
- **Tailwind CSS**: Utility-first CSS framework
- **Angular Material**: UI component library

## Applications

### ui
The main Angular application providing the user interface. Features include:
- Responsive design with Tailwind CSS
- Angular Material components
- Highcharts integration for data visualization
- Three.js integration for 3D graphics

### api
A NestJS-based REST API server handling backend logic.

### auth-api
Dedicated authentication API using JWT tokens.

### dark-cookie-editor
A browser extension for editing cookies in a dark theme.

### e2e
End-to-end tests using Playwright to ensure application functionality.

## Libraries

### shared-components
Reusable Angular components shared across applications.

### shared-models
Shared TypeScript interfaces and models for type safety.

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm >= 11

### Installation

```bash
npm install
```

### Development

#### Serve the UI application
```bash
npx nx serve ui
```

#### Serve the API
```bash
npx nx serve api
```

#### Serve the auth API
```bash
npx nx serve auth-api
```

### Building

Build all applications:
```bash
npx nx run-many --target=build --all
```

Build specific app:
```bash
npx nx build ui
```

### Testing

Run unit tests:
```bash
npx nx run-many --target=test --all
```

Run e2e tests:
```bash
npx nx e2e e2e
```

### Linting

```bash
npx nx run-many --target=lint --all
```

## Project Structure

```
nx-workspace/
├── apps/
│   ├── ui/              # Angular application
│   ├── api/             # NestJS API
│   ├── auth-api/        # Authentication API
│   ├── dark-cookie-editor/  # Browser extension
│   └── e2e/             # E2E tests
├── libs/
│   ├── shared-components/  # Shared Angular components
│   └── shared-models/      # Shared models
└── tools/               # Nx tools and configurations
```

## Contributing

1. Follow conventional commit messages
2. Ensure all tests pass
3. Follow the coding standards defined in the ESLint configuration
4. Use Nx commands for building and testing

## License

MIT
