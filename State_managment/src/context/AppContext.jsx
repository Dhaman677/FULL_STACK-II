import { createContext, useReducer, useState } from "react";
import { appReducer, initialState } from "../Reducer/appReducer";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        favorites: state.favorites,
        dispatch,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};