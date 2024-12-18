import express from "express";
import {
  getAllEvents,
  getEventById,
  getEventsByUser,
  getEventsByOrganization,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

// all events
router.get("/", getAllEvents);

// event by ID
router.get("/:id", getEventById);

// events of user
router.get("/user/:userId", getEventsByUser);

// events of organization
router.get("/organization/:orgId", getEventsByOrganization);

// Create event
router.post("/", verifyToken, createEvent);

// Update event
router.put("/:id", verifyToken, updateEvent);

// Delete event
router.delete("/:id", verifyToken, deleteEvent);

export default router;
