import { useRouter } from 'next/dist/client/router';
import React, {
	FocusEvent,
	FormEvent,
	SyntheticEvent,
	useEffect,
	useState
} from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { resetPassword } from '../../../redux/users/users.slice';

const Index = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
	const { token } = router.query;
	const tokenQuery = typeof token === 'string' ? token : '';
	const { success } = useAppSelector(state => state.users);
	const [formState, setFormState] = useState({
		password: {
			value: '',
			isValid: false,
			isTouched: false
		}
	} as { [index: string]: any });
	const { password } = formState;

	const changeHandler = (e: FormEvent<HTMLInputElement>) => {
		const id = e.currentTarget.id;
		const value = e.currentTarget.value;
		const isValid =
			id === 'password' ? value.length >= 6 : /^\S+@\S+\.\S+$/.test(value);
		setFormState(prev => ({ ...prev, [id]: { ...prev[id], isValid, value } }));
	};
	const touchHandler = (e: FocusEvent<HTMLInputElement>) => {
		const id = e.currentTarget.id;
		setFormState(prev => ({
			...prev,
			[id]: {
				...prev[id],
				isTouched: true
			}
		}));
	};
	const submitHandler = (e: SyntheticEvent) => {
		e.preventDefault();
		if (!password.isValid) return;
		dispatch(resetPassword({ token: tokenQuery, password: password.value }));
	};

	useEffect(() => {
		if (success === 'Password reset') router.push('/admin');
	}, [success, router]);
	return (
		<>
			<div className='p-2 h-screen'>
				<form
					className='w-screen max-w-sm p-2 rounded-md flex flex-col items-center mt-4 bg-gray-200'
					onSubmit={submitHandler}
				>
					<h1 className='font-bold text-3xl mb-2 text-blue-dark'>
						Reset password
					</h1>
					<label
						htmlFor='password'
						className={`w-full pl-1 text-sm  text-gray-800 font-semibold ${
							password.isTouched && !password.isValid ? 'text-red-700' : ''
						}`}
					>
						New password
					</label>
					<input
						type='password'
						id='password'
						className={`w-full py-1.5 px-2 rounded-sm mb-2 border ${
							password.isTouched && !password.isValid
								? ' border-red-700'
								: 'border-transparent'
						}`}
						style={{ background: 'rgba(255,255,255,0.7)' }}
						value={password.value}
						onChange={changeHandler}
						onBlur={touchHandler}
						placeholder='New password'
					/>
					<button
						type='submit'
						className={`w-full rounded-sm mt-4 font-semibold text-xl p-2 pt-1.5 ${
							password.isValid
								? 'bg-green-700 text-white'
								: 'bg-gray-500 text-gray-200'
						}`}
					>
						{loading ? '...' : 'Reset password'}
					</button>
				</form>
			</div>
		</>
	);
};

export default Index;
