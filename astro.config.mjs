import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { remarkReadingTime } from './src/utils/reading-time.mjs';

export default defineConfig({
  site: 'https://clawcos.ai',
  base: '/',
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
    shikiConfig: {
      theme: 'github-dark'
    }
  }
});
