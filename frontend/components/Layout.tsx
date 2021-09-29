import setScreenDimensions from '../hooks/setScreenDimensions';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	setScreenDimensions();
	return (
		<>
			<main className='flex flex-col items-center relative'>
				{props.children}
			</main>
		</>
	);
};

export default Layout;
