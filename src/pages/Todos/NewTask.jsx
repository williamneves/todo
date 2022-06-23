import React, { useState,  useContext } from 'react';
import { appContext } from '../../lib/context';
import './Todos.css';
import { db, addDoc, collection, serverTimestamp } from '../../lib/firebase';
import toast from 'react-hot-toast';
import { PlusIcon } from '@heroicons/react/solid';

const NewTask = () => {
	const { authUser } = useContext(appContext);
	const [isDone, setIsDone] = useState(false);
	const [newTodo, setNewTodo] = useState('');
	const [selectDueDate, setSelectDueDate] = useState('');

	// Handle create new task
  const handleAddNewTask = async ( e ) => {
    e.preventDefault()
		const toastId = toast.loading('Adding new task...');

		// Check if task is empty or at least 3 characters
		if (newTodo.length < 3) {
			toast.error('Minimum 3 chars...', {
				id: toastId,
			});
			return;
		}

		// Create new task in firebase, with task name, duedate, status and timestamp
		const newTask = {
			task: newTodo,
			dueDate: selectDueDate,
			isDone: isDone,
			userUid: authUser.uid,
			createdAt: serverTimestamp(),
		};

		// Add new task to firebase
		try {
			await addDoc(collection(db, 'todos'), newTask);
			toast.success('Task added!', { id: toastId });
			setNewTodo('');
			setSelectDueDate('');
			setIsDone(false);
		} catch (error) {
			toast.error('Error adding task...', { id: toastId });
			console.log(error);
		}
	};

	return (
		<div className={'flex justify-between items-center h-16 w-full rounded-xl drop-shadow-md hover:drop-shadow-lg transition-all ease-out duration-200'}>
			{/* Component */}
			<form className='relative h-full w-full' onSubmit={handleAddNewTask}>
				{/*  Check Css Icon */}
				<div
					className='absolute inset-y-0 left-0 flex items-center pl-5 cursor-pointer'
					onClick={() => setIsDone(!isDone)}>
					<div className={`checkCssIcon ${isDone && 'checked'}`}></div>
				</div>

				{/* Task Input */}
				<input
					type='text'
					id='task-input'
					className='inputTaskField bg-white text-gray-900 dark:bg-secondary-dark-bg/75'
					placeholder='Add new task here...'
					name='task'
					value={newTodo}
					onChange={(e) => setNewTodo(e.target.value)}
				/>

				{/*  Date Picker */}
				{/* <div className='absolute inset-y-0 right-[85px] flex items-center'>
							<Dropdown
								arrowIcon={false}
								label={<CalendarIcon className='w-6 h-6 text-gray-400' />}
								inline={true}
								className='w-[320px] mx-auto'
								>
								<DayPicker
									mode='single'
									selected={selectDueDate}
									onSelect={setSelectDueDate}
									className='p-5 w-[315px]'
								/>
							</Dropdown>
						</div> */}

				{/* Button to add */}
			
				<button type='submit' className='absolute inset-y-[16px] right-6 bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg h-8 w-8 dark:hover:bg-orange-500 focus:outline-none dark:focus:ring-orange-800 flex items-center justify-center transition-all-200 group'>
					<PlusIcon className='text-white w-5 h-5  transition-all-200' />
				</button>
			</form>
		</div>
	);
};

export default NewTask;
