import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Meta from '../components/Meta';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearTriviaTrigger, getTrivia } from '../redux/trivia/trivia.slice';
import mainTitle from '../public/assets/images/main_title.png';
import chestImage from '../public/assets/images/chest.png';
import chestGlow from '../public/assets/images/chest_glow.png';

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
	const srcRef = useRef<HTMLSourceElement>(null);
	const buttonBoxRef = useRef<HTMLDivElement>(null);
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
	const [showScrollIcon, setShowScrollIcon] = useState<boolean>(true);
	const [videoWidth, setVideoWidth] = useState<string>('320px');
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
			dispatch(getTrivia());
			setGotTrivia(true);
		}
	}, [phase, gotTrivia]);

	useEffect(() => {
		if (triviaTrigger === 'showVideo' && srcRef.current) {
			srcRef.current.src = `${
				process.env.NODE_ENV === 'production'
					? process.env.NEXT_PUBLIC_BASE_URL_PROD
					: process.env.NEXT_PUBLIC_BASE_URL_DEV
			}/api/videos/${trivia?._id}`;
			videoRef.current?.load();
			dispatch(clearTriviaTrigger());
		}
	}, [triviaTrigger]);

	useEffect(() => {
		if (
			phase === 'play' &&
			((buttonBoxRef.current?.scrollTop &&
				buttonBoxRef.current?.scrollTop > 0) ||
				buttonBoxRef.current?.offsetHeight ===
					buttonBoxRef.current?.scrollHeight)
		)
			setShowScrollIcon(false);
	}, [buttonBoxRef.current?.scrollTop, buttonBoxRef.current]);

	useEffect(() => {
		const videoMetaDataHandler = () => {
			if (buttonBoxRef.current && videoRef.current)
				setVideoWidth(
					`clamp(280px, 100%, calc(((var(--vh) * 100) - 28px - ${
						screenHeight > 580 ? buttonBoxRef.current?.scrollHeight + 16 : 178
					}px)) * ${
						videoRef.current?.videoWidth / videoRef.current?.videoHeight
					})`
				);
		};
		if (videoRef.current) {
			videoRef.current.addEventListener('loadedmetadata', videoMetaDataHandler);
		}
		return () =>
			videoRef.current?.removeEventListener(
				'loadedmetadata',
				videoMetaDataHandler
			);
	}, [videoRef.current, buttonBoxRef.current]);

	return (
		<>
			<Meta />
			<div className='fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center overflow-visible z-10'>
				<div className='w-full h-full max-w-4xl overflow-visible relative'>
					<div
						className='absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center'
						style={{
							transform:
								phase === 'standby' ? 'translateX(0%)' : 'translateX(-100%)',
							opacity: phase === 'standby' ? 1 : 0,
							transition: 'all .8s cubic-bezier( 0.87, 0, 0.34, 1.02 )'
						}}
					>
						<div className='flex flex-col-reverse items-center justify-around w-full h-full'>
							<button
								onClick={playHandler}
								className={`rounded-md bg-brown-dark text-yellow-dark text-6xl z-10 ${
									screenHeight > 800 ? 'sm:text-8xl' : ''
								} font-bold px-4 py-2.5 pb-4 mb-4`}
							>
								STARTA
							</button>
							<div
								className='relative'
								style={{
									width: `clamp(0px, calc(((var(--vh) * 100) - 276px) * 0.905901116427), 540px)`,
									height: `clamp(0px, calc((var(--vh) * 100) - 276px), 540px)`
								}}
							>
								<div
									className='absolute top-0 left-0 right-0 bottom-0 opacity-0'
									style={{
										animation: 'chest-glow 4s ease-in-out .7s infinite'
									}}
								>
									<Image src={chestGlow} layout='responsive' />
								</div>
								<div
									className='absolute top-0 left-0 right-0 bottom-0'
									style={{
										animation: 'chest-pulse 2s ease-in-out infinite alternate'
									}}
								>
									<Image src={chestImage} layout='responsive' />
								</div>
							</div>
							<div className='w-full' style={{ maxWidth: 640 }}>
								<Image src={mainTitle} layout='responsive' />
							</div>
						</div>
					</div>
					<div
						className='absolute top-0 left-0 right-0 bottom-0 flex flex-col items-center justify-around'
						style={{
							maxHeight: 900,
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

						<div
							className='p-2 flex justify-center relative'
							style={{
								width: videoWidth
							}}
						>
							{phase === 'countdown' && (
								<div className='absolute top-0 left-1/2 transform -translate-x-1/2 bottom-0 right-0 z-10 w-full'>
									<div className='bg-gray-800 rounded-lg flex items-center justify-center w-full h-full'>
										<p
											className='text-white text-2xl font-bold'
											style={{
												animation:
													seconds <= 3 ? 'countdown 1s ease infinite' : ''
											}}
										>
											{seconds <= 3 ? seconds : ''}
										</p>
									</div>
								</div>
							)}

							<video
								ref={videoRef}
								muted
								className='w-full rounded-lg'
								loop
								preload='auto'
							>
								<source ref={srcRef} type='video/mp4' />
							</video>
						</div>
						{phase === 'play' && showScrollIcon && (
							<div
								className='fixed bottom-0 left-1/2 transform -translate-x-1/2 z-10 overflow-x-visible'
								style={{ width: videoWidth, height: 0 }}
							>
								<svg
									className='absolute right-10 top-1/2 transform -translate-y-1/2 fill-current text-gray-800 rounded-full border bg-white opacity-40'
									style={{
										animation: 'scroll-icon 1s ease-in-out infinite alternate'
									}}
									xmlns='http://www.w3.org/2000/svg'
									viewBox='-6 -2 24 24'
									width='24'
								>
									<path d='M5 16.573V3.419L2.464 5.954A1 1 0 0 1 1.05 4.54L5.293.297a1 1 0 0 1 1.414 0L10.95 4.54a1 1 0 1 1-1.414 1.414L7 3.42v13.154l2.536-2.536a1 1 0 1 1 1.414 1.414l-4.243 4.243a.997.997 0 0 1-1.414 0L1.05 15.451a1 1 0 1 1 1.414-1.414L5 16.573z'></path>
								</svg>
							</div>
						)}
						<div
							className='overflow-y-auto py-2 flex flex-col items-center relative'
							style={{ minHeight: 75, width: videoWidth }}
							ref={buttonBoxRef}
						>
							{['blue', 'red', 'green', 'yellow'].map(color => (
								<button
									key={color}
									onClick={() => setPhase('feedback')}
									className={`w-full h-12 mb-2 border border-brown-dark italic text-white text-xl font-bold bg-${color} ${
										phase === 'countdown' ? 'opacity-20' : ``
									}`}
									style={{
										borderRadius: 25,
										minHeight: 50
									}}
								>
									{phase === 'countdown' ? '' : color}
								</button>
							))}
						</div>
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
			</div>
		</>
	);
};

export default Home;
