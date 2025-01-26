import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { sanitizeHtml } from "../utils/santitizeHtml";
import { deletePost } from "../redux/blogSlice";

function BlogDetails() {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blog = useSelector((state) =>
    state.blogs.posts.find((post) => post.id === parseInt(blogId, 10))
  );

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
        <p className="text-2xl font-semibold">Blog not found 🕵️‍♀️</p>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/editor/${blog.id}`);
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(blog.id));
      navigate("/");
    }
  };

  const formattedDateTime = new Date(blog.date).toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-12">
        <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {blog.title}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Published on {formattedDateTime}
        </p>
        
        <div 
          className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 dark:prose-a:text-blue-300 hover:prose-a:text-blue-500 dark:hover:prose-a:text-blue-200"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
        />
        
        <div className="mt-8 flex space-x-4">
          <button
            onClick={handleEdit}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Edit Post
          </button>
          <button
            onClick={handleDelete}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:scale-105 transition-transform"
          >
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default BlogDetails;