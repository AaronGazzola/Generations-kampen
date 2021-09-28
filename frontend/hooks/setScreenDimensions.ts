import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setDimensions } from '../redux/utils/utils.slice';

const setScreenDimensions = () => {
	const dispatch = useAppDispatch();
	const { breakpoint, screenWidth, screenHeight } = useAppSelector(
		state => state.utils
	);

	useEffect(() => {
		const handleResize = () => {
			// add variable to css :root to specify 1vh for android devices
			const cssRoot = document.querySelector(':root');
			if (cssRoot !== null) {
				(cssRoot as HTMLInputElement).style.setProperty(
					'--vh',
					window.innerHeight / 100 + 'px'
				);
			}
			// Set screen dimensions and breakpoints
			const width = window.innerWidth;
			const height = window.innerHeight;
			const breakpoint =
				width < 640
					? 'xs'
					: width < 768
					? 'sm'
					: width < 1024
					? 'md'
					: width < 1280
					? 'lg'
					: width < 1536
					? 'xl'
					: '2xl';
			dispatch(
				setDimensions({
					screenWidth: width,
					screenHeight: height,
					headerHeight: breakpoint === 'xs' ? 56 : 82,
					breakpoint
				})
			);
		};
		window.addEventListener('resize', handleResize);
		handleResize();
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return [breakpoint, screenWidth, screenHeight];
};

export default setScreenDimensions;
