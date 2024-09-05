import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useSelector } from 'react-redux';
import { lightTheme, darkTheme } from './theme';
import Header from './components/Header';
import HomePage from './pages/Homepage'; 
import CategoryPage from './pages/CategoryPage';
import BlogDetails from './pages/BlogDetails';
import BlogEditor from './pages/BlogEditor';
import SearchResults from './pages/SearchResults'; 
import "./index.css";

function App() {
  const themeMode = useSelector((state) => state.theme.mode);

  return (
    <ThemeProvider theme={themeMode === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/blog/:blogId" element={<BlogDetails />} />
          <Route path="/editor/:id" element={<BlogEditor />} /> {/* For editing existing posts */}
          <Route path="/editor" element={<BlogEditor />} /> {/* For creating new posts */}
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
