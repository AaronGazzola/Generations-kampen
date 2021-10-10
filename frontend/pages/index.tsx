import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { Keyframes } from '../components/Keyframes';
import Meta from '../components/Meta';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { getVideo } from '../redux/trivia/trivia.slice';

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
	const [bubbles, setBubbles] = useState<Bubble[]>([]);

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
		videoRef?.current?.play();
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

	return (
		<>
			<Meta />
			<div
				className='relative z-10 max-w-2xl w-screen overflow-visible'
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
					<h1
						className='text-yellow-dark font-bold'
						style={{ fontSize: '2.7rem' }}
					>
						UTMANINGEN
					</h1>
					<div className='w-60 h-64 bg-gray-200 rounded-lg flex items-center justify-center bg-opacity-60'>
						<p className='text-brown font-semibold text-lg'>[Image]</p>
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
						<video
							ref={videoRef}
							muted
							className='w-full rounded-lg'
							loop
							preload='auto'
						>
							<source
								src='http://localhost:5000/api/videos/video1'
								type='video/mp4'
							/>
						</video>
					</div>
					{['blue', 'red', 'green', 'yellow'].map(color => (
						<button
							key={color}
							onClick={() => setPhase('feedback')}
							className={`h-12 w-full mb-1 border border-brown-dark italic text-white text-xl font-bold bg-${color} ${
								phase === 'countdown' ? 'opacity-20' : ``
							}`}
							style={{
								borderRadius: 20,
								maxWidth: 285
							}}
						>
							{phase === 'countdown' ? '' : color}
						</button>
					))}
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
