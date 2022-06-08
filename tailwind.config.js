module.exports = {
	darkMode: 'class',
	content: ['./src/**/*.{js,jsx,ts,tsx}', 'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
	theme: {
		fontFamily: {
			display: ['Open Sans', 'sans-serif'],
			body: ['Open Sans', 'sans-serif'],
		},
		extend: {
			fontSize: {
				14: '14px',
			},
			backgroundColor: {
				'main-bg': '#FAFBFB',
				'main-dark-bg': '#121212',
				'secondary-dark-bg': '#292929',
				'light-gray': '#F7F7F7',
				'half-transparent': 'rgba(0, 0, 0, 0.5)',
			},
			colors: {
				'primary': '#2f3c48',
				'secondary': '#6f7f8c',
				'success': '#3e4d59',
				'danger': '#cc330d',
				'info': '#5c8f94',
				'warning': '#6e9fa5',
				'light': '#eceeec',
				'dark': '#1e2b37',
			},
			scale: {
				'350': '3.5',
			}
		},
	},
	plugins: [require('flowbite/plugin')],
};
