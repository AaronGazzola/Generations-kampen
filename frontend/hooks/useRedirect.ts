import { useEffect, useState } from 'react';

const useRedirect = () => {
	const [mounted, setMounted] = useState<boolean>(false);
	const [isGenappUrl, setIsGenappUrl] = useState<boolean>(false);

	useEffect(() => {
		if (!mounted) setMounted(true);
		if (mounted && process.env.NODE_ENV === 'production') {
			const currentLocatoin = window.location.href;
			// if rules subdomain, redirect to rules route
			if (
				currentLocatoin.includes('generationskampen.nangarra.games') ||
				currentLocatoin.includes('genregler.nangarra.games')
			) {
				window.location.href = 'https://genapp.nangarra.games/regler';
				// if not genapp subdomain, redirect to genapp subdomain
			} else if (!currentLocatoin.includes('/genapp.nangarra.games')) {
				window.location.href = 'https://genapp.nangarra.games';
				// If on genapp subdomain, display content
			} else {
				setIsGenappUrl(true);
			}
		} else if (mounted && process.env.NODE_ENV === 'development') {
			setIsGenappUrl(true);
		}
	}, [mounted]);

	return { isGenappUrl };
};

export default useRedirect;
