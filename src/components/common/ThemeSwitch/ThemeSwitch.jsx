import React, { useEffect, useContext } from "react";
import Toogle from "./Toogle";
import "./ThemeSwitch.css";
import { appContext } from "../../../lib/context";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
import {
  SunIcon as SunOutline,
  MoonIcon as MoonOutline,
} from "@heroicons/react/outline";

const ThemeSwitch = () => {
  const { theme, setTheme } = useContext(appContext);

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
      {theme === "light" ? (
        <SunIcon className={"darkIconActive"} />
      ) : (
        <SunOutline className={"text-slate-500 w-6 h-6"} />
      )}
      <Toogle isDark={theme === "dark"} switchTheme={handleDarkModeToggle} />
      <span>
        {theme === "dark" ? (
          <MoonIcon className={"darkIconActive"} />
        ) : (
          <MoonOutline className={"text-slate-500 w-6 h-6"} />
        )}
      </span>
    </div>
  );
};

export default ThemeSwitch;
