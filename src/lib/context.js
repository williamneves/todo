import React, { useState, createContext } from "react";

const appContext = createContext();

const AppWrapper = ({ children }) => {
  // States
  const [userDB, setUserDB] = useState("");
  const [authUser, setAuthUser] = useState("");
  const [menuState, setMenuState] = useState(true);
  const [screenSize, setScreenSize] = useState("");
  const [theme, setTheme] = useState("light");

  // Returns the context object
  return (
    <appContext.Provider
      value={{
        userDB,
        setUserDB,
        authUser,
        setAuthUser,
        menuState,
        setMenuState,
        screenSize,
        setScreenSize,
        theme,
        setTheme,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export { appContext, AppWrapper };
