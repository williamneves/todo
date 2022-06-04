import React, { useEffect, useRef } from 'react';
import './Sidebar.css';
import { menuStateAtom, screenSizeAtom } from '../../atoms/themeAtom';
import { useRecoilState } from 'recoil';
import { SiTodoist } from 'react-icons/si';
import { BsUiChecks } from 'react-icons/bs';
import { RiUserSettingsLine } from 'react-icons/ri';
import { HiOutlineLogout } from 'react-icons/hi';
import { NavLink, Link } from 'react-router-dom';
import ThemeSwitch from './../common/ThemeSwitch/ThemeSwitch';

const Sidebar = () => {
	const [menuState, setMenuState] = useRecoilState(menuStateAtom);
	const [screenSize, setScreenSize] = useRecoilState(screenSizeAtom);

	// set ref to the sidebar container
	const sidebarRef = useRef();

	// Capture the screen size and set the state
	useEffect(() => {
		const handleResize = () => setScreenSize(window.innerWidth);
		window.addEventListener('resize', handleResize);

		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Toggle the menu state if the screen size is less than 768px
	useEffect(() => {
		if (screenSize < 768) {
			setMenuState(false);
		} else setMenuState(true);
	}, [screenSize]);

	// Close the menu if the user clicks outside of the menu
	useEffect(() => {
		// If the menu is open and screen is less than 768 width, close it if the user clicks outside of it
		const handleClick = (e) => {
			if (menuState && !sidebarRef.current.contains(e.target) && screenSize < 768) {
				setMenuState(false);
			}
		};
		// Add the event listener
		document.addEventListener('mousedown', handleClick);

		// Remove the event listener on cleanup
		return () => document.removeEventListener('mousedown', handleClick);
	}, [menuState, screenSize]);

	return (
		<aside aria-label='Sidebar'>
			<div
				className={`${menuState ? 'sidebarOpen' : 'sidebarClosed'} hideTranstion`}
				ref={sidebarRef}>
				{menuState && <div className='flex flex-col justify-between h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-5'>
					<div className='flex flex-col justify-start gap-3'>
						<Link
							to='/'
							className='items-center justify-center gap-3 mx-6 mt-3 flex text-2xl font-extrabold tracking-tight border-b pb-3 border-gray-300 dark:border-stone-600'>
							<SiTodoist className='text-orange-600' />
							<span className='font-bold dark:text-stone-200'>Todoist</span>
						</Link>
						<NavLink to='/todos' className={'navLinks'}>
							<BsUiChecks />
							<span className=''>To-Dos</span>
						</NavLink>
						<NavLink to='/user' className={'navLinks'}>
							<RiUserSettingsLine className='text-xl' />
							<span className=''>Acount</span>
						</NavLink>
					</div>
					<div className="flex flex-col justify-start gap-3">
						<span className={'navLinks cursor-pointer'} onClick={() => {}}>
							<HiOutlineLogout className='text-xl' />
							<span className=''>Logout</span>
						</span>
						<div className="mx-3 px-3 border-t border-gray-300 dark:border-stone-600 pt-5">
							<ThemeSwitch />
						</div>
					</div>
				</div>}
			</div>
		</aside>
	);
};

export default Sidebar;
