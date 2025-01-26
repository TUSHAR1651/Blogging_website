import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";

function CategoryPage() {
  const { categoryId } = useParams();
  const blogs = useSelector((state) => state.blogs.posts);

  // Ensure categoryId is correctly used to match blog category
  const filteredBlogs = blogs.filter((blog) => blog.category === categoryId);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {categoryId} Blogs
        </h1>

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-2xl text-gray-500 dark:text-gray-400">
              No blogs found in this category 📝
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBlogs.map((blog) => (
              <Link 
                key={blog.id} 
                to={`/blog/${blog.id}`}
                className="block p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-md dark:shadow-none transition-all duration-300 hover:scale-[1.02] hover:shadow-xl dark:hover:bg-gray-700"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {blog.title}
                  </h2>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(blog.date).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CategoryPage;