import Event from "../models/eventModel.js";
import Comment from "../models/commentModel.js";
// Create a new comment
export const createComment = async (req, res) => {
  const { comContent, eventId, rating } = req.body;
  const userId = req.user._id;

  if (!comContent || !userId || !eventId) {
    return res
      .status(400)
      .json({ error: "Content, user, and eventId are required." });
  }

  try {
    const newComment = new Comment({ comContent, userId, eventId, rating });
    await newComment.save();

    //edit the ev comment arr
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    if (!event.comments) {
      event.comments = [];
    }

    event.comments.push(newComment._id);
    await event.save();

    res.status(201).json({
      message: "Comment created successfully!",
      comment: newComment,
    });
  } catch (error) {
    console.error("Error saving new comment:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  const userId = req.user._id;

  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (comment.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "You are not authorized to update this comment.",
      });
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Comment updated successfully",
      comment: updatedComment,
    });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
  const userId = req.user._id;
  try {
    const commentToDelete = await Comment.findById(req.params.id);
    if (!commentToDelete) {
      return res.status(404).json({ error: "Comment not found." });
    }

    if (commentToDelete.userId.toString() !== userId.toString()) {
      return res.status(403).json({
        error: "You are not authorized to delete this comment.",
      });
    }

    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    // remove  from ev comment arr
    const event = await Event.findById(commentToDelete.eventId);
    if (event) {
      event.comments = event.comments.filter(
        (comment) => comment.toString() !== deletedComment._id.toString()
      );
      await event.save();
    }

    res.status(200).json({
      message: "Comment deleted successfully",
      comment: deletedComment,
    });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// comments by event id
export const getCommentsByEventId = async (req, res) => {
  try {
    const comments = await Comment.find({ eventId: req.params.id })
      .populate("userId", "username email img")
      .populate("eventId", "eventName eventDate");

    if (comments.length === 0) {
      return res
        .status(404)
        .json({ message: "No comments found for this event." });
    }

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments by event ID:", error);
    res.status(500).json({ error: "Server error." });
  }
};
