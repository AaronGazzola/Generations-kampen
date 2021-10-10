import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { TriviaState } from './trivia.interface';

const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

const baseUrl =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_BASE_URL_PROD
		: process.env.NEXT_PUBLIC_BASE_URL_DEV;

export const getVideo = createAsyncThunk(
	'trivia/getVideo',
	async (_, { rejectWithValue, getState }) => {
		try {
			const { data } = await axios.get(`${baseUrl}/api/videos`, config);
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

const initialState: TriviaState = {
	loading: false
};

const triviaSlice = createSlice({
	name: 'trivia',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getVideo.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getVideo.fulfilled, (state, action) => {
			state.loading = false;
			state.video = action.payload;
			console.log(action.payload);
		});
		builder.addCase(getVideo.rejected, (state, action) => {
			state.error = { message: action.payload as string };
			state.loading = false;
		});
	}
});
export default triviaSlice.reducer;
