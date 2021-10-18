module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				green: {
					darkest: '#1b8433',
					dark: '#7ebb55',
					DEFAULT: '#70b870',
					light: '#72c371',
					lightest: '#7dba56'
				},
				yellow: {
					light: '#fae94d',
					DEFAULT: '#d7ae49',
					dark: '#ffc107'
				},
				red: {
					lightest: '#cf3732',
					light: '#ce3732',
					dark: '#dc3545',
					DEFAULT: '#b6504c'
				},
				blue: {
					dark: '#627eaf',
					DEFAULT: '#5680be',
					light: '#4ca9b1',
					lightest: '#9bc19b'
				},
				brown: {
					lightest: '#c0532d',
					light: '#8b4038',
					DEFAULT: '#76402e',
					dark: '#773529'
				},
				orange: {
					DEFAULT: '#e06436'
				}
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
};
