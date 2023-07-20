/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './node_modules/flowbite/**/*.js'],
	theme: {
		extend: {
			colors: {
				'ucfblack': '#231f20',
			},
			fontFamily: {
				averox: ['AVEROX', 'sans-serif']
			},
			boxShadow: {
				'card': '5px 5px rgba(0,_98,_90,_0.4), 10px 10px rgba(0,_98,_90,_0.3), 15px 15px rgba(0,_98,_90,_0.2), 20px 20px rgba(0,_98,_90,_0.1),_25px_25px_rgba(0,_98,_90,_0.05)]',
			}
		},
	},
	plugins: [
		require('flowbite/plugin'),
	],
}
