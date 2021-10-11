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
				`${baseUrl}/api/users`,
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

const initialState: UsersState = {
	loading: false,
	isAuth: false
};

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(login.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(login.fulfilled, (state, action) => {
			state.loading = false;
			state.user = action.payload.user;
			state.token = action.payload.token;
			state.isAuth = !!action.payload.token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
	}
});
export default usersSlice.reducer;
