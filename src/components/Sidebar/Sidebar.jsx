import React, { useEffect, useRef } from "react";
import { logout } from "../../lib/firebase";
import "./Sidebar.css";
import { menuStateAtom, screenSizeAtom } from "../../atoms/themeAtom";
import { useRecoilState } from "recoil";
import { SiTodoist } from "react-icons/si";
import { BsUiChecks } from "react-icons/bs";
import { RiUserSettingsLine } from "react-icons/ri";
import { HiOutlineLogout } from "react-icons/hi";
import { NavLink, Link } from "react-router-dom";
import ThemeSwitch from "./../common/ThemeSwitch/ThemeSwitch";

const Sidebar = () => {
  const [menuState, setMenuState] = useRecoilState(menuStateAtom);
  const [screenSize, setScreenSize] = useRecoilState(screenSizeAtom);

  // set ref to the sidebar container
  const sidebarRef = useRef();

  // Capture the screen size and set the state
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
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
      if (
        menuState &&
        !sidebarRef.current.contains(e.target) &&
        screenSize < 768
      ) {
        setMenuState(false);
      }
    };
    // Add the event listener
    document.addEventListener("mousedown", handleClick);

    // Remove the event listener on cleanup
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuState, screenSize]);

  return (
    <aside aria-label="Sidebar">
      <div
        className={`${
          menuState ? "sidebarOpen" : "sidebarClosed"
        } sidebar hideTransition`}
        ref={sidebarRef}
      >
        {menuState && (
          <div className="flex flex-col justify-between h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-5">
            <div className="flex flex-col justify-start gap-3">
              <Link to="/" className="logoLink">
                <SiTodoist className="text-orange-600" />
                <span className="font-bold text-primary dark:text-light">
                  Todo-it!
                </span>
              </Link>
              <NavLink to="/todos" className={"navLinks"}>
                <BsUiChecks />
                <span className="">To-Dos</span>
              </NavLink>
              <NavLink to="/user" className={"navLinks"}>
                <RiUserSettingsLine className="text-xl" />
                <span className="">Acount</span>
              </NavLink>
            </div>
            <div className="logoutArea">
              <span
                className={"navLinks cursor-pointer mt-3 justify-center items-center"}
                onClick={logout}
              >
                <span className="">Logout</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </span>
              {screenSize <= 768 && (
                <div className="themeSwitch">
                  <ThemeSwitch />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
