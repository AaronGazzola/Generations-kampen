import { useRouter } from 'next/dist/client/router';
import React, {
	ChangeEvent,
	FocusEvent,
	FormEvent,
	SyntheticEvent,
	useEffect,
	useState
} from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Trivia } from '../../redux/trivia/trivia.interface';
import {
	addTrivia,
	clearTriviaTrigger,
	deleteTrivia,
	getAllTrivia,
	updateTrivia,
	uploadVideo
} from '../../redux/trivia/trivia.slice';
import { getUser, logout } from '../../redux/users/users.slice';

const Admin = () => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { isAuth, user } = useAppSelector(state => state.users);
	const { trivia, trigger, loading, allTrivia } = useAppSelector(
		state => state.trivia
	);
	const [displayTrivia, setDisplayTrivia] = useState(allTrivia);
	const [showVideo, setShowVideo] = useState(false);
	const [confirmDeleteId, setConfirmDeleteId] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const initialState: { [index: string]: any } = {
		id: '',
		correctAnswer: 'A',
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
	const {
		id,
		video,
		question,
		answerA,
		answerB,
		answerC,
		answerD,
		correctAnswer
	} = formState;
	const formIsValid =
		answerA.isValid &&
		answerB.isValid &&
		answerC.isValid &&
		answerD.isValid &&
		question.isValid &&
		(id || video);

	const changeHandler = (
		e: FormEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		const id = e.currentTarget.id;
		const value = e.currentTarget.value;
		const isValid = !!value;
		if (id.includes('correct')) {
			setFormState(prev => ({
				...prev,
				correctAnswer: id.slice(0, 1)
			}));
		} else {
			setFormState(prev => ({
				...prev,
				[id]: { ...prev[id], isValid, value }
			}));
		}
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
		const formContent = {
			question: question.value,
			answerA: answerA.value,
			answerB: answerB.value,
			answerC: answerC.value,
			answerD: answerD.value,
			correctAnswer
		};
		if (id) {
			dispatch(updateTrivia({ ...formContent, _id: id }));
		} else {
			dispatch(addTrivia(formContent));
		}
	};

	const editTriviaButtonHandler = (triv: Trivia) => {
		let newFormState: { [index: string]: any } = { id: triv._id };
		Object.keys(triv).forEach(key => {
			if (['feedback', '_id', '__v'].includes(key)) return;
			newFormState = {
				...newFormState,
				[key]: { isValid: true, isTouched: false, value: triv[key] }
			};
		});
		setFormState(prev => ({ ...prev, ...newFormState }));
	};

	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.currentTarget.value;
		setSearchValue(value);
		if (allTrivia?.length) {
			setDisplayTrivia(
				allTrivia.filter(
					triv =>
						triv.question.includes(value) ||
						triv.answerA.includes(value) ||
						triv.answerB.includes(value) ||
						triv.answerC.includes(value) ||
						triv.answerD.includes(value)
				)
			);
		}
	};

	useEffect(() => {
		if (user === 'noUser') router.push('/login');
		if (!user) dispatch(getUser());
	}, [router, user, dispatch]);

	useEffect(() => {
		if (trigger === 'uploadVideo') {
			setFormState(prev => ({ ...prev, id: trivia?._id }));
			dispatch(clearTriviaTrigger());
			dispatch(getAllTrivia());
			if (trivia?._id && video)
				dispatch(uploadVideo({ video, id: trivia._id }));
		} else if (trigger === 'videoUploaded') {
			dispatch(clearTriviaTrigger());
			setShowVideo(false);
		} else if (trigger === 'triviaDeleted') {
			dispatch(clearTriviaTrigger());
			dispatch(getAllTrivia());
			setShowVideo(false);
		}
	}, [trigger]);

	useEffect(() => {
		if (isAuth) dispatch(getAllTrivia());
	}, [isAuth, dispatch]);

	useEffect(() => {
		if (id) setShowVideo(true);
	}, [id, showVideo]);

	useEffect(() => {
		setDisplayTrivia(allTrivia);
	}, [allTrivia]);

	return (
		<>
			<div className='p-2'>
				<form
					className='w-screen max-w-lg p-2 rounded-sm flex flex-col items-center mt-4'
					style={{ background: 'rgba(255,255,255,0.7)' }}
					onSubmit={submitHandler}
				>
					<h1 className='font-medium text-2xl mb-2'>
						{id ? 'Edit trivia' : 'Add trivia'}
					</h1>
					{id && (
						<p className='m-2'>
							<span className='font-semibold'>ID:</span> {id}
						</p>
					)}
					{id && showVideo && (
						<video className='w-full rounded-md' preload='auto' controls>
							<source
								src={`http://localhost:5000/api/videos/${id}`}
								type='video/mp4'
							/>
						</video>
					)}
					<input
						className='w-full my-4'
						id='video'
						type='file'
						onChange={changeFileHandler}
					/>
					{Object.keys(formState).map(key => {
						if (['correctAnswer', 'id', 'video'].includes(key)) return;
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
									{key.startsWith('answer')
										? key[0].toLocaleUpperCase() +
										  key.slice(1, 6) +
										  ' ' +
										  key.slice(-1)
										: key[0].toLocaleUpperCase() + key.slice(1)}
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
									placeholder={
										key.startsWith('answer')
											? key[0].toLocaleUpperCase() +
											  key.slice(1, 6) +
											  ' ' +
											  key.slice(-1)
											: key[0].toLocaleUpperCase() + key.slice(1)
									}
								/>
							</React.Fragment>
						);
					})}
					<h2 className={`text-sm font-medium`}>Correct answer:</h2>
					<div className='flex w-full justify-around items-center'>
						{['A', 'B', 'C', 'D'].map(item => (
							<div className='flex cursor-pointer items-center mt-1' key={item}>
								<input
									type='radio'
									id={`${item}correct`}
									name='correct-answer'
									className='cursor-pointer'
									onChange={changeHandler}
									checked={correctAnswer === item}
								/>
								<label
									className={`text-sm font-medium p-1 cursor-pointer`}
									htmlFor={`${item}correct`}
								>
									{item}
								</label>
							</div>
						))}
					</div>
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
						onClick={() => setFormState(initialState)}
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
				<div
					className='w-screen max-w-lg p-2 rounded-sm flex flex-col items-center my-4'
					style={{ background: 'rgba(255,255,255,0.7)' }}
				>
					<label htmlFor='search' className={`w-full pl-1 text-sm font-medium`}>
						Search
					</label>
					<input
						className={`w-full py-1.5 px-2 rounded-sm`}
						type='text'
						id='search'
						onChange={searchHandler}
						value={searchValue}
						placeholder='Search'
					/>
				</div>
				{displayTrivia?.map(triv => (
					<div
						key={triv._id}
						className='w-screen max-w-lg p-2 rounded-sm flex flex-col mb-4'
						style={{ background: 'rgba(255,255,255,0.7)' }}
					>
						<p>
							<span className='font-semibold'>ID: </span>
							{triv._id}
						</p>
						<p>
							<span className='font-semibold'>Question: </span>
							{triv.question}
						</p>
						<p>
							<span className='font-semibold'>Answer A: </span>
							{triv.answerA}
						</p>
						<p>
							<span className='font-semibold'>Answer B: </span>
							{triv.answerB}
						</p>
						<p>
							<span className='font-semibold'>Answer C: </span>
							{triv.answerC}
						</p>
						<p>
							<span className='font-semibold'>Answer D: </span>
							{triv.answerD}
						</p>
						<p>
							<span className='font-semibold'>Correct Answer: </span>
							{triv.correctAnswer}
						</p>
						{triv.feedback && (
							<p>
								<span className='font-semibold'>Feedback: </span>
								{(triv.feedback?.positive /
									(triv.feedback?.negative + triv.feedback?.positive)) *
									100}
								% positive
							</p>
						)}
						<div className='flex justify-around'>
							<button
								type='button'
								onClick={() => {
									setShowVideo(false);
									editTriviaButtonHandler(triv);
								}}
								className='mt-2 text-yellow-700 font-medium'
							>
								Edit
							</button>
							<button
								type='button'
								className='mt-2 text-red-900 font-medium'
								onClick={() => setConfirmDeleteId(triv._id || '')}
							>
								Delete
							</button>
						</div>
						{confirmDeleteId === triv._id && (
							<button
								onClick={() => {
									if (triv._id) dispatch(deleteTrivia(triv?._id));
									if (triv._id === id) setFormState(initialState);
								}}
								className='w-full border border-red-700 mt-2 px-1.5 py-1 font-semibold rounded-md text-red-700'
							>
								{loading ? '...' : 'Confirm delete?'}
							</button>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default Admin;
