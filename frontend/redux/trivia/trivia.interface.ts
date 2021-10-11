export interface Trivia {
	_id: string;
	question: string;
	answers: {
		a: string;
		b: string;
		c: string;
		d: string;
	};
}

export interface TriviaState {
	trivia?: Trivia;
	video?: string;
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
}

export interface TriviaResponse {
	data: {
		success: boolean;
		trivia: Trivia;
	};
}
