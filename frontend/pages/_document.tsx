import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel='icon' href='/favicon.ico' sizes='any' />
					<link rel='apple-touch-icon' href='/icon-512x512.png' />
					<link rel='manifest' href='/manifest.json' />
				</Head>
				<body
					className='bg-brown-lightest flex flex-col justify-center items-center'
					style={{
						backgroundImage: `url('/assets/images/bg_wood.png')`,
						backgroundRepeat: 'repeat-x',
						backgroundPosition: 'top'
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
