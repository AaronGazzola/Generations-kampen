import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Meta from '../components/Meta';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
	clearTriviaTrigger,
	getTrivia,
	submitFeedback
} from '../redux/trivia/trivia.slice';
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
	const questionRef = useRef<HTMLHeadingElement>(null);
	const srcRef = useRef<HTMLSourceElement>(null);
	const buttonBoxRef = useRef<HTMLDivElement>(null);
	const [phase, setPhase] = useState<
		'standby' | 'countdown' | 'question' | 'answer' | 'feedback' | 'reset'
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
	const [selectedAnswer, setSelectedAnswer] = useState<string>('');
	const waterColor = '#228ABF';
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
		setPhase('question');
		videoRef?.current?.play();
		let sec = 60;
		setSeconds(sec);
		const timer = setInterval(() => {
			sec--;
			setSeconds(sec);
			if (sec === 0 || phase === 'answer') {
				clearInterval(timer);
				if (phase === 'question') setPhase('answer');
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

	const answerHandler = (answer: string) => {
		if (phase !== 'question') return;
		setPhase('answer');
		setSelectedAnswer(answer);
		videoRef.current?.pause();
	};

	const feedbackHandler = (feedback: 'positive' | 'negative') => {
		if (trivia) dispatch(submitFeedback({ feedback, id: trivia._id || '' }));
		setPhase('reset');
		setGotTrivia(false);
		setTimeout(() => {
			setPhase('standby');
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
			phase === 'question' &&
			((buttonBoxRef.current?.scrollTop &&
				buttonBoxRef.current?.scrollTop > 0) ||
				buttonBoxRef.current?.offsetHeight ===
					buttonBoxRef.current?.scrollHeight)
		)
			setShowScrollIcon(false);
	}, [buttonBoxRef.current?.scrollTop, buttonBoxRef.current, phase]);

	useEffect(() => {
		const videoMetaDataHandler = () => {
			if (buttonBoxRef.current && videoRef.current && questionRef.current)
				setVideoWidth(
					`clamp(280px, 100%, calc(((var(--vh) * 100) - ${
						questionRef.current.offsetHeight
					}px - ${
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
	}, [videoRef.current, buttonBoxRef.current, questionRef.current]);

	return (
		<>
			<Meta />
			{['answer', 'feedback', 'reset'].includes(phase) && (
				<div
					className='fixed top-0 left-0 right-0 bottom-0 z-20 flex items-center justify-center opacity-0'
					style={{
						animation:
							phase === 'reset'
								? 'fade-out .5s ease-in-out forwards'
								: 'fade-in .5s ease-in-out 3s forwards',
						backgroundColor: 'rgba(0,0,0,0.7)'
					}}
				>
					{phase === 'feedback' && (
						<div
							className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10  w-full max-w-xs p-4'
							style={{ animation: 'fade-in .5s forwards' }}
						>
							<div className='pb-5 pt-6 px-6  rounded-lg bg-brown flex flex-col items-center w-full h-full'>
								<h2 className='text-white italic w-full text-center mb-6 font-bold text-2xl'>
									Vad tycker om du om fr&aring;gan?
								</h2>
								<div className='flex w-full'>
									<button
										onClick={() => feedbackHandler('positive')}
										className={`border border-brown-dark italic text-white text-2xl font-bold bg-green-light flex-grow`}
										style={{
											borderRadius: 20,
											height: 40
										}}
									>
										Bra
									</button>
									<div className='w-5'></div>
									<button
										onClick={() => feedbackHandler('negative')}
										className={`border border-brown-dark italic text-white text-2xl font-bold bg-red-lightest flex-grow`}
										style={{
											borderRadius: 20,
											height: 40
										}}
									>
										D&Aring;lig
									</button>
								</div>
							</div>
						</div>
					)}
					<div
						className={`sm:p-8 p-4 transition-opacity ease-in-out .5s ${
							['feedback', 'reset'].includes(phase) ? 'opacity-0' : ''
						}`}
						style={{ width: videoWidth }}
					>
						<div className='w-full flex flex-col justify-center'>
							<h1
								className={`text-8xl font-semibold italic w-full text-center ${
									selectedAnswer === trivia?.correctAnswer
										? 'text-green-lightest'
										: 'text-red-lightest'
								}`}
								style={{ textShadow: '6px 6px rgba(0,0,0,0.8)' }}
							>
								{selectedAnswer === trivia?.correctAnswer ? (
									<>
										R&Auml;TT
										<br />
										SVAR!
									</>
								) : (
									<>
										FEL
										<br />
										SVAR!
									</>
								)}
							</h1>
							<h2
								className='text-white italic w-full text-center p-4 font-bold text-2xl'
								style={{ textShadow: '2px 2px rgba(0,0,0,0.8)' }}
							>
								{selectedAnswer === trivia?.correctAnswer ? (
									'BRA JOBBAT!'
								) : (
									<>
										R&auml;tt svar:
										<br />
										{
											trivia?.[
												`answer${trivia?.correctAnswer.toLocaleUpperCase()}`
											]
										}
									</>
								)}
							</h2>
							<button
								onClick={() => setPhase('feedback')}
								className={`h-12 border border-brown-dark italic text-white text-2xl font-bold bg-green-light`}
								style={{
									borderRadius: 25,
									minHeight: 50
								}}
							>
								OK
							</button>
						</div>
					</div>
				</div>
			)}
			<div className='fixed top-0 left-0 bottom-0 right-0 flex flex-col items-center justify-center overflow-visible z-10'>
				<div className='w-full h-full max-w-4xl overflow-visible relative'>
					<div
						className='absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center'
						style={{
							transform: ['standby', 'reset'].includes(phase)
								? 'translateX(0%)'
								: 'translateX(-100%)',
							opacity: ['standby', 'reset'].includes(phase) ? 1 : 0,
							transition: 'all .8s cubic-bezier( 0.87, 0, 0.34, 1.02 )'
						}}
					>
						<div className='flex flex-col-reverse items-center justify-around w-full h-full'>
							<button
								onClick={playHandler}
								className={`rounded-md bg-brown-dark text-yellow-dark text-6xl z-10 tracking-wider ${
									screenHeight > 800 ? 'sm:text-8xl' : ''
								} font-bold px-4 py-3 mb-4`}
								style={{
									fontFamily: "'Londrina Solid', sans-serif"
								}}
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
									className='absolute top-0 left-0 right-0 bottom-0 opacity-0 origin-center'
									style={{
										animation: !['answer', 'question'].includes(phase)
											? 'chest-glow 4s ease-in-out .6s infinite'
											: ''
									}}
								>
									<Image src={chestGlow} layout='responsive' />
								</div>
								<div
									className='absolute top-0 left-0 right-0 bottom-0 origin-center'
									style={{
										animation: !['answer', 'question'].includes(phase)
											? 'chest-pulse 2s ease-in-out infinite alternate'
											: ''
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
							transform: !['standby', 'reset'].includes(phase)
								? 'translateX(0%)'
								: 'translateX(100%)',
							opacity: !['standby', 'reset'].includes(phase) ? 1 : 0,
							transition: 'all .8s cubic-bezier( 0.87, 0, 0.34, 1.02 )'
						}}
					>
						<h1
							ref={questionRef}
							className='whitespace-nowrap text-white font-bold italic'
							style={{
								fontSize: '1.2rem',
								opacity: ['standby', 'countdown'].includes(phase) ? 0 : 1
							}}
						>
							{trivia?.question}
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
								className='w-full rounded-lg'
								loop
								preload='auto'
								onClick={() =>
									videoRef.current?.paused
										? videoRef.current?.play()
										: videoRef.current?.pause()
								}
							>
								<source ref={srcRef} type='video/mp4' />
							</video>
						</div>
						{phase === 'question' && showScrollIcon && (
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
							{[
								{ key: 'a', color: 'blue' },
								{ key: 'b', color: 'red' },
								{ key: 'c', color: 'green' },
								{ key: 'd', color: 'yellow' }
							].map(item => (
								<button
									key={item.key}
									onClick={() => answerHandler(item.key)}
									className={`w-full mb-2 border border-brown-dark italic text-white text-xl font-bold bg-${
										item.color
									} ${
										phase === 'countdown'
											? 'opacity-20'
											: ['answer', 'feedback'].includes(phase) &&
											  selectedAnswer !== item.key
											? `opacity-0`
											: ''
									}
									${['countdown', 'answer', 'feedback'].includes(phase) ? 'cursor-default' : ``}`}
									style={{
										borderRadius: 25,
										padding: '11px 8px',
										// minHeight: 50,
										transition:
											phase === 'answer' && selectedAnswer !== item.key
												? 'opacity .5s ease 1.5s'
												: ''
									}}
								>
									<span
										className={`${phase === 'countdown' ? 'opacity-0' : ''}`}
									>
										{trivia?.[`answer${item.key.toLocaleUpperCase()}`]}
									</span>
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
						phase === 'countdown'
							? 'translateY(0%)'
							: phase === 'question'
							? 'translateY(100%)'
							: 'translateY(101%)',
					transition:
						phase === 'question'
							? 'transform 60s linear'
							: phase === 'answer'
							? 'transform 3s ease'
							: 'transform 1.5s ease 0.8s',
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
					<g
						className={`${
							['countdown', 'question', 'answer'].includes(phase)
								? 'parallax'
								: ''
						}`}
					>
						<use
							xlinkHref='#gentle-wave'
							x='48'
							y='0'
							style={{ fill: waterColor, opacity: 0.2 }}
						/>
						<use
							xlinkHref='#gentle-wave'
							x='48'
							y='3'
							style={{ fill: waterColor, opacity: 0.3 }}
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
					<g
						className={`${
							['countdown', 'question', 'answer'].includes(phase)
								? 'parallax'
								: ''
						}`}
					>
						<use
							xlinkHref='#gentle-wave'
							x='48'
							y='5'
							style={{ fill: waterColor, opacity: 0.05 }}
						/>
					</g>
				</svg>
				<div
					className='absolute h-full w-full overflow-visible z-10 opacity-50'
					style={{
						top: 40,
						backfaceVisibility: 'hidden',
						backgroundColor: waterColor
					}}
				>
					{bubbles.map(bubble => (
						<div
							key={bubble.key}
							className={`absolute border border-white  w-${bubble.width} h-${bubble.width} rounded-full`}
							style={{
								left: bubble.x,
								bottom: bubble.width,
								animation:
									phase !== 'standby'
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
