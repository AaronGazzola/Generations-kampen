export interface User {
	password: string;
	resetPasswordToken: string;
	resetPasswordExpire: Date;
	email: string;
	_id: string;
}

export interface UsersState {
	user?: User | string;
	isAuth: boolean;
	token?: string;
	loading: boolean;
	success?: string;
	error?: string;
	alert?: string;
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
