import React, { useState, useEffect, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar, Navbar } from "./components";
import { appContext } from "./lib/context";

const Home = () => {
  const { menuState } = useContext(appContext);

  return (
		<>
			{/* Nav */}
			<Sidebar />

			{/* Main */}
			<div className={`${menuState ? 'ml-60' : 'ml-0'} content hideTranstion`}>
				{/* Navbar */}
        <div
          className={`navbar ${menuState ? 'w-[calc(100%-15rem)]' : 'w-full'}`}
          // add style width 100% to navbar
        >
					<Navbar />
				</div>

				{/* Routes */}
				<div className="mt-10">
					<Outlet />
				</div>
			</div>
		</>
	);
};

export default Home;
