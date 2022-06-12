import React, { useContext } from "react";
import "./Navbar.css";
import { RiMenuFoldLine } from "react-icons/ri";
import ThemeSwitch from "../common/ThemeSwitch/ThemeSwitch";
import { appContext } from "../../lib/context";

const Navbar = () => {
  const { menuState, setMenuState, screenSize, setScreenSize } =
    useContext(appContext);

  const handleClick = () => {
    setMenuState(!menuState);
  };

  return (
    <div className="flex items-center justify-between p-2 md:ml-5 md:mr-5 relative">
      <div>
        <RiMenuFoldLine
          className={`text-primary text-3xl cursor-pointer hideTransition hover:text-secondary dark:text-stone-200 ${
            !menuState ? "-scale-x-100" : "scale-x-100"
          } `}
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
