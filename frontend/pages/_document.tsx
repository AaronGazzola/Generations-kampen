import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='icon' href='/favicon.ico' sizes='any' />
					<link rel='icon' href='/icon.svg' type='image/svg+xml' />
					<link rel='apple-touch-icon' href='/apple-touch-icon.png' />
					<link rel='manifest' href='/manifest.json' />
				</Head>
				<body
					className='bg-brown-lightest flex flex-col items-center justify-start overflow-x-hidden'
					style={{
						backgroundImage: `url('/assets/images/bg_wood.png')`,
						backgroundRepeat: 'repeat-x',
						backgroundPosition: 'center'
					}}
				>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
