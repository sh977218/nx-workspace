import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
  },
  optimizeDeps: {
    include: ['@asamuzakjp/css-color'],
  },
});
