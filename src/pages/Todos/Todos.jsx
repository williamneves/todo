import React from 'react';
import './Todos.css';
import 'react-day-picker/dist/style.css';
import NewTask from './NewTask';
import TodosList from './TodosList';

const Todos = () => {
	
	return (
		<div className='flex justify-center w-full pt-10'>
			<div className='flex flex-col gap-3 items-center w-full mx-8 md:max-w-xl lg:max-w-2xl'>
				{/*  New Task Component */}

				<NewTask />

				{/* Tasks List */}

				<TodosList />
			</div>
		</div>
	);
};

export default Todos;
