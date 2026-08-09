// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'

// https://astro.build/config
export default defineConfig({
    site: 'https://solutionsary.com',
    output: 'static',
    trailingSlash: 'ignore',
    build: {
        // Emits every asset with a content hash so the host can cache aggressively.
        assets: 'assets',
        inlineStylesheets: 'auto',
    },
    image: {
        responsiveStyles: true,
    },
    integrations: [sitemap(), icon()],
    vite: {
        plugins: [tailwindcss()],
    },
})
