import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import ThemeControls from "./ThemeControls"; 

function Header() {
  const categories = useSelector((state) => state.blogs.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); 
    }
  };

  return (
    <header className="bg-gray-800 text-white dark:bg-gray-900 dark:text-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between flex-wrap">
        {/* Logo and Title */}
        <h1 className="text-2xl font-semibold mr-8">
          <RouterLink
            to="/"
            className="text-white dark:text-gray-100 no-underline"
          >
            My Blog
          </RouterLink>
        </h1>

        
        <div className="flex-grow flex items-center space-x-6 mt-2 lg:mt-0 flex-wrap">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <RouterLink
                key={category}
                to={`/category/${category}`}
                className="text-white dark:text-gray-300 hover:underline"
              >
                {category}
              </RouterLink>
            ))
          ) : (
            <span className="text-gray-400 dark:text-gray-500">
              No Categories
            </span>
          )}
        </div>

        
        <form
          onSubmit={handleSearch}
          className="flex items-center space-x-2 mt-2 lg:mt-0"
        >
          <input
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1 rounded border border-gray-300 bg-white text-black dark:bg-gray-700 dark:border-gray-600 dark:text-white w-32 sm:w-48 lg:w-64"
          />
          <button
            type="submit"
            className="p-2 bg-gray-600 rounded hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <SearchIcon className="text-white dark:text-gray-300" />
          </button>
        </form>

        
        <ThemeControls className="mt-2 lg:mt-0" />

        
        <RouterLink
          to="/editor"
          className="ml-4 p-2 bg-gray-600 rounded text-white hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600 mt-2 lg:mt-0"
        >
          New Post
        </RouterLink>
      </div>
    </header>
  );
}

export default Header;
