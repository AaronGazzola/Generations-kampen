import { useRouter } from 'next/dist/client/router';
import React, {
	ChangeEvent,
	FocusEvent,
	FormEvent,
	SyntheticEvent,
	useEffect,
	useState
} from 'react';
import UserFeedback from '../../components/UserFeedback';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
	addTrivia,
	clearTriviaTrigger,
	uploadVideo
} from '../../redux/trivia/trivia.slice';
import { logout } from '../../redux/users/users.slice';

const Admin = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isAuth } = useAppSelector(state => state.users);
	const { trivia, trigger, loading } = useAppSelector(state => state.trivia);
	const [videoUploaded, setVideoUploaded] = useState(false);
	const initialState: { [index: string]: any } = {
		id: '',
		video: null,
		question: {
			value: '',
			isValid: false,
			isTouched: false
		},
		answerA: {
			value: '',
			isValid: false,
			isTouched: false
		},
		answerB: {
			value: '',
			isValid: false,
			isTouched: false
		},
		answerC: {
			value: '',
			isValid: false,
			isTouched: false
		},
		answerD: {
			value: '',
			isValid: false,
			isTouched: false
		}
	};
	const [formState, setFormState] = useState(initialState);
	const { id, video, question, answerA, answerB, answerC, answerD } = formState;
	const formIsValid =
		answerA.isValid &&
		answerB.isValid &&
		answerC.isValid &&
		answerD.isValid &&
		question.isValid &&
		video;

	const changeHandler = (e: FormEvent<HTMLTextAreaElement>) => {
		const id = e.currentTarget.id;
		const value = e.currentTarget.value;
		const isValid = !!value;
		setFormState(prev => ({
			...prev,
			[id]: { ...prev[id], isValid, value }
		}));
	};
	const changeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setFormState(prev => ({ ...prev, video: e.target.files?.[0] }));
	};
	const touchHandler = (
		e: FocusEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
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
		if (!formIsValid) return;
		if (id) {
		} else {
			dispatch(
				addTrivia({
					question: question.value,
					answerA: answerA.value,
					answerB: answerB.value,
					answerC: answerC.value,
					answerD: answerD.value
				})
			);
		}
	};

	useEffect(() => {
		if (!isAuth) router.push('/login');
	}, [isAuth]);

	useEffect(() => {
		if (trigger === 'uploadVideo') {
			setFormState(prev => ({ ...prev, id: trivia?._id }));
			dispatch(clearTriviaTrigger());
			if (trivia?._id) dispatch(uploadVideo({ video, id: trivia._id }));
		} else if (trigger === 'videoUploaded') {
			setVideoUploaded(true);
		}
	}, [trigger]);

	return (
		<>
			<UserFeedback />
			<div className='p-2 h-screen'>
				<form
					className='w-screen max-w-sm p-2 rounded-sm flex flex-col items-center mt-4'
					style={{ background: 'rgba(255,255,255,0.7)' }}
					onSubmit={submitHandler}
				>
					<h1 className='font-medium text-2xl mb-2'>
						{id ? 'Edit trivia' : 'Add trivia'}
					</h1>
					{id && <p className='w-full'>id: {id}</p>}
					{id && videoUploaded && (
						<video className='w-full rounded-md' preload='auto' controls>
							<source
								src={`http://localhost:5000/api/videos/${id}`}
								type='video/mp4'
							/>
						</video>
					)}
					<input id='video' type='file' onChange={changeFileHandler} />
					{Object.keys(formState).map(key => {
						if (key === 'id' || key === 'video') return;
						return (
							<React.Fragment key={key}>
								<label
									htmlFor={key}
									className={`w-full pl-1 text-sm font-medium ${
										formState[key].isTouched && !formState[key].isValid
											? 'text-red-700'
											: ''
									}`}
								>
									{key[0].toLocaleUpperCase() + key.slice(1)}
								</label>
								<textarea
									rows={2}
									id={key}
									className={`w-full py-1.5 px-2 rounded-sm mb-2 border ${
										formState[key].isTouched && !formState[key].isValid
											? ' border-red-700'
											: 'border-transparent'
									}`}
									style={{ background: 'rgba(255,255,255,0.7)' }}
									value={formState[key].value}
									onChange={changeHandler}
									onBlur={touchHandler}
									placeholder={key[0].toLocaleUpperCase() + key.slice(1)}
								/>
							</React.Fragment>
						);
					})}

					<button
						type='submit'
						className={`w-full rounded-sm mt-4 font-semibold text-xl p-2 pt-1.5 ${
							formIsValid
								? 'bg-green-700 text-white'
								: 'bg-gray-500 text-gray-200'
						}`}
					>
						{loading ? '...' : id ? 'Update trivia' : 'Add trivia'}
					</button>
					<button
						type='button'
						onClick={() => {
							setVideoUploaded(false);
							setFormState(initialState);
						}}
						className='mt-2 text-yellow-700 font-medium text-sm'
					>
						Clear form
					</button>
					<button
						type='button'
						onClick={() => dispatch(logout())}
						className='mt-2 text-red-900 font-medium text-sm'
					>
						Log out
					</button>
				</form>
			</div>
		</>
	);
};

export default Admin;
