export interface User {
	password: string;
	resetPasswordToken: string;
	resetPasswordExpire: Date;
	email: string;
	_id: string;
}

export interface UsersState {
	user?: User;
	isAuth: boolean;
	token?: string;
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

export interface LoginData {
	password: string;
	username: string;
}

export interface UsersResponse {
	data: {
		success: boolean;
		token?: string;
		user?: User;
	};
}
