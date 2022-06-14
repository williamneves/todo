import React, { useContext } from "react";
import "./Navbar.css";
import { RiMenuFoldLine } from "react-icons/ri";
import ThemeSwitch from "../common/ThemeSwitch/ThemeSwitch";
import { appContext } from "../../lib/context";
import { MenuIcon } from "@heroicons/react/outline";

const Navbar = () => {
  const { menuState, setMenuState, screenSize, setScreenSize } =
    useContext(appContext);

  const handleClick = () => {
    setMenuState(!menuState);
  };

  return (
    <div className="flex items-center justify-between p-2 md:ml-5 md:mr-5 relative">
      <div>
        {/*<RiMenuFoldLine*/}
        {/*  className={`text-primary text-3xl cursor-pointer hideTransition hover:text-secondary dark:text-stone-200 ${*/}
        {/*    !menuState ? "-scale-x-100" : "scale-x-100"*/}
        {/*  } `}*/}
        {/*  onClick={handleClick}*/}
        {/*/>*/}
        <MenuIcon
          className={
            "w-8 h-8 dark:text-white text-slate-800 cursor-pointer hover:text-slate-200 transition-all duration-200 ease-in-out"
          }
          onClick={handleClick}
        />
      </div>
      <div className="flex justify-between items-center">
        {screenSize > 768 && <ThemeSwitch />}
      </div>
    </div>
  );
};

export default Navbar;
