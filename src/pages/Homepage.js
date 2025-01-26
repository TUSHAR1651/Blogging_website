import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sanitizeHtml } from "../utils/santitizeHtml";

function Homepage() {
  const blogs = useSelector((state) => state.blogs.posts);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center">
          Latest Blogs
        </h1>

        {/* Fallback message when no blogs are available */}
        {blogs.length === 0 && (
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            No blogs available at the moment. Check back later!
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              aria-label={`Blog: ${blog.title}`}
            >
              <div className="p-4 md:p-5 flex flex-col h-full">
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-base md:text-lg font-bold mb-2 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors line-clamp-2"
                >
                  {blog.title}
                </Link>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300 mb-3 flex-grow line-clamp-4"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.excerpt) }}
                />
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 mt-auto">
                  <span className="truncate">{blog.category}</span>
                  <span>{new Date(blog.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Homepage;
