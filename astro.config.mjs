import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// Fully static output -- builds to plain HTML/CSS/JS in dist/.
// No server runtime required to host it anywhere.
export default defineConfig({
  site: 'https://example.com',
  output: 'static',
  integrations: [
    tailwind({
      applyBaseStyles: false, // we bring our own base styles in src/styles/global.css
    }),
  ],
});
