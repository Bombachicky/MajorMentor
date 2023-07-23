/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './nodemodules/flowbite/**/*.js'],
	theme: {
		extend: {
			colors: {
				'ucfblack': '#231f20',
			},
			fontFamily: {
				averox: ['AVEROX', 'sans-serif']
			},
			boxShadow: {
				
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
	],
}
