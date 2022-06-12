import React, { useState, useEffect, useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { menuStateAtom } from "./atoms/themeAtom";
import { Sidebar, Navbar } from "./components";
import { appContext } from "./lib/context";

const Home = () => {
  const { menuState } = useContext(appContext);

  return (
    <>
      {/* Nav */}
      <Sidebar />

      {/* Main */}
      <div
        className={`${menuState ? "ml-60" : "flex-2"} content hideTranstion`}
      >
        {/* Navbar */}
        <div className="navbar">
          <Navbar />
        </div>

        {/* Routes */}
        <Outlet />
      </div>
    </>
  );
};

export default Home;
