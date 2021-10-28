import enableInlineVideo from 'iphone-inline-video';

export const useIphoneInlineVideo = () => {
	const makeInline = element => {
		enableInlineVideo(element);
	};
	return makeInline;
};
