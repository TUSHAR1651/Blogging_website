import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || ""; 

  const blogs = useSelector((state) => state.blogs.posts) || []; 

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(query.toLowerCase()) 
  );

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-100 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Search Results for "{query}"
        </h1>
        
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500 dark:text-gray-400">
              No blogs found matching your search 🔍
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredBlogs.map((blog) => (
              <RouterLink 
                to={`/blog/${blog.id}`} 
                key={blog.id}
                className="block"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 p-6">
                  <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                    {blog.title}
                  </h2>
                  <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                    <span>{blog.category}</span>
                    <span>{new Date(blog.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </RouterLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;