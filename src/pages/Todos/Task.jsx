import { PlusIcon } from '@heroicons/react/solid';
import { PencilAltIcon, CloudUploadIcon } from '@heroicons/react/outline';
import React, { useState, useEffect, useRef } from 'react';

const Task = ({ taskData }) => {
	const [task, setTask] = useState(taskData);
	const [tempTask, setTempTask] = useState(taskData);
	const [editMode, setEditMode] = useState(false);
	const [showBtn, setShowBtn] = useState(true);

	const inputRef = useRef(null);

	// Handle task check isDone
	const handleCheck = () => {
		console.log('Checking task...');
		setTask({ ...task, isDone: !task.isDone });
	};

	// Handle task delete
	const handleDelete = () => {
		console.log('Deleting task...');
	};

	// Handle task edit
	const handleEdit = (e) => {
		e.preventDefault();
		// Focus on input ref
		// inputRef.current.focus();

		// If is not in edit mode, set edit mode to true
		if (!editMode) {
			setEditMode(true);
			setTimeout(() => {
				inputRef.current.focus();
			}, 50);
			return;
		}

		// If is in edit mode, but not changed, set edit mode to false
		if (task.task === tempTask.task && task.isDone === tempTask.isDone) {
			setEditMode(false);
			console.log('No changes...');
			return;
		}

		console.log('updating task...');
		setEditMode(false);
	};

	useEffect(() => {
		// if is on Edit mode and Task is done, show button to true
		if (editMode) {
			setShowBtn(true);
		}
		// if task is done, show button to false
		else if (task.isDone) {
			setShowBtn(false);
		} else {
			setShowBtn(true);
		}
	}, [task.isDone, editMode]);

	// handle Focus
	const handleFocus = () => {
		inputRef.current.focus();
		console.log('Focusing...');
	};

	return (
		<div
			className={
				'flex justify-between items-center h-16 w-full rounded-xl drop-shadow-md hover:drop-shadow-lg transition-all ease-out duration-200'
			}>
			{/* Component */}
			<form className='relative h-full w-full' onSubmit={handleEdit}>
				{/*  Check Css Icon */}
				<div
					className='absolute inset-y-0 left-0 flex items-center pl-5 cursor-pointer'
					onClick={handleCheck}>
					<div className={`checkCssIcon ${task.isDone && 'checked'}`}></div>
				</div>

				{/* Task Input */}
				<input
					type='text'
					ref={inputRef}
					id='task-input'
					className={`inputTaskField dark:disabled:text-gray-400 disabled:text-gray-400 disabled:cursor-pointer ${
						!task.isDone
							? 'bg-white text-gray-900 dark:bg-secondary-dark-bg/75'
							: 'bg-green-200 disabled:text-green-400 dark:bg-green-800 dark:disabled:text-green-400'
					}`}
					placeholder='Add new task here...'
					name='task'
					value={task.task}
					onChange={(e) => setTask({ ...task, task: e.target.value })}
					disabled={!editMode}
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

				{showBtn && (
					<button
						onClick={handleFocus}
						type='submit'
						className={`absolute inset-y-[18px] right-6  flex items-center justify-center transition-all-200 group outline outline-2 w-7 h-7 rounded-lg ${
							!editMode
								? 'outline-orange-500 hover:outline-orange-600'
								: 'outline-green-500 hover:outline-green-600'
						}`}>
						{!editMode ? (
							<PencilAltIcon className='text-orange-500 hover:text-orange-600 w-6 h-6  transition-all-200' />
						) : (
							<CloudUploadIcon className='text-green-500 hover:text-green-600 w-6 h-6  transition-all-200' />
						)}
					</button>
				)}
			</form>
		</div>
	);
};

export default Task;
