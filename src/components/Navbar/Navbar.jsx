import React, { useContext } from "react";
import "./Navbar.css";
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
    <div className="flex items-center justify-between p-2 relative px-5">
      <div>
        <MenuIcon
          className={
            "w-8 h-8 dark:text-white text-slate-800 cursor-pointer hover:text-slate-500 transition-all duration-200 ease-in-out"
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
