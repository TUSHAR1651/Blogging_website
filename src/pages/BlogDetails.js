// src/pages/BlogDetails.js
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
  const themeMode = useSelector((state) => state.theme.mode);

  if (!blog) {
    return (
      <p
        className={`text-center ${
          themeMode === "dark" ? "text-gray-400" : "text-gray-600"
        }`}
      >
        Blog not found
      </p>
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
    <div
      className={`max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8 ${
        themeMode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="mb-4 text-sm sm:text-base">{formattedDateTime}</p>
      <div
        className={`prose prose-sm sm:prose-lg ${
          themeMode === "dark" ? "prose-invert" : ""
        }`}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content) }}
      />
      <div className="mt-4 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={handleEdit}
          className={`px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            themeMode === "dark"
              ? "bg-blue-600 text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          Edit Post
        </button>
        <button
          onClick={handleDelete}
          className={`px-4 py-2 rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 ${
            themeMode === "dark"
              ? "bg-red-600 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          Delete Post
        </button>
      </div>
    </div>
  );
}

export default BlogDetails;
