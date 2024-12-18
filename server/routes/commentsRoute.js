import express from "express";
import {
  createComment,
  deleteComment,
  getCommentsByEventId,
} from "../controllers/commentControllers.js";

import verifyToken from "../middleware/auth.js";

const router = express.Router();

// comments by eve ID
router.get("/event/:id", getCommentsByEventId);

// new comment
router.post("/", verifyToken, createComment);

// Delete a comment by ID
router.delete("/:id", verifyToken, deleteComment);

export default router;
