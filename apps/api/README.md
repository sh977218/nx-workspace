# API Application

This is the main NestJS API server for the nx-workspace monorepo.

## Features

- Built with NestJS
- RESTful API endpoints
- JWT authentication
- MongoDB integration with Mongoose
- WebSocket support
- Swagger documentation
- Winston logging

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm >= 11
- MongoDB (if using local database)

### Installation

Dependencies are installed at the workspace root.

### Development Server

Run the development server:

```bash
npx nx serve api
```

The API will be available at `http://localhost:3000/`.

### Build

Build the application:

```bash
npx nx build api
```

### Testing

Run unit tests:

```bash
npx nx test api
```

### Linting

```bash
npx nx lint api
```

## API Documentation

When running in development mode, Swagger documentation is available at `http://localhost:3000/api`.

## Project Structure

```
apps/api/src/
├── app/                 # Main application module
├── assets/              # Static assets
└── main.ts              # Application bootstrap
```

## Technologies

- **NestJS**: Framework
- **TypeScript**: Language
- **MongoDB**: Database
- **Mongoose**: ODM
- **JWT**: Authentication
- **Socket.io**: WebSockets
- **Winston**: Logging
- **Swagger**: API documentation
