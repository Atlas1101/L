import Event from "../models/eventModel.js";
import Organization from "../models/organizationModel.js";
import userModel from "../models/userModel.js";

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organization", "orgName phone email")
      .populate("volunteers", "username img");

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organization", "orgName phone email")
      .populate("volunteers", "username img");

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

// events of user by name
export const getEventsByUser = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await userModel.findOne({ username: username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const events = await Event.find({ volunteers: user._id })
      .populate("organization", "orgName phone email")
      .populate("volunteers", "username img");

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this user." });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

//  events of organization by name
export const getEventsByOrganization = async (req, res) => {
  try {
    const { orgName } = req.params;
    const organization = await Organization.findOne({ orgName: orgName });

    if (!organization) {
      return res.status(404).json({ message: "Organization not found." });
    }

    const events = await Event.find({ organization: organization._id })
      .populate("organization", "orgName phone email")
      .populate("volunteers", "username img");

    if (events.length === 0) {
      return res
        .status(404)
        .json({ message: "No events found for this organization." });
    }

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

// Create event
export const createEvent = async (req, res) => {
  try {
    const organization = await Organization.findById(req.user.id);

    if (!organization) {
      return res
        .status(403)
        .json({ error: "Only an organization can create an event." });
    }

    const event = new Event({
      ...req.body,
      organization: req.user.id,
    });

    await event.save();

    // Add the event to the organization document
    organization.events.push(event._id);
    await organization.save();

    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.organization.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this event." });
    }

    Object.assign(event, req.body);
    await event.save();

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.organization.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this event." });
    }

    // Remove  event from organization
    const organization = await Organization.findById(req.user.id);
    if (organization) {
      organization.events = organization.events.filter(
        (eventId) => eventId.toString() !== event._id.toString()
      );
      await organization.save();
    }

    // Remove  event from users lists
    await User.updateMany(
      { _id: { $in: event.volunteers } },
      { $pull: { events: event._id } }
    );

    // Remove comments of ev
    await Comment.deleteMany({ eventId: event._id });

    await event.remove();
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};
