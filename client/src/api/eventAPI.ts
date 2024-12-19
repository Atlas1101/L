import axios from "axios";

const base_url = "http://localhost:3000";

// all events
export const getAllEvents = async () => {
  try {
    const response = await axios.get(`${base_url}/api/events`, {
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

// event by id
export const getEventById = async (id: string) => {
  try {
    const response = await axios.get(`${base_url}/api/events/${id}`, {
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

// events by user
export const getEventsByUser = async (userId: string) => {
  try {
    const response = await axios.get(`${base_url}/api/events/user/${userId}`, {
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

// events by organization
export const getEventsByOrganization = async (orgId: string) => {
  try {
    const response = await axios.get(
      `${base_url}/api/events/organization/${orgId}`,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// create event
export const createEvent = async (eventData: any) => {
  try {
    const response = await axios.post(`${base_url}/api/events`, eventData, {
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

// update event
export const updateEvent = async (id: string, eventData: any) => {
  try {
    const response = await axios.put(
      `${base_url}/api/events/${id}`,
      eventData,
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const { orgId } = req.body;

    if (!orgId) {
      return res.status(400).json({ error: "Organization ID is required." });
    }

    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.organization.toString() !== orgId) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this event." });
    }

    // Remove event from organization
    const organization = await Organization.findById(orgId);
    if (organization) {
      organization.events = organization.events.filter(
        (eventId) => eventId.toString() !== event._id.toString()
      );
      await organization.save();
    }

    // Remove event from users lists
    await User.updateMany(
      { _id: { $in: event.volunteers } },
      { $pull: { events: event._id } }
    );

    // Remove comments of event
    await Comment.deleteMany({ eventId: event._id });

    await event.remove();
    res.status(200).json({ message: "Event deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: "Unknown server error." });
  }
};
