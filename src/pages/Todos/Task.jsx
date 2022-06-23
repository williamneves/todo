import { PlusIcon } from '@heroicons/react/solid';
import { PencilAltIcon, CloudUploadIcon } from '@heroicons/react/outline';
import React, { useState, useEffect, useRef } from 'react';
import { updateDoc, doc, db } from '../../lib/firebase';
import { toast } from 'react-hot-toast';

const Task = ({ taskData, id }) => {
	const [task, setTask] = useState(taskData);
	const [tempTask, setTempTask] = useState(taskData);
	const [editMode, setEditMode] = useState(false);
	const [showBtn, setShowBtn] = useState(true);

	const inputRef = useRef(null);

	// Handle task check isDone
	const handleCheck = async () => {
		const toastId = toast.loading("Updating...");
		
		// Update task in firebase
		try {
			// const taskRef = await doc( db, 'todos', task.id );
			console.log(id)
			await updateDoc(doc( db, 'todos', id ),{ isDone: !task.isDone });
			setTask( { ...task, isDone: !task.isDone } );
			toast.success("Task updated",{id:toastId});
		}
		catch ( error ) {
			console.log( error );
			toast.error("Error updating task",{id:toastId});
		}
	};

	// Handle task delete
	const handleDelete = () => {
		console.log('Deleting task...');
	};

	// Handle task edit
	const handleEdit = async (e) => {
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

		const toastId = toast.loading("Updating...");

		// If is in edit mode, but not changed, set edit mode to false
		if (task.task === tempTask.task && task.isDone === tempTask.isDone) {
			setEditMode( false );
			toast("No changes",{id:toastId});
			return;
		}

		console.log('updating task...');
		try {
			// Update task in firebase
			await updateDoc( doc( db, 'todos', id ), { task: task.task, isDone: task.isDone } );
			setEditMode( false );
			toast.success("Task updated",{id:toastId});
		}
		catch ( error ) {
			console.log( error );
			inputRef.current.focus();
			toast.error("Error updating task",{id:toastId});
		}
	};


	// Handle task edit buttons show/hide
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

				{showBtn && (
					<button
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
