import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UtilsState {
	breakpoint: string;
	screenWidth: number;
	screenHeight: number;
	headerHeight: number;
	footerHeight: number;
	minDrawerWidth: number;
	maxDrawerWidth: number;
}

const initialState: UtilsState = {
	breakpoint: 'xs',
	screenWidth: 0,
	screenHeight: 0,
	headerHeight: 56,
	footerHeight: 112,
	minDrawerWidth: 36,
	maxDrawerWidth: 147
};

const utilsSlice = createSlice({
	name: 'utils',
	initialState,
	reducers: {
		setDimensions: (state, action) => (state = { ...state, ...action.payload })
	}
});

export const { setDimensions } = utilsSlice.actions;

export default utilsSlice.reducer;
