import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://clawcos.com',
  build: {
    assets: 'assets'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
