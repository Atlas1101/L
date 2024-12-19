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

// delete event
export const deleteEvent = async (id: string) => {
  try {
    const response = await axios.delete(`${base_url}/api/events/${id}`, {
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
