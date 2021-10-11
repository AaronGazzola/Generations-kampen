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

const initialState: TriviaState = {
	loading: false
};

const triviaSlice = createSlice({
	name: 'trivia',
	initialState,
	reducers: {}
});
export default triviaSlice.reducer;
