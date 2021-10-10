export interface Trivia {
	question: string;
	answers: {
		a: string;
		b: string;
		c: string;
		d: string;
	};
}

export interface TriviaState {
	loading: boolean;
	success?: {
		title?: string;
		message: string;
	};
	error?: {
		title?: string;
		message: string;
	};
	alert?: {
		title?: string;
		message: string;
	};
	trivia?: Trivia;
	video?: string;
}
