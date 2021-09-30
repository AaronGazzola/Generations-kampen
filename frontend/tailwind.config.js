module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				green: {
					dark: '#1b8433',
					DEFAULT: '#63BD61',
					light: '#72c371'
				},
				yellow: {
					DEFAULT: '#ffc107'
				},
				red: {
					DEFAULT: '#dc3545'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
