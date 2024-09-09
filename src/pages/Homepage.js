import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { sanitizeHtml } from "../utils/santitizeHtml";

function Homepage() {
  const blogs = useSelector((state) => state.blogs.posts);

  return (
    <div className="container mx-auto px-4 py-6 dark:bg-gray-900">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-white"
          >
            <div className="p-4">
              <Link
                to={`/blog/${blog.id}`}
                className="text-lg md:text-2xl font-bold text-blue-600 hover:underline dark:text-blue-400"
              >
                {blog.title}
              </Link>
              <p
                className="text-sm md:text-base text-gray-600 mt-2 dark:text-gray-400"
                dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.excerpt) }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Homepage;
