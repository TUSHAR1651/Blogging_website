import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, selectTheme } from "../redux/ThemeSlice";
import { Moon, Sun } from "lucide-react";

const ThemeControls = () => {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  return (
    <div className="flex items-center justify-center p-4">
      <button
        onClick={() => dispatch(toggleTheme())}
        className="relative flex items-center justify-center w-20 h-10 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner"
      >
        <div 
          className={`absolute w-9 h-9 bg-white dark:bg-gray-300 rounded-full shadow-md transition-transform duration-300 
            ${currentTheme === "dark" ? "translate-x-8" : "-translate-x-8"}`}
        />
        <Sun 
          className={`absolute  w-6 h-6 text-yellow-500 transition-opacity duration-300 
            ${currentTheme === "dark" ? "opacity-0" : "opacity-100"}`} 
        />
        <Moon 
          className={`absolute  w-6 h-6 text-blue-500 transition-opacity duration-300 
            ${currentTheme === "dark" ? "opacity-100" : "opacity-0"}`} 
        />
      </button>
    </div>
  );
};

export default ThemeControls;