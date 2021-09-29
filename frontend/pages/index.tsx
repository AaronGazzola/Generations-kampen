import type { NextPage } from 'next';
import { useState } from 'react';
import Meta from '../components/Meta';

const Home: NextPage = () => {
	const [phase, setPhase] = useState<'standby' | 'play' | 'feedback'>(
		'standby'
	);
	const [seconds, setSeconds] = useState(0);

	const startTriviaTimer = () => {
		let sec = 60;
		setSeconds(sec);
		const timer = setInterval(() => {
			sec--;
			setSeconds(sec);
			if (sec === 0) {
				console.log(sec);
				clearInterval(timer);
				setPhase('feedback');
			}
		}, 1000);
	};

	const playHandler = () => {
		let sec = 3;
		setSeconds(sec);
		const timer = setInterval(() => {
			sec--;
			setSeconds(sec);
			if (sec === 0) {
				clearInterval(timer);
				setPhase('play');
				startTriviaTimer();
			}
		}, 1000);
	};

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
				<div className='absolute top-0 left-0 w-full h-screen flex flex-col justify-between p-2'>
					<div>
						<div
							className='w-full bg-gray-400 max-h-lg p-2 max-w-lg'
							style={{ paddingTop: '100%' }}
						></div>
						<div
							className='w-full my-2 relative  border-2  h-8 rounded-full flex-shrink-0 overflow-hidden'
							style={{ animation: 'timerBorderColor 60s forwards' }}
						>
							<div
								className='w-full h-full absolute top-0 left-0 origin-left transition-scale ease-linear duration-1000 overflow-hidden'
								style={{
									transform: `scaleX(${seconds / 60})`,
									animation: 'timerBackgroundColor 60s forwards'
								}}
							></div>

							<p
								className='absolute text-center top-1/2 transform -translate-y-1/2 left-0 w-full  font-semibold z-10'
								style={{ mixBlendMode: 'difference' }}
							>
								{seconds} seconds to answer!
							</p>
						</div>
					</div>
					<div
						className='flex flex-col max-w-lg w-full overflow-y-auto'
						style={{
							maxHeight: 'calc((var(--vh) * 100) - 100vw)',
							minHeight: 100
						}}
					>
						{[1, 2, 3, 4].map(answer => (
							<button
								key={answer}
								className='bg-blue-500 text-white text-semibold hover:bg-green-500 w-full mb-2 py-1 max-w-lg '
							>
								Answer {answer}
							</button>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Home;
