import React from "react";

const Toogle = ({ isDark, switchTheme }) => {
  return (
    <div className="flex items-center">
      <label
        htmlFor="orange-toggle"
        className="inline-flex relative items-center cursor-pointer"
      >
        <input
          type="checkbox"
          value=""
          id="orange-toggle"
          className="sr-only peer"
          checked={isDark}
          onChange={switchTheme}
        />
        <div className="w-11 h-6 bg-gray-300 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-orange-300 dark:peer-focus:ring-orange-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-orange-500 dark:after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-orange-500"></div>
      </label>
    </div>
  );
};

export default Toogle;
