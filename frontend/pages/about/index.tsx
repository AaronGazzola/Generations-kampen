import Meta from '../../components/Meta';
import Image from 'next/image';
import nangarraLogo from '../../public/assets/images/nangarra-games.png';
import apexAppsLogo from '../../public/assets/svg/apexapps_logo.svg';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Link from 'next/link';

const Index = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<Meta title='About | Generations kampen' />
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
				<Link href='/'>
					<MenuItem
						style={{
							fontFamily: "'Londrina Solid', sans-serif",
							color: '#fff'
						}}
						onClick={handleClose}
					>
						Utmaningen
					</MenuItem>
				</Link>
				<Link href='/regler'>
					<MenuItem
						style={{
							fontFamily: "'Londrina Solid', sans-serif",
							color: '#fff'
						}}
						onClick={handleClose}
					>
						Regler
					</MenuItem>
				</Link>
				<a
					rel='noreferrer noopener'
					target='_blank'
					href='https://bellvivo.com/lek-spel/generationskampen-spelet'
				>
					<MenuItem
						style={{
							fontFamily: "'Londrina Solid', sans-serif",
							color: '#fff'
						}}
						onClick={handleClose}
					>
						Buy
					</MenuItem>
				</a>
			</Menu>
			<div
				className='max-w-xl text-white px-6'
				style={{ fontFamily: "'Londrina Solid', sans-serif" }}
			>
				<h1
					className='text-6xl text-white mt-4 text-center'
					style={{
						textShadow: '2px 2px 2px black'
					}}
				>
					About
				</h1>
				<p
					className='text-3xl text-white mt-4 mb-6 text-center'
					style={{ textShadow: '1px 1px 1px black' }}
				>
					Generations kampen was created by:
				</p>
				<div className='flex justify-center'>
					<a
						href='https://www.nangarra.com/'
						rel='noreferrer noopener'
						target='_blank'
					>
						<div
							className='rounded-md p-2  '
							style={{ backgroundColor: '#ed3833', width: 240 }}
						>
							<Image
								src={nangarraLogo}
								alt='Nangarra logo'
								layout='responsive'
							/>
						</div>
					</a>
				</div>
				<p
					className='text-3xl text-white mt-6 mb-4 text-center'
					style={{ textShadow: '1px 1px 1px black' }}
				>
					App designed and developed by:
				</p>
				<div className='flex flex-col items-center justify-center'>
					<a
						href='https://www.apexapps.com.au/'
						rel='noreferrer noopener'
						target='_blank'
					>
						<div className='' style={{ width: 100 }}>
							<Image
								src={apexAppsLogo}
								alt='Apex Apps logo'
								layout='responsive'
							/>
						</div>
						<p
							className='text-lg text-center'
							style={{
								color: '#E0EBF5',
								fontFamily: "'Montserrat', sans-serif",
								fontWeight: 700,
								textShadow: '2px 2px 2px #336699'
							}}
						>
							Apex Apps
						</p>
					</a>
				</div>
			</div>
		</>
	);
};

export default Index;
