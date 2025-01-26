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
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${
        themeMode === "dark"
          ? "bg-gradient-to-br from-gray-900 to-black text-white"
          : "bg-gradient-to-br from-gray-100 to-white text-gray-900"
      }`}
    >
      <div className="max-w-3xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl p-6 sm:p-8 lg:p-12">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
          {existingPost ? "Edit Blog Post" : "Create New Blog Post"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's your blog about?"
              className="w-full px-4 py-2 sm:py-3 border-2 font-semibold text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 border-2 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
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
            <label className="block text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-300">
              Content
            </label>
            <div className="border-2 border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
              <ReactQuill
                value={content}
                onChange={setContent}
                theme="snow"
                className="min-h-[200px] sm:min-h-[300px]"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-lg hover:scale-[1.02] transition-transform"
          >
            {existingPost ? "Update Post" : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BlogEditor;
