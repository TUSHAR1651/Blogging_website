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
        className="relative inline-flex items-center justify-start w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500 transition-all duration-200 ease-in-out"
        aria-label="Toggle Theme"
      >
        <div
          className={`absolute w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ease-in-out ${
            currentTheme === "dark" ? "translate-x-7" : "translate-x-1"
          }`}
        />
        <span className="sr-only">
          {currentTheme === "dark"
            ? "Switch to light mode"
            : "Switch to dark mode"}
        </span>
      </button>
    </div>
  );
}

export default ThemeControls;
