import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { menuStateAtom } from './atoms/themeAtom';
import { Sidebar, Navbar } from './components';

const Home = () => {

	const [menuState] = useRecoilState(menuStateAtom);

	return (
		<>
			{/* Nav */}
			<Sidebar />

			{/* Main */}
			<div className={`${menuState ? 'ml-60' : 'flex-2'} content hideTranstion`}>
				{/* Navbar */}
				<div className='navbar'>
					<Navbar />
				</div>

				{/* Routes */}
				<Outlet/>
			</div>
		</>
	);
};

export default Home;
