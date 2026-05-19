// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://tlc-photography.com',
  adapter: cloudflare({ imageService: 'passthrough' }),
  image: {
    service: { entrypoint: 'astro/assets/services/noop' },
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    keystatic(),
    sitemap(),
  ],
});
