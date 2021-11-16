import Meta from '../../components/Meta';
import Image from 'next/image';
import nangarraLogo from '../../public/assets/images/nangarra-games.png';
import apexAppsLogo from '../../public/assets/svg/apexapps_logo.svg';

const Index = () => {
	return (
		<>
			<Meta title='About | Generations kampen' />
			<div style={{ fontFamily: "'Londrina Solid', sans-serif" }}>
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
