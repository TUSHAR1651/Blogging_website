// src/components/ThemeControls.js
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme, selectTheme } from "../redux/ThemeSlice";

function ThemeControls() {
  const dispatch = useDispatch();
  const currentTheme = useSelector(selectTheme);

  useEffect(() => {
    if (currentTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [currentTheme]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="flex items-center justify-center p-2 lg:p-4">
      <button
        onClick={handleToggle}
        className="flex items-center justify-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 transition-all duration-200 ease-in-out"
        aria-label="Toggle Theme"
      >
        <div
          className={`w-5 h-5 rounded-full transform transition-transform duration-200 ease-in-out bg-white ${
            currentTheme === "dark" ? "translate-x-5" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default ThemeControls;
