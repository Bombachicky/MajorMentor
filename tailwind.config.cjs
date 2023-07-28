/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}', './nodemodules/flowbite/**/*.js'],
	theme: {
		extend: {
			colors: {
				'ucfblack': '#231f20',
				'ucfyellow': 'rgba(255,252,127,1)',
				'light-grey': '#f3f3f3',
				'black': '#383636',
		
			},
			spacing: {
				'12.5': '50px', // to handle 50px width and height
				'2.5': '10px',  // to handle 10px border
			},
			borderWidth: {
				'10': '10px',
			},
			fontFamily: {
				averox: ['AVEROX', 'sans-serif']
			},
			boxShadow: {
				'glow': '0 0 100px 0 rgba(255,252,127,1)',
			},
			animation: {
				spinner: 'spin 1.5s linear infinite',
			},
		},
	},
	plugins: [
		require('flowbite/plugin'),
	],
}
