import express from "express";
import mongoose from "mongoose";
import Comment from "../models/Comments.js";

const commentRouter = express.Router();

commentRouter.get("/:movie_id", async (req, res) => {
  try {
    const comments = await Comment.findById (req.params.movie_id) ;
    res.status(200).json(comments);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
});

commentRouter.post("/", async (req, res) => {
    try {
        const { name, movie_id, text } = req.body;

        const movieId = new mongoose.Types.ObjectId(String(movie_id));

        const comment = new Comment({ name, movie_id: movieId, text })
        await comment.save();

        res.status(201).json(comment);
    } catch (e) {
        console.error(e);
        res.status(400).json({ message: e.message })
    }
})

commentRouter.patch("/:id", async (req, res) => {
    try {
      const { text } = req.body;
  
      const updatedComment = await Comment.findByIdAndUpdate(
        req.params.id,
        { text },
        { new: true }
      );
  
      if (!updatedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      res.status(200).json(updatedComment);
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });
  
  commentRouter.delete("/:id", async (req, res) => {
    try {
      // Find and delete the comment by ID
      const deletedComment = await Comment.findByIdAndDelete(req.params.id);
  
      if (!deletedComment) {
        return res.status(404).json({ message: "Comment not found" });
      }
  
      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ message: e.message });
    }
  });  

export default commentRouter;