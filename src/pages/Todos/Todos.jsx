import React, { useState, useEffect, useContext } from 'react';
import { appContext } from "../../lib/context";
import './Todos.css';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { Dropdown } from 'flowbite-react';
import { CalendarIcon } from '@heroicons/react/outline';
import { db, doc, setDoc,addDoc, collection, getDoc, serverTimestamp } from '../../lib/firebase';
import toast from "react-hot-toast";
import { async } from '@firebase/util';

const Todos = () => {
  const { authUser } = useContext(appContext);
  const [ todos, setTodos ] = useState( [] );
  const [isDone, setIsDone] = useState(false);
	const [newTodo, setNewTodo] = useState('');
  const [ selectDueDate, setSelectDueDate ] = useState('');
  

	// Handle create new task
  const handleAddNewTask = async () => {
    const toastId = toast.loading( 'Adding new task...' );
    
    // Check if task is empty or at least 3 characters
    if ( newTodo.length < 3 ) {
      toast.error( 'Minimum 3 chars...', {
        id: toastId
      } )
      return;
    }

    // Create new task in firebase, with task name, duedate, status and timestamp
    const newTask = {
      task: newTodo,
      dueDate: selectDueDate,
      isDone: isDone,
      userUid: authUser.uid,
      createdAt: serverTimestamp()
    }

    // Add new task to firebase
    try {
      await addDoc( collection(db,'todos'), newTask);
      toast.success( 'Task added!', { id: toastId } );
      setNewTodo( '' );
      setSelectDueDate( '' );
      setIsDone( false );
    }
    catch ( error ) {
      toast.error( 'Error adding task...',{id:toastId} );
      console.log( error );
    }

		
	};
	return (
		<div className='flex justify-center w-full pt-10'>
			<div className='flex flex-col gap-3 items-center w-full mx-8 md:max-w-xl lg:max-w-2xl'>
				{/*  New Task Component */}
				<div className={'flex justify-between items-center h-16 w-full rounded-xl drop-shadow-md'}>
					{/* Component */}
					<div className='relative h-full w-full' onSubmit={handleAddNewTask}>
						{/*  Check Css Icon */}
						<div className='absolute inset-y-0 left-0 flex items-center pl-5 cursor-pointer' onClick={() => setIsDone(!isDone)}>
							<div className={ `checkCssIcon ${isDone && 'checked'}`}></div>
						</div>

						{/* Task Input */}
						<input
							type='text'
							id='task-input'
							className='inputTaskField'
							placeholder='Add new task here...'
							name='task'
							value={newTodo}
							onChange={(e) => setNewTodo(e.target.value)}
						/>

						{/*  Date Picker */}
						<div className='absolute inset-y-0 right-[85px] flex items-center'>
							<Dropdown
								arrowIcon={false}
								label={<CalendarIcon className='w-6 h-6 text-gray-400' />}
								inline={true}
                className='relative w-[315px] px-4!important py-4!important'
                onBlur={ () => setSelectDueDate( '' ) }
                collapse={false}
              >
								<DayPicker
									mode='single'
									selected={selectDueDate}
									onSelect={setSelectDueDate}
									className='p-5'
								/>
							</Dropdown>
            </div>
            
            {/* Button to add */}
            <button
              type='submit'
              className='absolute inset-y-4 right-3 flex items-center pr-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 h-8 w-6 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              onClick={ handleAddNewTask }
            >Add</button>
					</div>
        </div>
        {/* End New Task Component */ }
        <div className='flex flex-col gap-3 items-center w-full mx-8 md:max-w-xl lg:max-w-2xl'>
          {/* Tasks List */}
        </div>
			</div>
		</div>
	);
};

export default Todos;
