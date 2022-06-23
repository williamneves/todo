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
	const [todos, setTodos] = useState([]);
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
	}, [db]);


	useEffect(() => {
		console.log(todos);
	}, [todos]);

	return (
		// Create a list of tasks with map function
    todos.map( ( todo ) => {
      return (
        <Task key={todo.id} taskData={todo.data()} />
      )
		})
	);
};

export default TodosList;
