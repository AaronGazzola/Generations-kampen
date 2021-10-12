import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearTriviaFeedback } from '../redux/trivia/trivia.slice';
import { clearUserFeedback } from '../redux/users/users.slice';

const UserFeedback = () => {
	const dispatch = useAppDispatch();
	const {
		error: usersError,
		success: usersSuccess,
		alert: usersAlert
	} = useAppSelector(state => state.users);
	const {
		error: triviaError,
		success: triviaSuccess,
		alert: triviaAlert
	} = useAppSelector(state => state.trivia);
	const error = triviaError || usersError;
	const success = triviaSuccess || usersSuccess;
	const alert = triviaAlert || usersAlert;

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (success || error || alert) {
			timer = setTimeout(() => {
				dispatch(clearUserFeedback());
				dispatch(clearTriviaFeedback());
			}, 3000);
		}
		return () => clearTimeout(timer);
	}, [success, error, alert]);

	if (error || success || alert) {
		return (
			<div
				className={`fixed bottom-0 left-1/2 transform -translate-x-1/2 rounded-t-md ${
					error ? 'bg-red-700' : alert ? 'bg-blue-700' : 'bg-green-700'
				}`}
			>
				<p className='text-white font-semibold text-xl p-2 px-3'>
					{error || success || alert}
				</p>
			</div>
		);
	} else {
		return <></>;
	}
};

export default UserFeedback;
