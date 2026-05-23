// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

export default defineConfig({
	site: 'https://cafedomancer.com',
	integrations: [mdx(), sitemap()],
	redirects: {
		'/2024/09/06/useful-command-collection-for-macos-settings/': '/blog/useful-command-collection-for-macos-settings/',
		'/2024/03/01/swtich-from-yarn-to-npm-on-jsbundling-rails/': '/blog/switch-from-yarn-to-npm-on-jsbundling-rails/',
		'/2022/12/12/bokan-and-sorta/': '/blog/bokan-and-sorta/',
		'/2021/12/12/encouragement-of-pair-programming/': '/blog/encouragement-of-pair-programming/',
	},
});
