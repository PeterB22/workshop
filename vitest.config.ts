import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    globals: false,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    browser: {
      enabled: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    }
  }
});


/* import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    devtools: true
  }
}); */