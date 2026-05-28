import express from "express";
import multer from "multer";
import path from "path";

import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

const router = express.Router();

/* =========================
   MULTER STORAGE
========================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* =========================
   CREATE POST
========================= */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;

    const newPost = new Post({
      title,
      content,
      image: req.file ? req.file.filename : "",
    });

    await newPost.save();

    res.status(201).json(newPost);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* =========================
   GET ALL POSTS
========================= */

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    res.json(posts);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* =========================
   DELETE POST + COMMENTS
========================= */

router.delete("/:id", async (req, res) => {
  try {
    const postId = req.params.id;

    // delete comments
    await Comment.deleteMany({ postId });

    // delete post
    await Post.findByIdAndDelete(postId);

    res.json({
      message: "Post deleted successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;