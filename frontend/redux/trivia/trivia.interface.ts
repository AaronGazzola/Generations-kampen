export interface Trivia {
	_id?: string;
	question: string;
	answerA: string;
	answerB: string;
	answerC: string;
	answerD: string;
	feedback?: {
		positive: number;
		negative: number;
	};
}

export interface TriviaState {
	trivia?: Trivia;
	loading: boolean;
	success?: string;
	error?: string;
	alert?: string;
	trigger?: string;
	allTrivia?: Trivia[];
}

export interface TriviaResponse {
	data: {
		success: boolean;
		trivia?: Trivia;
		allTrivia?: Trivia[];
	};
}
