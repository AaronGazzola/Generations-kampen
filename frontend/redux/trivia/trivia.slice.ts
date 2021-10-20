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

export const updateTrivia = createAsyncThunk(
	'trivia/update',
	async (trivia: Trivia, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;
		try {
			const { data }: TriviaResponse = await axios.put(
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

export const getAllTrivia = createAsyncThunk(
	'trivia/getAll',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: TriviaResponse = await axios.get(
				`${baseUrl}/api/trivia`,
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

export const getTrivia = createAsyncThunk(
	'trivia/get',
	async (_, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		const localPastTrivia = localStorage.getItem('pastTrivia');

		const pastTrivia: string[] = localPastTrivia
			? JSON.parse(localPastTrivia)
			: [];

		try {
			const { data }: TriviaResponse = await axios.post(
				`${baseUrl}/api/trivia/play`,
				{ pastTrivia },
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

export const deleteTrivia = createAsyncThunk(
	'trivia/delete',
	async (id: string, { rejectWithValue, getState }) => {
		const {
			users: { token }
		} = getState() as RootState;

		try {
			const { data }: TriviaResponse = await axios.delete(
				`${baseUrl}/api/trivia/${id}`,
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

export const submitFeedback = createAsyncThunk(
	'trivia/submitFeedback',
	async (
		{ feedback, id }: { feedback: string; id: string },
		{ rejectWithValue, getState }
	) => {
		try {
			const { data }: TriviaResponse = await axios.post(
				`${baseUrl}/api/trivia/feedback`,
				{ feedback, id },
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

const initialState: TriviaState = {
	loading: false
};

const triviaSlice = createSlice({
	name: 'trivia',
	initialState,
	reducers: {
		clearTriviaTrigger(state) {
			state.trigger = '';
		},
		clearTriviaFeedback(state) {
			state.success = '';
			state.error = '';
			state.alert = '';
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
		builder.addCase(updateTrivia.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(updateTrivia.fulfilled, (state, action) => {
			state.loading = false;
			state.trivia = action.payload.trivia;
			state.success = 'Trivia updated';
			state.trigger = 'uploadVideo';
		});
		builder.addCase(updateTrivia.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
		builder.addCase(deleteTrivia.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(deleteTrivia.fulfilled, (state, action) => {
			state.loading = false;
			state.success = 'Trivia deleted';
			state.trigger = 'triviaDeleted';
		});
		builder.addCase(deleteTrivia.rejected, (state, action) => {
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
		builder.addCase(getAllTrivia.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getAllTrivia.fulfilled, (state, action) => {
			state.loading = false;
			state.allTrivia = action.payload.allTrivia;
		});
		builder.addCase(getAllTrivia.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
		builder.addCase(getTrivia.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(getTrivia.fulfilled, (state, action) => {
			state.loading = false;
			state.trivia = action.payload.trivia;
			state.trigger = 'showVideo';
			const localPastTrivia = localStorage.getItem('pastTrivia');

			const pastTrivia: string[] = localPastTrivia
				? JSON.parse(localPastTrivia)
				: [];

			if (action.payload.trivia)
				pastTrivia.push(action.payload.trivia._id || '');

			localStorage.setItem(
				'pastTrivia',
				JSON.stringify(action.payload.resetPastTrivia ? [] : pastTrivia)
			);
		});
		builder.addCase(getTrivia.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
		builder.addCase(submitFeedback.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(submitFeedback.fulfilled, (state, action) => {
			state.loading = false;
		});
		builder.addCase(submitFeedback.rejected, (state, action) => {
			state.error = action.payload as string;
			state.loading = false;
		});
	}
});
export const { clearTriviaTrigger, clearTriviaFeedback } = triviaSlice.actions;
export default triviaSlice.reducer;
