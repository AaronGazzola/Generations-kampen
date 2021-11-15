import { useEffect, useState } from 'react';

const useRedirect = () => {
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => {
		if (!mounted) setMounted(true);
		if (mounted) {
			const currentLocatoin = window.location.href;
			if (
				currentLocatoin.includes('/nangarra.games') ||
				currentLocatoin.includes('www.nangarra.games')
			) {
				window.location.href = 'https://genapp.nangarra.games';
			} else if (
				currentLocatoin.includes('generationskampen.nangarra.games') ||
				currentLocatoin.includes('genregler.nangarra.games')
			) {
				window.location.href = 'https://genapp.nangarra.games/regler';
			}
		}
	}, [mounted]);
};

export default useRedirect;
