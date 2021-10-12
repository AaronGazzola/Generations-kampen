import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Trivia, TriviaResponse, TriviaState } from './trivia.interface';

const config = {
	headers: {
		'Content-Type': 'application/json'
	}
};

const baseUrl =
	process.env.NODE_ENV === 'production'
		? process.env.NEXT_PUBLIC_BASE_URL_PROD
		: process.env.NEXT_PUBLIC_BASE_URL_DEV;

export const addTrivia = createAsyncThunk(
	'trivia/add',
	async (trivia: Trivia, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: TriviaResponse = await axios.post(
				`${baseUrl}/api/trivia`,
				trivia,
				{
					headers: {
						...config.headers,
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

export const uploadVideo = createAsyncThunk(
	'video/upload',
	async (
		{ video, id }: { video: File; id: string },
		{ rejectWithValue, getState }
	) => {
		const {
			users: { token }
		} = getState() as RootState;

		const formData: FormData = new FormData();
		formData.append('video', video);

		try {
			const { data }: TriviaResponse = await axios.post(
				`${baseUrl}/api/videos/${id}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
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

const initialState: TriviaState = {
	loading: false
};

const triviaSlice = createSlice({
	name: 'trivia',
	initialState,
	reducers: {
		clearTriviaTrigger(state) {
			state.trigger = '';
		}
	},
	extraReducers: builder => {
		builder.addCase(addTrivia.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(addTrivia.fulfilled, (state, action) => {
			state.loading = false;
			state.trivia = action.payload.trivia;
			state.success = 'Trivia added';
			state.trigger = 'uploadVideo';
		});
		builder.addCase(addTrivia.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
		builder.addCase(uploadVideo.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(uploadVideo.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Video uploaded';
			state.trigger = 'videoUploaded';
		});
		builder.addCase(uploadVideo.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
	}
});
export const { clearTriviaTrigger } = triviaSlice.actions;
export default triviaSlice.reducer;
