import enableInlineVideo from 'iphone-inline-video';
import { useEffect, useState } from 'react';

const useIphoneInlineVideo = () => {
	const [mounted, setMounted] = useState(false);
	const [isInline, setIsInline] = useState(false);
	useEffect(() => {
		if (!mounted) setMounted(true);
		if (mounted && !isInline) {
			const screenActiveVideo = document.getElementById('screen-active-video');
			const questionVideo = document.getElementById('question-video');
			const countdownVideo = document.getElementById('countdown-video');
			enableInlineVideo(screenActiveVideo);
			enableInlineVideo(questionVideo);
			enableInlineVideo(countdownVideo);
			setIsInline(true);
			console.log('done');
			screenActiveVideo.play();
		}
	}, [mounted]);
	return;
};

export default useIphoneInlineVideo;
