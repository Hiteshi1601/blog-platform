import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api";

export default function PostDetail() {
  const { id } = useParams();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, []);

  // Fetch single post
  const fetchPost = async () => {
    try {
      const res = await API.get("/posts");

      const foundPost = res.data.find((p) => p._id === id);

      setPost(foundPost);

    } catch (err) {
      console.log(err);
    }
  };

  // Fetch comments
  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${id}`);

      setComments(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  // Add comment
  const addComment = async () => {
    if (!text) return;

    try {
      await API.post("/comments", {
        text,
        postId: id,
      });

      setText("");

      fetchComments();

    } catch (err) {
      console.log(err);
      alert("Failed to add comment");
    }
  };

  // Delete comment
  const deleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);

      alert("Comment Deleted");

      fetchComments();

    } catch (err) {
      console.log(err);
      alert("Failed to delete comment");
    }
  };

  if (!post) {
    return <h2 style={{ padding: "20px" }}>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{post.title}</h1>

      {post.image && (
        <img
          src={`https://blog-platform-j43c.onrender.com/uploads/${post.image}`}
          alt="post"
          style={{
            width: "500px",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      )}

      <p>{post.content}</p>

      <hr />

      <h2>Comments</h2>

      {comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <p>{comment.text}</p>

            <button
              onClick={() => deleteComment(comment._id)}
              style={{
                background: "red",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}

      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Write a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
          }}
        />

        <button
          onClick={addComment}
          style={{
            marginLeft: "10px",
            padding: "10px",
          }}
        >
          Add Comment
        </button>
      </div>
    </div>
  );
}