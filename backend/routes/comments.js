import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();

/* =========================
   ADD COMMENT
========================= */

router.post("/", async (req, res) => {
  try {
    const { text, postId } = req.body;

    const newComment = new Comment({
      text,
      postId,
    });

    await newComment.save();

    res.status(201).json(newComment);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* =========================
   GET COMMENTS BY POST
========================= */

router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      postId: req.params.postId,
    }).sort({ createdAt: -1 });

    res.json(comments);

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

/* =========================
   DELETE COMMENT
========================= */

router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);

    res.json({
      message: "Comment deleted successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

export default router;