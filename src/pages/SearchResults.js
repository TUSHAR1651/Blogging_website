import React from "react";
import { useLocation, Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

function SearchResults() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || ""; 

  console.log("Search query:", query); 

  const blogs = useSelector((state) => state.blogs.posts) || []; 

  console.log("All blogs:", blogs); 

  const filteredBlogs = blogs.filter((blog) =>
    blog.title?.toLowerCase().includes(query.toLowerCase()) 
  );

  console.log("Filtered blogs:", filteredBlogs); 

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 dark:bg-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for "{query}"
      </h1>
      {filteredBlogs.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400">No blogs found matching your search.</p>
      ) : (
        <ul className="space-y-4">
          {filteredBlogs.map((blog) => (
            <li
              key={blog.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700"
            >
              <RouterLink to={`/blog/${blog.id}`} className="block hover:text-blue-600 dark:hover:text-blue-400">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-500 dark:text-gray-400">
                  {blog.date ? new Date(blog.date).toLocaleDateString() : 'No date available'}
                </p>
              </RouterLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchResults;
