import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://alexbarmh.github.io',
  base: '/clawcos-website/',
  build: {
    assets: 'assets'
  },
  markdown: {
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
