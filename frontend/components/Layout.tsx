import setScreenDimensions from '../hooks/setScreenDimensions';

interface LayoutProps {
	children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
	setScreenDimensions();
	return <>{props.children}</>;
};

export default Layout;
