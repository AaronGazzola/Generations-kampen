import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Meta from '../components/Meta';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearTriviaTrigger, getTrivia } from '../redux/trivia/trivia.slice';
import mainTitle from '../public/assets/images/main_title.png';
import chestImage from '../public/assets/images/chest.png';

interface Bubble {
	width: number;
	delay: number;
	duration: number;
	x: number;
	key: number;
}

const Home: NextPage = () => {
	const dispatch = useAppDispatch();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [phase, setPhase] = useState<
		'standby' | 'play' | 'feedback' | 'countdown'
	>('standby');
	const [seconds, setSeconds] = useState(0);
	const { screenWidth, screenHeight } = useAppSelector(state => state.utils);
	const { trivia, trigger: triviaTrigger } = useAppSelector(
		state => state.trivia
	);
	const [bubbles, setBubbles] = useState<Bubble[]>([]);
	const [gotTrivia, setGotTrivia] = useState<boolean>(false);
	const [showVideo, setShowVideo] = useState<boolean>(false);

	const getBubbles = (density: number) => {
		let arr: Bubble[] = [];
		const getRandomInteger = (min: number, max: number) => {
			return Math.floor(Math.random() * (max - min + 1) + min);
		};
		for (let i = 0; i < screenWidth / density; i++) {
			arr.push({
				width: getRandomInteger(2, 10),
				delay: getRandomInteger(0, 5),
				duration: getRandomInteger(5, 15),
				x: getRandomInteger(0, screenWidth),
				key: i
			});
		}
		return arr;
	};

	const startTriviaTimer = () => {
		setPhase('play');
		// videoRef?.current?.play();
		let sec = 60;
		setSeconds(sec);
		const timer = setInterval(() => {
			sec--;
			setSeconds(sec);
			if (sec === 0) {
				clearInterval(timer);
				setPhase('feedback');
			}
		}, 1000);
	};

	const playHandler = () => {
		setPhase('countdown');
		setBubbles(getBubbles(30));
		let sec = 6;
		setSeconds(sec);
		const timer = setInterval(() => {
			sec--;
			setSeconds(sec);
			if (sec === 0) {
				clearInterval(timer);
				startTriviaTimer();
			}
		}, 1000);
	};

	useEffect(() => {
		if (phase === 'standby' && !gotTrivia) {
			setShowVideo(false);
			dispatch(getTrivia());
			setGotTrivia(true);
		}
	}, [phase, gotTrivia]);

	useEffect(() => {
		if (triviaTrigger === 'showVideo') {
			setShowVideo(true);
			dispatch(clearTriviaTrigger());
		}
	}, [triviaTrigger]);

	return (
		<>
			<Meta />
			<div className='fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center overflow-visible'>
				<div className='w-full h-full max-w-xl overflow-visible relative'>
					<div
						className='absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center'
						style={{
							transform:
								phase === 'standby' ? 'translateX(0%)' : 'translateX(-100%)',
							opacity: phase === 'standby' ? 1 : 0,
							transition: 'all .8s cubic-bezier( 0.87, 0, 0.34, 1.02 )'
						}}
					>
						<div
							className='flex flex-col items-center justify-start w-full h-full'
							style={{ maxHeight: 500 }}
						>
							<div className='w-full'>
								<Image src={mainTitle} layout='responsive' />
							</div>
							<div className='w-full' style={{ maxWidth: 280 }}>
								<Image src={chestImage} layout='responsive' />
							</div>

							<button
								onClick={playHandler}
								className='rounded-md w-72 h-20 bg-brown-dark text-yellow-dark text-5xl font-bold pb-1.5 mt-auto'
							>
								STARTA
							</button>
						</div>
					</div>
					<div
						className='absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-around'
						style={{
							transform:
								phase !== 'standby' ? 'translateX(0%)' : 'translateX(100%)',
							opacity: phase !== 'standby' ? 1 : 0,
							transition: 'all .8s cubic-bezier( 0.87, 0, 0.34, 1.02 )'
						}}
					>
						<h1
							className='whitespace-nowrap text-white font-bold italic'
							style={{ fontSize: '1.2rem' }}
						>
							Vilket foretag ar det reklam for?
						</h1>
						<div className='p-2'>
							{showVideo && trivia && (
								<video
									ref={videoRef}
									muted
									className='w-full rounded-lg'
									loop
									preload='auto'
									style={{
										width: `clamp(280px, 100%, calc(((var(--vh) * 100) - 28px - 150px)) * ${
											videoRef.current
												? videoRef.current?.offsetWidth /
												  videoRef.current?.offsetHeight
												: '1'
										})`
									}}
								>
									<source
										src={`http://localhost:5000/api/videos/${trivia?._id}`}
										type='video/mp4'
									/>
								</video>
							)}
						</div>
						{/* <div 
						className='w-full b-blue'
						style={{paddingTop: videoRef.current ? `${videoRef.current.offsetHeight / videoRef.current.offsetWidth * 100}%` : ''}}></div> */}
						{/* <div className='p-2 relative'>
							{phase === 'countdown' && (
								<div className='absolute top-0 left-0 bottom-0 right-0 z-10 p-2'>
									<div className='bg-gray-800 rounded-lg flex items-center justify-center w-full h-full'>
										<p
											className='text-white text-2xl font-bold'
											style={{ animation: 'countdown 1s ease infinite' }}
										>
											{seconds < 4 ? seconds : ''}
										</p>
									</div>
								</div>
							)}
						</div> */}
						<div
							className='overflow-x-scroll w-full py-2 flex flex-col items-center'
							style={{ minHeight: 75 }}
						>
							{['blue', 'red', 'green', 'yellow'].map(color => (
								<button
									key={color}
									onClick={() => setPhase('feedback')}
									className={`h-12 w-full mb-2 border border-brown-dark italic text-white text-xl font-bold bg-${color} ${
										phase === 'countdown' ? 'opacity-20' : ``
									}`}
									style={{
										borderRadius: 25,
										minHeight: 50,
										maxWidth: videoRef.current?.offsetWidth
									}}
								>
									{phase === 'countdown' ? '' : color}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
			{/* <div
				className='relative z-10 max-w-lg w-screen overflow-visible'
				style={{ minWidth: 320, height: 'calc(var(--vh) * 100)' }}
			>
				<div
					className='absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-around overflow-hidden'
					style={{
						transform:
							phase === 'standby' ? 'translateX(0%)' : 'translateX(-100%)',
						opacity: phase === 'standby' ? 1 : 0,
						transition: 'all .8s cubic-bezier( 0.87, 0, 0.34, 1.02 )'
					}}
				>
					<div className='w-full'>
						<Image src={mainTitle} layout='responsive' />
					</div>
					<div className='w-full' style={{ maxWidth: 280 }}>
						<Image src={chestImage} layout='responsive' />
					</div>

					<button
						onClick={playHandler}
						className='rounded-md w-72 h-20 bg-brown-dark text-yellow-dark text-5xl font-bold pb-1.5'
					>
						STARTA
					</button>
				</div>
				<div
					className='absolute top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-start overflow-hidden'
					style={{
						transform:
							phase !== 'standby' ? 'translateX(0%)' : 'translateX(100%)',
						opacity: phase !== 'standby' ? 1 : 0,
						transition: 'all .8s cubic-bezier( 0.87, 0, 0.34, 1.02 )'
					}}
				>
					<h1
						className='whitespace-nowrap text-white font-bold italic'
						style={{ fontSize: '1.2rem' }}
					>
						Vilket foretag ar det reklam for?
					</h1>
					<div className='p-2 relative'>
						{phase === 'countdown' && (
							<div className='absolute top-0 left-0 bottom-0 right-0 z-10 p-2'>
								<div className='bg-gray-800 rounded-lg flex items-center justify-center w-full h-full'>
									<p
										className='text-white text-2xl font-bold'
										style={{ animation: 'countdown 1s ease infinite' }}
									>
										{seconds < 4 ? seconds : ''}
									</p>
								</div>
							</div>
						)}
						{showVideo && trivia && (
							<video
								ref={videoRef}
								muted
								className='w-full rounded-lg'
								loop
								preload='auto'
							>
								<source
									src={`http://localhost:5000/api/videos/${trivia?._id}`}
									type='video/mp4'
								/>
							</video>
						)}
					</div>
					<div>
						{['blue', 'red', 'green', 'yellow'].map(color => (
							<button
								key={color}
								onClick={() => setPhase('feedback')}
								className={`h-12 w-full mb-2 border border-brown-dark italic text-white text-xl font-bold bg-${color} ${
									phase === 'countdown' ? 'opacity-20' : ``
								}`}
								style={{
									borderRadius: 25,
									minHeight: 50
									// maxWidth: 285
								}}
							>
								{phase === 'countdown' ? '' : color}
							</button>
						))}
					</div>
				</div>
			</div>
			<div
				className='fixed top-0 left-0 right-0 bottom-0'
				style={{
					transform:
						phase === 'countdown' ? 'translateY(0%)' : 'translateY(100%)',
					transition:
						phase === 'countdown'
							? 'transform 1.5s ease 0.8s'
							: 'transform 60s linear',
					backfaceVisibility: 'hidden'
				}}
			>
				<svg
					className='waves absolute top-0 left-0 right-0'
					xmlns='http://www.w3.org/2000/svg'
					xmlnsXlink='http://www.w3.org/1999/xlink'
					viewBox='0 24 150 28'
					preserveAspectRatio='none'
					shapeRendering='auto'
					style={{ backfaceVisibility: 'hidden' }}
				>
					<defs>
						<path
							id='gentle-wave'
							d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
						/>
					</defs>
					<g className='parallax'>
						<use
							xlinkHref='#gentle-wave'
							x='48'
							y='0'
							style={{ fill: '#4ca9b1', opacity: 0.2 }}
						/>
						<use
							xlinkHref='#gentle-wave'
							x='48'
							y='3'
							style={{ fill: '#4ca9b1', opacity: 0.3 }}
						/>
					</g>
				</svg>
				<svg
					className='waves absolute left-0 right-0'
					xmlns='http://www.w3.org/2000/svg'
					xmlnsXlink='http://www.w3.org/1999/xlink'
					viewBox='0 24 150 28'
					preserveAspectRatio='none'
					shapeRendering='auto'
					style={{ backfaceVisibility: 'hidden', top: 2 }}
				>
					<defs>
						<path
							id='gentle-wave'
							d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z'
						/>
					</defs>
					<g className='parallax'>
						<use
							xlinkHref='#gentle-wave'
							x='48'
							y='5'
							style={{ fill: '#4ca9b1', opacity: 0.05 }}
						/>
					</g>
				</svg>
				<div
					className='absolute h-full w-full bg-blue-light  overflow-visible z-10 opacity-50 '
					style={{ top: 40, backfaceVisibility: 'hidden' }}
				>
					{bubbles.map(bubble => (
						<div
							key={bubble.key}
							className={`absolute border border-white  w-${bubble.width} h-${bubble.width} rounded-full`}
							style={{
								left: bubble.x,
								bottom: bubble.width,
								animation: ['countdown', 'play'].includes(phase)
									? `bubble ${bubble.duration}s linear ${bubble.delay}s infinite`
									: ''
							}}
						></div>
					))}
				</div>
			</div> */}
		</>
	);
};

export default Home;
