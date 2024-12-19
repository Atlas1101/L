import axios from "axios";

const base_url = "http://localhost:3000/api/comments";

// Get comments by event ID
export const getCommentsByEventId = async (eventId: string) => {
  try {
    const response = await axios.get(`${base_url}/event/${eventId}`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Create a new comment
export const createComment = async (
  comContent: string,
  eventId: string,
  rating: number
) => {
  try {
    const response = await axios.post(
      base_url,
      { comContent, eventId, rating },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Update a comment by ID
export const updateComment = async (
  commentId: string,
  comContent: string,
  rating: number
) => {
  try {
    const response = await axios.put(
      `${base_url}/${commentId}`,
      { comContent, rating },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Delete a comment by ID
export const deleteComment = async (commentId: string) => {
  try {
    const response = await axios.delete(`${base_url}/${commentId}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};
