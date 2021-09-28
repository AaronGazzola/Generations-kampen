import Head from 'next/head';

interface MetaProps {
	title: string;
	keywords: string;
	description: string;
}

const Meta = (props: MetaProps) => {
	const { keywords, description, title } = props;
	return (
		<Head>
			<meta name='keywords' content={keywords} />
			<meta name='description' content={description} />
			<meta property='og:title' content={title} />
			<meta property='og:description' content={description} />
			{/* <meta
				property='og:image'
				content='https://apexapps.com.au/assets/images/fb_image_xl.png'
			/>
			<meta property='og:url' content='https://www.apexapps.com.au' /> */}
			<meta property='og:site_name' content='Generations kampen' />
			<meta name='twitter:image:alt' content={title} />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: 'Generations kampen | Nangarra',
	keywords: 'generations kampen trivia game games Nangarra',
	description: 'A fun family trivia game for the Swedish audience'
};

export default Meta;
