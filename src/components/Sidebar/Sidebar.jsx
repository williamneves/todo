import React, { useEffect, useRef, useContext } from "react";
import { logout } from "../../lib/firebase";
import "./Sidebar.css";
import { NavLink, Link, useLocation } from "react-router-dom";
import ThemeSwitch from "./../common/ThemeSwitch/ThemeSwitch";
import { appContext } from "../../lib/context";
import {
  AdjustmentsIcon,
  ClipboardIcon,
  BadgeCheckIcon,
} from "@heroicons/react/solid";
import {
  AdjustmentsIcon as AdjustmentsOutline,
  ClipboardIcon as ClipboardOutline,
  BadgeCheckIcon as BadgeCheckOutline,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const { menuState, setMenuState, screenSize, setScreenSize, theme } =
    useContext(appContext);

  // set ref to the sidebar container
  const sidebarRef = useRef();
  const location = useLocation();

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
            <div className="flex flex-col justify-start gap-5">
              <Link to="/" className="logoLink">
                {theme === "dark" ? (
                  <BadgeCheckOutline className="w-7 h-7 text-orange-500" />
                ) : (
                  <BadgeCheckIcon className="w-7 h-7 text-orange-500" />
                )}
                <span className="font-bold text-primary dark:text-light uppercase">
                  Letsdoit!
                </span>
              </Link>
              <NavLink to="/todos" className={"navLinks"}>
                {location.pathname === "/todos" ? (
                  <ClipboardOutline className="w-5 h-5" />
                ) : (
                  <ClipboardIcon className="w-5 h-5" />
                )}
                <span className="">To-Dos</span>
              </NavLink>
              <NavLink to="/user" className={"navLinks"}>
                {location.pathname === "/user" ? (
                  <AdjustmentsOutline className="w-5 h-5" />
                ) : (
                  <AdjustmentsIcon className="w-5 h-5" />
                )}
                <span className="">Account</span>
              </NavLink>
            </div>
            <div className="logoutArea">
              <span
                className={
                  "navLinks cursor-pointer mt-3 justify-center items-center"
                }
                onClick={logout}
              >
                <span className="">Logout</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
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
