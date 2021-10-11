import { LoginData } from './users.interface';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { UsersState } from './users.interface';

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
			const { data } = await axios.post(
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
			const { data } = await axios.post(
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
			const { data } = await axios.post(
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
		});
		builder.addCase(login.rejected, (state, action) => {
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

export const { clearUserFeedback } = usersSlice.actions;
export default usersSlice.reducer;
