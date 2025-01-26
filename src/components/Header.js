import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <RouterLink 
          to="/" 
          className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        >
          BlogVibe
        </RouterLink>

        <nav className="hidden md:flex items-center space-x-6">
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <RouterLink
                key={category}
                to={`/category/${category}`}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {category}
              </RouterLink>
            ))
          ) : (
            <span className="text-gray-400 dark:text-gray-500">
              No Categories
            </span>
          )}
        </nav>

        <div className="flex items-center space-x-4">
          <form 
            onSubmit={handleSearch} 
            className="relative hidden md:block"
          >
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </form>

          <ThemeControls />

          <RouterLink
            to="/editor"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:scale-105 transition-transform"
          >
            New Post
          </RouterLink>
        </div>
      </div>
    </header>
  );
}

export default Header;