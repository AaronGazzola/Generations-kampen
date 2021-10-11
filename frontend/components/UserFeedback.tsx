import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearUserFeedback } from '../redux/users/users.slice';

const UserFeedback = () => {
	const dispatch = useAppDispatch();
	const { error, success, alert } = useAppSelector(state => state.users);

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		if (success || error || alert) {
			timer = setTimeout(() => {
				dispatch(clearUserFeedback());
			}, 3000);
		}
		return () => clearTimeout(timer);
	}, [success, error, alert]);
	if (error || success || alert) {
		return (
			<div
				className={`fixed bottom-0 left-1/2 -transform-x-1/2 rounded-t-md ${
					error ? 'bg-red-700' : alert ? 'bg-blue-700' : 'bg-green-700'
				}`}
			>
				<p className='text-white font-semibold'>{error || success || alert}</p>
			</div>
		);
	} else {
		return <></>;
	}
};

export default UserFeedback;