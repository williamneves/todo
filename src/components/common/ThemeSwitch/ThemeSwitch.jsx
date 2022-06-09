import React, { useEffect } from "react";
import { RiMoonClearLine } from "react-icons/ri";
import { ImSun } from "react-icons/im";
import { themeAtom } from "../../../atoms/themeAtom";
import Toogle from "./Toogle";
import "./ThemeSwitch.css";

import { useRecoilState } from "recoil";

const ThemeSwitch = () => {
  const [theme, setTheme] = useRecoilState(themeAtom);

  const handleDarkModeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  // Get Local Storage Theme
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setTheme(localStorage.getItem("theme"));
    }
  }, []);

  return (
    <div className="modeSwitch">
      <ImSun
        className={theme === "light" ? "darkIconActive" : "text-slate-500"}
      />
      <Toogle isDark={theme === "dark"} switchTheme={handleDarkModeToggle} />
      <RiMoonClearLine
        className={theme === "dark" ? "darkIconActive" : "text-slate-500"}
      />
    </div>
  );
};

export default ThemeSwitch;
