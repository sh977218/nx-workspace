# E2E Tests

End-to-end tests for the nx-workspace applications using Playwright.

## Features

- Cross-browser testing
- Visual regression testing
- API testing
- CI/CD integration

## Getting Started

### Prerequisites

- Node.js >= 24.0.0
- npm >= 11

### Installation

Dependencies are installed at the workspace root.

### Running Tests

Run all e2e tests:

```bash
npx nx e2e e2e
```

Run tests in headed mode (visible browser):

```bash
npx nx e2e e2e --headed
```

Run tests in a specific browser:

```bash
npx nx e2e e2e --browser=chromium
```

### Configuration

Test configuration is in `apps/e2e/playwright.config.ts`.

Fixtures and test data are in `apps/e2e/src/fixtures/`.

## Project Structure

```
apps/e2e/src/
├── global-setup.ts      # Global test setup
├── global-teardown.ts   # Global test teardown
├── fixtures/            # Test fixtures
└── tests/               # Test files
```

## Technologies

- **Playwright**: Testing framework
- **TypeScript**: Language
- **Allure**: Test reporting
