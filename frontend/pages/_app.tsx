import type { AppProps } from 'next/app';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import Layout from '../components/Layout';
import '../styles/globals.css';
import '../styles/animations.css';

declare global {
	interface Document {
		documentMode?: any;
	}
}

function MyApp({ Component, pageProps }: AppProps) {
	// check if browser is IE
	if (
		typeof document !== 'undefined' &&
		/*@cc_on!@*/ (false || !!document.documentMode)
	) {
		return (
			<p
				className='w-full p-4 text-2xl'
				style={{
					maxWidth: '500px',
					fontFamily: "'Montserrat', sans-serif",
					margin: '16px auto',
					textAlign: 'center'
				}}
			>
				Internet Explorer is not supported by this web app, please use a modern
				browser such as{' '}
				<a
					href='https://www.google.com/chrome/'
					target='_blank'
					rel='noreferrer'
					className='italic font-medium'
					style={{ color: '#41992B' }}
				>
					Google Chrome
				</a>{' '}
				or{' '}
				<a
					href='https://www.mozilla.org/en-US/firefox/download/'
					target='_blank'
					rel='noreferrer'
					className='italic font-medium'
					style={{ color: '#41992B' }}
				>
					Firefox
				</a>
			</p>
		);
	} else {
		return (
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		);
	}
}
export default MyApp;
