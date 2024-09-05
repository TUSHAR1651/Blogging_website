// src/pages/CategoryPage.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

function CategoryPage() {
  const { categoryId } = useParams();
  const blogs = useSelector((state) => state.blogs.posts);
  const themeMode = useSelector((state) => state.theme.mode); // Assuming theme mode is stored in Redux

  // Ensure categoryId is correctly used to match blog category
  const filteredBlogs = blogs.filter((blog) => blog.category === categoryId);

  return (
    <Container
      sx={{
        backgroundColor: themeMode === 'dark' ? '#121212' : '#ffffff',
        color: themeMode === 'dark' ? '#ffffff' : '#000000',
        minHeight: '100vh',
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          color: themeMode === 'dark' ? '#ffffff' : '#000000',
        }}
      >
        {categoryId} Blogs
      </Typography>
      {filteredBlogs.length === 0 ? (
        <Typography
          sx={{
            color: themeMode === 'dark' ? '#ffffff' : '#000000',
          }}
        >
          No blogs found in this category.
        </Typography>
      ) : (
        <List>
          {filteredBlogs.map((blog) => (
            <ListItem
              key={blog.id}
              component={Link}
              to={`/blog/${blog.id}`}
              button
              sx={{
                bgcolor: themeMode === 'dark' ? '#333333' : '#ffffff',
                '&:hover': {
                  bgcolor: themeMode === 'dark' ? '#444444' : '#f5f5f5',
                },
              }}
            >
              <ListItemText
                primary={blog.title}
                secondary={new Date(blog.date).toLocaleDateString()}
                primaryTypographyProps={{
                  sx: {
                    color: themeMode === 'dark' ? '#ffffff' : '#000000',
                  },
                }}
                secondaryTypographyProps={{
                  sx: {
                    color: themeMode === 'dark' ? '#b0b0b0' : '#666666',
                  },
                }}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Container>
  );
}

export default CategoryPage;
