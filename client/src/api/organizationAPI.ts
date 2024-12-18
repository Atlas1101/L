// organizationApiClient.ts - API calls related to organizations
import axios from "axios";

// Define the base URL for the API
const BASE_URL = "http://localhost:3000/api";

// Function to validate the organization token
export const validateOrganizationToken = async () => {
  try {
    const response = await axios.get(
      `${BASE_URL}/organizations/validateToken`,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Token validation failed", error);
    throw error;
  }
};

// Get all organizations
export const getAllOrganizations = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/organizations`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch organizations", error);
    throw error;
  }
};

// Get organization by name
export const getOrganizationByName = async (orgName: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/organizations/${orgName}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch organization by name", error);
    throw error;
  }
};

// Sign up a new organization
export const signUpOrganization = async (orgData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/organizations/signup`,
      orgData
    );
    return response.data;
  } catch (error) {
    console.error("Failed to sign up organization", error);
    throw error;
  }
};

// Sign in an organization
export const signInOrganization = async (orgData: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/organizations/signIn`,
      orgData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to sign in organization", error);
    throw error;
  }
};

// Log out an organization
export const logOutOrganization = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/organizations/logOut`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to log out organization", error);
    throw error;
  }
};

// Update organization data
export const updateOrganization = async (updateData: any) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/organizations/updateOrganization`,
      updateData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update organization", error);
    throw error;
  }
};

// Delete an organization
export const deleteOrganization = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/organizations/delete`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete organization", error);
    throw error;
  }
};
