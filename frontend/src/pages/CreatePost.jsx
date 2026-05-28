import React, { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", image);

      await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Post Created Successfully");

      navigate("/");

    } catch (err) {
      console.log(err);
      alert("Failed to create post");
    }
  };

  return (
    <div
      style={{
        minHeight: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f4f4",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Create Blog Post
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "93%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid gray",
            }}
          />

          <textarea
            placeholder="Enter content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="6"
            style={{
              width: "93%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "5px",
              border: "1px solid gray",
              resize: "none",
            }}
          />

          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            style={{
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
}