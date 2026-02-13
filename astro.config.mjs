import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://clawcos.ai',
  base: '/',
  build: {
    assets: 'assets'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
