import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sanitizeHtml } from "../utils/santitizeHtml";

function Homepage() {
  const blogs = useSelector((state) => state.blogs.posts);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          Latest Blogs
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              <div className="p-6 flex flex-col h-full">
                <Link
                  to={`/blog/${blog.id}`}
                  className="text-xl font-bold mb-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  {blog.title}
                </Link>
                <p
                  className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow"
                  dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.excerpt) }}
                />
                <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                  <span>{blog.category}</span>
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