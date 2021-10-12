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
	success?: string;
	error?: string;
	alert?: string;
	noUser?: boolean;
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
