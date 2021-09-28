import type { NextPage } from 'next';
import { useEffect, useRef, useState } from 'react';
import Meta from '../components/Meta';
import { useAppSelector } from '../redux/hooks';

const Home: NextPage = () => {
	const { breakpoint, screenHeight, screenWidth } = useAppSelector(
		state => state.utils
	);
	const [phase, setPhase] = useState<'standby' | 'play' | 'feedback'>(
		'standby'
	);
	const [seconds, setSeconds] = useState(0);
	const [videoWidth, setVideoWidth] = useState(640);
	const answersRef = useRef<HTMLDivElement>(null);

	const playHandler = () => {
		let sec = 3;
		setSeconds(sec);
		const timer = setInterval(() => {
			sec--;
			setSeconds(sec);
			if (sec === 0) {
				clearInterval(timer);
				setPhase('play');
			}
		}, 1000);
	};

	useEffect(() => {
		if (answersRef.current?.offsetHeight) {
			setVideoWidth(screenHeight - answersRef.current?.offsetHeight);
		}
	}, [breakpoint, screenHeight, screenWidth, answersRef, phase]);

	return (
		<>
			<Meta />
			{phase === 'standby' ? (
				<button
					className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-500 text-white font-semibold w-20 h-10'
					onClick={playHandler}
				>
					{seconds === 0 ? 'Play' : seconds}
				</button>
			) : (
				<>
					<div className={`w-full max-w-lg flex flex-col items-center`}>
						<div
							className='bg-gray-400 relative max-w-lg max-h-lg'
							style={{ width: videoWidth, height: videoWidth }}
						></div>
						<div ref={answersRef} className='flex flex-col'>
							<p className='text-center py-2'>
								Select the right answer before the time runs out!
							</p>
							{[1, 2, 3, 4].map(answer => (
								<button
									key={answer}
									className='bg-blue-500 text-white text-semibold hover:bg-green-500 w-full mb-2 py-1'
								>
									Answer{answer}
								</button>
							))}
						</div>
					</div>
				</>
			)}
		</>
	);
};

export default Home;
