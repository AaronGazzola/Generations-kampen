import { configureStore } from '@reduxjs/toolkit';
import triviaReducer from './trivia/trivia.slice';
import utilsReducer from './utils/utils.slice';
import usersReducer from './users/users.slice';

export const store = configureStore({
	reducer: {
		trivia: triviaReducer,
		utils: utilsReducer,
		users: usersReducer
	}
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
