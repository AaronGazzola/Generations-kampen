import React, { FocusEvent, FormEvent, SyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { forgotPassword } from '../../redux/users/users.slice';
import Link from 'next/link';

const Index = () => {
	const dispatch = useAppDispatch();
	const { loading } = useAppSelector(state => state.users);
	const [formState, setFormState] = useState({
		email: {
			value: '',
			isValid: false,
			isTouched: false
		}
	} as { [index: string]: any });
	const { email } = formState;

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
		if (!email.isValid) return;
		dispatch(forgotPassword(email.value));
	};

	return (
		<>
			<div className='p-2 h-screen'>
				<form
					className='w-screen max-w-sm p-2 rounded-md flex flex-col items-center mt-4 bg-gray-200'
					onSubmit={submitHandler}
				>
					<h1 className='font-bold text-3xl mb-2 text-blue-dark'>
						Forgot password
					</h1>
					<label
						htmlFor='email'
						className={`w-full pl-1 text-sm  text-gray-800 font-semibold ${
							email.isTouched && !email.isValid ? 'text-red-700' : ''
						}`}
					>
						Email
					</label>
					<input
						type='text'
						id='email'
						className={`w-full py-1.5 px-2 rounded-sm mb-2 border ${
							email.isTouched && !email.isValid
								? ' border-red-700'
								: 'border-transparent'
						}`}
						style={{ background: 'rgba(255,255,255,0.7)' }}
						value={email.value}
						onChange={changeHandler}
						onBlur={touchHandler}
						placeholder='Email'
					/>
					<button
						type='submit'
						className={`w-full rounded-sm mt-4 font-semibold text-xl p-2 pt-1.5 ${
							email.isValid
								? 'bg-green-700 text-white'
								: 'bg-gray-500 text-gray-200'
						}`}
					>
						{loading ? '...' : 'Send reset email'}
					</button>
					<Link href='/login' passHref>
						<button
							type='button'
							className='mt-2 text-blue-900 font-medium text-sm'
						>
							Back to login
						</button>
					</Link>
				</form>
			</div>
		</>
	);
};

export default Index;
