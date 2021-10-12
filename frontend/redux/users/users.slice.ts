import { LoginData, UsersResponse } from './users.interface';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UsersState } from './users.interface';
import { RootState } from '../store';

const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

const baseUrl =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_BASE_URL_PROD
		: process.env.NEXT_PUBLIC_BASE_URL_DEV;

export const login = createAsyncThunk(
	'users/login',
	async (loginData: LoginData, { rejectWithValue, getState }) => {
		try {
			const { data }: UsersResponse = await axios.post(
				`${baseUrl}/api/auth/login`,
				loginData,
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const forgotPassword = createAsyncThunk(
	'users/forgotPassword',
	async (email: string, { rejectWithValue, getState }) => {
		try {
			const { data }: UsersResponse = await axios.post(
				`${baseUrl}/api/users/forgot-password`,
				{ email },
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const resetPassword = createAsyncThunk(
	'users/resetPassword',
	async (
		{ password, token }: { token: string; password: string },
		{ rejectWithValue, getState }
	) => {
		try {
			const { data }: UsersResponse = await axios.post(
				`${baseUrl}/api/users/reset-password`,
				{ password, token },
				config
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

export const getUser = createAsyncThunk(
	'users/getUser',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token: stateToken }
		} = getState() as RootState;

		const localUserData = localStorage.getItem('userData');

		let localToken = '';
		if (localUserData) localToken = JSON.parse(localUserData).token;

		const token = localToken ? localToken : stateToken ? stateToken : '';

		if (!token) return;
		try {
			const { data }: UsersResponse = await axios.get(
				`${baseUrl}/api/auth/get-user`,
				{
					headers: {
						'Authorization': `Bearer ${token}`
					}
				}
			);
			return data;
		} catch (error: any) {
			return rejectWithValue(
				error.response && error.response.data.message
					? error.response.data.message
					: error.message
			);
		}
	}
);

const initialState: UsersState = {
	loading: false,
	isAuth: false
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		clearUserFeedback(state) {
			state.success = '';
			state.error = '';
			state.alert = '';
		},
		logout(state) {
			state.isAuth = false;
			state.user = undefined;
			localStorage.removeItem('userData');
			state.token = '';
		}
	},
	extraReducers: builder => {
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuth = !!action.payload.token;
			state.success = 'Welcome!';
			localStorage.setItem(
				'userData',
				JSON.stringify({
					user: action.payload.user,
					isAuth: !!action.payload.token,
					token: action.payload.token
				})
			);
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
		builder.addCase(getUser.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getUser.fulfilled, (state, action) => {
			state.loading = false;
			if (action.payload) {
				state.user = action.payload.user;
				state.isAuth = !!action.payload.token;
				state.token = action.payload.token;
			} else {
				state.user = 'noUser';
			}
		});
		builder.addCase(getUser.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
		builder.addCase(forgotPassword.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(forgotPassword.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Email sent';
		});
		builder.addCase(forgotPassword.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
		builder.addCase(resetPassword.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(resetPassword.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Password reset';
		});
		builder.addCase(resetPassword.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
	}
});

export const { clearUserFeedback, logout } = usersSlice.actions;
export default usersSlice.reducer;
