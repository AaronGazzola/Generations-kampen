import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Trivia } from './trivia.interface';

const triviaSlice = createSlice({
	name: 'trivia',
	initialState: {
		loading: false
	},
	reducers: {}
});
export default triviaSlice.reducer;
