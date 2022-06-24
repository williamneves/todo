import React, { useEffect, useState, useContext } from 'react';
import { appContext } from '../../lib/context';
import {
  db,
	doc,
	setDoc,
	addDoc,
	collection,
	getDoc,
	serverTimestamp,
	onSnapshot,
	query,
	orderBy,
	where,
	limit,
} from '../../lib/firebase';
import Task from './Task';

const TodosList = () => {
	const [ todos, setTodos ] = useState( [] );
	const [ filteredTodos, setFilteredTodos ] = useState( [] );
	const [ filter, setFilter ] = useState( 'all' );
	const { authUser } = useContext(appContext);

	// Subscribe to firebase todos collection
	useEffect(() => {
		onSnapshot(
			query(
				collection(db, 'todos'),
				where( 'userUid', '==', authUser.uid ),
				orderBy('createdAt', 'desc')
			),
			(snapshot) => {
				setTodos(snapshot.docs);
			}
		);
	}, [ db ] );
	
	// Filter todos
	useEffect( () => {
		if ( filter === 'all' ) {
			setFilteredTodos( todos );
		}
		else if ( filter === 'checked' ) {
			setFilteredTodos( todos.filter( todo => todo.data().isDone === true ) );
		}
		else if ( filter === 'unchecked' ) {
			setFilteredTodos( todos.filter( todo => todo.data().isDone === false ) );
		}
	}, [ todos, filter, db ] );


	return (
		<>
			{/* <div className='w-[calc(100%-2rem)] border-b-2 border-gray-300 dark:border-gray-700 mb-2 mt-6'>
				<h3 className='text-slate-500 dark:text-slate-400 ml-2 italic'>
					ALL
				</h3>
			</div> */}

			<div className="flex items-center justify-end w-[calc(100%-1rem)] border-0 border-b-2 border-gray-200 dark:border-gray-700 mb-2 mt-5">
				<div>
					<label htmlFor='underline_select' className='sr-only'>
						Underline select
					</label>
					<select
						id='underline_select'
						onChange={(e) => setFilter(e.target.value)}
						className='block py-2.5 px-0 w-[100px] text-sm text-gray-500 bg-transparent border-0 appearance-none dark:text-gray-400  focus:outline-none focus:ring-0 focus:border-gray-200 peer'>
						<option defaultValue='all'>All</option>
						<option value='checked'>Done</option>
						<option value='unchecked'>Not done</option>
					</select>
				</div>
			</div>

			{/* Create a list of tasks with map function */}
			<div className='flex flex-col gap-5 items-center w-full mx-8 md:max-w-xl lg:max-w-2xl mb-10'>
				{filteredTodos.map((todo) => {
					return <Task key={todo.id} id={todo.id} taskData={todo.data()} />;
				})}
			</div>
		</>
	);
};

export default TodosList;
