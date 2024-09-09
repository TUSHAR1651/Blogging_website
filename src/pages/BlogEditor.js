import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { addPost, updatePost } from "../redux/blogSlice";

function BlogEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.blogs.categories);
  const existingPost = useSelector((state) =>
    state.blogs.posts.find((post) => post.id === parseInt(id))
  );
  const themeMode = useSelector((state) => state.theme.mode);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (existingPost) {
      setTitle(existingPost.title);
      setContent(existingPost.content);
      setCategory(existingPost.category);
    }
  }, [existingPost]);

  const createExcerpt = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.slice(0, 100) + "...";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content || !category) {
      alert("Please fill in all fields.");
      return;
    }

    const postData = {
      title,
      content,
      category,
      excerpt: createExcerpt(content),
      date: new Date().toISOString(),
    };

    if (existingPost) {
      dispatch(updatePost({ id: parseInt(id, 10), ...postData }));
    } else {
      dispatch(addPost({ id: Date.now(), ...postData }));
    }

    navigate("/");
  };

  return (
    <div
      className={`container mx-auto px-4 py-6 ${
        themeMode === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-4">
        {existingPost ? "Edit Blog Post" : "Create New Blog Post"}
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="block text-base md:text-lg font-medium"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            placeholder="Enter the blog title"
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="category"
            className="block text-base md:text-lg font-medium"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-white"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="block text-base md:text-lg font-medium"
          >
            Content
          </label>
          <div className="min-h-[200px] border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800">
            <ReactQuill
              value={content}
              onChange={setContent}
              className="min-h-[200px] md:min-h-[300px] dark:bg-gray-800"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {existingPost ? "Update" : "Publish"}
        </button>
      </form>
    </div>
  );
}

export default BlogEditor;
