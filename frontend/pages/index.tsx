import type { NextPage } from 'next';
import React, { useEffect, useRef, useState } from 'react';
import { Keyframes } from '../components/Keyframes';
import Meta from '../components/Meta';
import { useAppSelector } from '../redux/hooks';

const Home: NextPage = () => {
	const { screenWidth, screenHeight } = useAppSelector(state => state.utils);
	const [playButtonStyle, setPlayButtonStyle] = useState({
		width: 200,
		color: 'green'
	});
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const canvasCtxRef = React.useRef<CanvasRenderingContext2D | null>(null);
	const [phase, setPhase] = useState<
		'standby' | 'play' | 'feedback' | 'countdown'
	>('standby');
	const [seconds, setSeconds] = useState(0);
	const playButtonWidth = 200;

	useEffect(() => {
		if (phase !== 'play' || !canvasRef.current) return;
		canvasCtxRef.current = canvasRef.current.getContext('2d');
		let aniId;
		canvasRef.current.width = screenWidth;
		canvasRef.current.height = screenHeight + 100;
		let w = screenWidth,
			h = screenHeight,
			particles: { x: number; y: number; d: number; respawn: () => void }[] =
				[],
			fill = true,
			color = '#63BD61',
			c: number,
			level = 100;

		interface Particle {
			x: number;
			y: number;
			d: number;
			respawn?: () => void;
		}

		function particle(this: Particle, x: number, y: number, d: number) {
			this.x = x;
			this.y = y;
			this.d = d;
			this.respawn = function () {
				this.x = Math.random() * (w * 0.8) + 0.1 * w;
				this.y = Math.random() * 30 + h - ((h - 100) * level) / 100 - 50 + 50;
				this.d = Math.random() * 5 + 5;
			};
		}

		const init = () => {
			c = 0;
			particles = [];
			particles = [];
			for (var i = 0; i < 40; i++) {
				var obj = new (particle as any)(0, 0, 0);
				obj.respawn();
				particles.push(obj);
			}
			aniId = window.requestAnimationFrame(draw);
		};

		const draw = () => {
			if (!canvasCtxRef.current) return;
			canvasCtxRef.current.clearRect(0, 0, w, h);
			canvasCtxRef.current.fillStyle = color;
			canvasCtxRef.current.strokeStyle = color;

			//draw the liquid
			canvasCtxRef.current.beginPath();
			canvasCtxRef.current.moveTo(w, h - ((h - 100) * level) / 100 - 50);
			canvasCtxRef.current.lineTo(w, h);
			canvasCtxRef.current.lineTo(0, h);
			canvasCtxRef.current.lineTo(0, h - ((h - 100) * level) / 100 - 50);
			var temp = 50 * Math.sin((c * 1) / 50);
			canvasCtxRef.current.bezierCurveTo(
				w / 3,
				h - ((h - 100) * level) / 100 - 50 - temp,
				(2 * w) / 3,
				h - ((h - 100) * level) / 100 - 50 + temp,
				w,
				h - ((h - 100) * level) / 100 - 50
			);
			canvasCtxRef.current.fill();

			//draw the bubbles
			for (var i = 0; i < 40; i++) {
				canvasCtxRef.current.beginPath();
				canvasCtxRef.current.arc(
					particles[i].x,
					particles[i].y,
					particles[i].d,
					0,
					2 * Math.PI
				);
				if (fill) canvasCtxRef.current.fill();
				else canvasCtxRef.current.stroke();
			}

			update();
			aniId = window.requestAnimationFrame(draw);
		};

		const update = () => {
			c++;
			if (100 * Math.PI <= c) c = 0;
			for (var i = 0; i < 40; i++) {
				particles[i].x = particles[i].x + Math.random() * 2 - 1;
				particles[i].y = particles[i].y - 1;
				particles[i].d = particles[i].d - 0.04;
				if (particles[i].d <= 0) particles[i].respawn();
			}
		};
		if (seconds === 60) init();
	}, [seconds, phase]);

	const startTriviaTimer = () => {
		setPhase('play');
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
		setPhase('countdown');
		let sec = 4;
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
			<Keyframes
				from={{
					transform: `scale(1)`
				}}
				to={{ transform: 'scale(10)' }}
				name='playButtonExpand'
			/>
			{/* Play button */}
			{/* <div
				className={`fixed top-0 left-0 origin-center w-10 h-10 rounded-full bg-${
					phase === 'countdown'
						? 'green'
						: `${playButtonStyle.color} cursor-pointer`
				} ${['standby', 'countdown'].includes(phase) ? '' : 'hidden'}`}
				style={{
					animation:
						phase === 'countdown'
							? 'playButtonExpand .5s cubic-bezier( 0.87, -0.1, 0.98, 0.06 )  forwards'
							: ''
				}}
			></div> */}
			<div
				className='flex items-center justify-center fixed top-0 left-0 right-0 bottom-0'
				style={{
					display: ['countdown', 'standby'].includes(phase) ? 'flex' : 'none'
				}}
			>
				<button
					className={`text-white font-semibold text-4xl bg-green ${
						phase === 'standby' ? 'hover:bg-green-light' : ''
					} origin-center ${
						['standby', 'countdown'].includes(phase) ? '' : 'hidden'
					}`}
					onMouseOver={() =>
						setPlayButtonStyle(prev => ({ ...prev, color: 'green-light' }))
					}
					onMouseOut={() =>
						setPlayButtonStyle(prev => ({ ...prev, color: 'green' }))
					}
					onMouseUp={playHandler}
					style={{
						width: playButtonWidth,
						height: playButtonWidth,
						borderRadius: '50%',
						transform: phase === 'countdown' ? `scale(15)` : '',
						transition: 'all 1s cubic-bezier( 0.85, -0.1, 0.66, 0.68 )'
					}}
					onClick={playHandler}
				>
					<span
						className={`transition-opacity ease-in duration-500 ${
							phase !== 'standby' ? 'opacity-0' : ''
						}`}
					>
						Play
					</span>
				</button>
			</div>
			{/* Countdown */}
			<p
				className={`fixed top-1/2 left-1/2 text-7xl text-white ${
					phase === 'countdown' && seconds !== 4 ? '' : 'hidden'
				}`}
				style={{
					animation:
						phase === 'countdown' && [1, 2, 3].includes(seconds)
							? 'countdown 1s ease infinite'
							: ''
				}}
			>
				{seconds}
			</p>

			{/* timer seconds */}
			<p>{seconds}</p>

			{/* Liquid timer */}
			<canvas
				className={`fixed top-0 left-0 ${phase === 'play' ? '' : 'hidden'}`}
				ref={canvasRef}
				style={{
					animation: 'drain 60s linear forwards'
				}}
			></canvas>
			<div
				className={`w-screen h-screen bg-green fixed top-full left-0 transform -translate-y-14 ${
					phase === 'play' && seconds > 50 ? '' : 'hidden'
				}`}
			></div>

			{/* <div className={`fixed top-0 left-0 w-screen ${phase === 'play' ? '' : 'hidden'}`} style={{height:'calc((var(--vh) * 100)'}}></div> */}

			{/* {phase === 'standby' ? (
				<></>
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
			)} */}
		</>
	);
};

export default Home;
