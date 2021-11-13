import { useState } from 'react';
import Meta from '../../components/Meta';
import Image from 'next/image';
import image1 from '../../public/assets/images/Generationskampen_top.png';
import image2 from '../../public/assets/images/Generationskampen_mid.png';
import image3 from '../../public/assets/images/Generationskampen_bottom.png';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

const index = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<div
			className='w-screen overflow-y-scroll flex flex-col items-center'
			style={{ height: 'calc(var(--vh) * 100)' }}
		>
			<Meta title='Regler | Generations kampen' />
			<div className='fixed max-w-xl w-full top-0 left-1/2 transform -translate-x-1/2 flex justify-end'>
				<div className='cursor-pointer' onClick={handleClick}>
					<svg
						className='m-2 w-7 h-7 text-white fill-current'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='-2 -2 24 24'
						width='24'
						fill='currentColor'
					>
						<path d='M10 20C4.477 20 0 15.523 0 10S4.477 0 10 0s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0-10a1 1 0 0 1 1 1v5a1 1 0 0 1-2 0V9a1 1 0 0 1 1-1zm0-1a1 1 0 1 1 0-2 1 1 0 0 1 0 2z'></path>
					</svg>
				</div>
			</div>
			<Menu
				id='demo-positioned-menu'
				aria-labelledby='demo-positioned-button'
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right'
				}}
				sx={{
					'& .MuiList-root': {
						margin: 0,
						backgroundColor: '#c0532d'
					}
				}}
			>
				<MenuItem
					style={{
						fontFamily: "'Londrina Solid', sans-serif",
						color: '#fff'
					}}
					onClick={handleClose}
				>
					<Link href='/'>Utmaningen</Link>
				</MenuItem>
				<MenuItem
					style={{
						fontFamily: "'Londrina Solid', sans-serif",
						color: '#fff'
					}}
					onClick={handleClose}
				>
					About
				</MenuItem>
				<MenuItem
					style={{
						fontFamily: "'Londrina Solid', sans-serif",
						color: '#fff'
					}}
					onClick={handleClose}
				>
					Buy
				</MenuItem>
			</Menu>
			<div
				className='max-w-xl text-white px-6'
				style={{ fontFamily: "'Londrina Solid', sans-serif" }}
			>
				<div className='w-full -mt-3 sm:-mt-5'>
					<Image src={image1} layout='responsive' />
				</div>
				<p
					className='text-3xl text-white mt-4 mb-6'
					style={{ textShadow: '1px 1px 1px black' }}
				>
					Generationskampen är ett busenkelt spel för hela släkten. Svara på
					frågor från fyra generationer och ta dig i mål först för att vinna. Du
					får svara på frågor om musik, film, populärkultur och nyheter.
				</p>
				<Image src={image2} layout='responsive' />
				<Image src={image3} layout='responsive' />
				<h1
					className='text-6xl text-white mt-4 text-center'
					style={{ textShadow: '2px 2px 2px black' }}
				>
					Regler{' '}
				</h1>
				<p
					className='text-3xl text-white my-4'
					style={{ textShadow: '1px 1px 1px black' }}
				>
					Börja med att dela upp lagen. Välj mellan att spela generation mot
					generation eller mixa lagen jämt. Det finns fyra lag att välja mellan
					och varje lag har sin egen spelpjäs. Målet med spelet är att ta sig
					ett helt varv runt spelplanen och det laget som lyckas vinner. Skanna
					QR koden med en av deltagarnas telefon och lägg telefonen i mitten av
					spelbordet. När en spelare hamnar på Utmaningen så använd er av
					mobilen för att spela upp den digitala frågan.
				</p>

				<h1
					className='text-6xl text-white mt-8 text-center'
					style={{ textShadow: '2px 2px 2px black' }}
				>
					Spelstart{' '}
				</h1>
				<p
					className='text-3xl text-white my-4 mb-10'
					style={{ textShadow: '1px 1px 1px black' }}
				>
					Placera ut eran spelpjäs på startpositionen. Låt alla lagen slå
					tärningen en gång och se vem som får högst siffra. Det laget som slår
					högst börjar, turen går sedan medsols. Varje spelomgång börjar med att
					varje lag slå tärningen och flytta lika många steg på spelplanen.
					Flytta pjäsen lika många rutor som tärningen visar och låt ett
					motståndarlag ta upp ett Generationskort av samma färg som rutan ni
					hamnar på. Motståndarlaget vänder timglaset och läser frågan med
					ikonen som er spelpjäs står på. Svarar laget rätt innan tiden går ut
					så får deras spelpjäs stå kvar och turen går vidare till nästa lag.
					Svarar de fel eller tiden går ut, så får de gå tillbaka till sin
					tidigare plats på spelplanen. Först i mål vinner. Lycka till!
				</p>
			</div>
		</div>
	);
};

export default index;
