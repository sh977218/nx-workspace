# UI Application

This is the main Angular application for the nx-workspace monorepo.

## Features

- Built with Angular 21+
- Uses standalone components
- Tailwind CSS for styling
- Angular Material for UI components
- Highcharts for data visualization
- Three.js for 3D graphics
- Reactive forms
- Signals for state management
- Lazy-loaded routes

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm >= 11

### Installation

The dependencies are installed at the workspace root. If not, run:

```bash
npm install
```

### Development Server

Run the development server:

```bash
npx nx serve ui
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Build

Build the application for production:

```bash
npx nx build ui
```

The build artifacts will be stored in the `dist/apps/ui/` directory.

### Testing

Run unit tests:

```bash
npx nx test ui
```

Run integration tests:

```bash
npx nx run ui:integration-test
```

### Linting

```bash
npx nx lint ui
```

## Project Structure

```
apps/ui/src/
├── app/                 # Main application code
├── environments/        # Environment configurations
├── integration-test/    # Integration tests
├── styles.scss          # Global styles
└── main.ts              # Application bootstrap
```

## Technologies

- **Angular**: Framework
- **TypeScript**: Language
- **RxJS**: Reactive programming
- **Tailwind CSS**: Styling
- **Angular Material**: Components
- **Highcharts**: Charts
- **Three.js**: 3D graphics
- **Vitest**: Testing framework
