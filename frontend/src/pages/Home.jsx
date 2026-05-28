import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts");
      setPosts(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // Delete post
  const deletePost = async (id) => {
    try {
      await API.delete(`/posts/${id}`);

      alert("Post Deleted Successfully");

      fetchPosts();

    } catch (err) {
      console.log(err);
      alert("Failed to delete post");
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#f4f4f4",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "30px",
        }}
      >
        All Blog Posts
      </h1>

      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "20px",
          }}
        >
          {posts.map((post) => (
            <div
              key={post._id}
              style={{
                background: "white",
                borderRadius: "10px",
                padding: "15px",
                boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              }}
            >
              <h2>{post.title}</h2>

              {post.image && (
                <img
                  src={`https://blog-platform-j43c.onrender.com/uploads/${post.image}`}
                  alt="post"
                  style={{
                    width: "220px",
                    height: "180px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    display: "block",
                    margin: "0 auto",
                  }}
                />
              )}

              <p style={{ marginTop: "10px" }}>
                {post.content.substring(0, 100)}...
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "15px",
                }}
              >
                <Link to={`/post/${post._id}`}>
                  <button
                    style={{
                      padding: "8px 12px",
                      border: "none",
                      background: "black",
                      color: "white",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Read More
                  </button>
                </Link>

                <button
                  onClick={() => deletePost(post._id)}
                  style={{
                    padding: "8px 12px",
                    border: "none",
                    background: "red",
                    color: "white",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}