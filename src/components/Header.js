import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThemeControls from "./ThemeControls";

function Header() {
  const categories = useSelector((state) => state.blogs.categories);
  const [searchTerm, setSearchTerm] = useState("");
  const [menuOpen, setMenuOpen] = useState(false); // For the collapsible menu
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
        {/* Logo */}
        <RouterLink
          to="/"
          className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"
        >
          BlogVibe
        </RouterLink>

        {/* Navigation (Hidden on small screens) */}
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

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
        >
          <span className="sr-only">Open menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Form (Hidden on very small screens) */}
          <form
            onSubmit={handleSearch}
            className="relative hidden sm:block"
          >
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.2-6.65a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </span>
          </form>

          {/* Theme Controls */}
          <ThemeControls />

          {/* New Post Button */}
          <RouterLink
            to="/editor"
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:scale-105 transition-transform"
          >
            New Post
          </RouterLink>
        </div>
      </div>

      {/* Collapsible Menu for Mobile */}
      {menuOpen && (
        <div className="md:hidden px-4 py-2 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700">
          <nav className="space-y-2">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <RouterLink
                  key={category}
                  to={`/category/${category}`}
                  onClick={() => setMenuOpen(false)} // Close menu after navigation
                  className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {category}
                </RouterLink>
              ))
            ) : (
              <span className="block text-gray-400 dark:text-gray-500">
                No Categories
              </span>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
