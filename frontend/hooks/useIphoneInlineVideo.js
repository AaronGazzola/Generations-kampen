import enableInlineVideo from 'iphone-inline-video';
import { useEffect, useState } from 'react';

const useIphoneInlineVideo = firstVideoLoaded => {
	const [mounted, setMounted] = useState(false);
	const [isInline, setIsInline] = useState(false);
	useEffect(() => {
		if (!mounted) setMounted(true);
		if (mounted && !isInline && firstVideoLoaded) {
			const screenActiveVideo = document.getElementById('screen-active-video');
			const questionVideo = document.getElementById('question-video');
			const countdownVideo = document.getElementById('countdown-video');
			enableInlineVideo(screenActiveVideo);
			enableInlineVideo(questionVideo);
			enableInlineVideo(countdownVideo);
			screenActiveVideo.play();
			setIsInline(true);
		}
	}, [mounted, firstVideoLoaded]);
	return { isInline };
};

export default useIphoneInlineVideo;
