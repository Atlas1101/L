import axios from "axios";
import { User } from "@/types/user";
const BASE_URL = "http://localhost:3000/api";

// validate the token
export const validateToken = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users/validateToken`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Token validation failed", error);
    throw error;
  }
};

//  all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch users", error);
    throw error;
  }
};

//  user by username
export const getUserByUsername = async (username: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user by username", error);
    throw error;
  }
};

//  send a friend request
export const sendFriendRequest = async (targetUserId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/sendFriendRequest`,
      { targetUserId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to send friend request", error);
    throw error;
  }
};

//  remove a friend
export const removeFriend = async (targetUserId: string) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/removeFriend`,
      { targetUserId },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to remove friend", error);
    throw error;
  }
};

//  sign up
export const signUp = async (userData: User) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signup`, userData);
    return response.data;
  } catch (error) {
    console.error("Failed to sign up", error);
    throw error;
  }
};

//  sign in
export const signIn = async (userData: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${BASE_URL}/users/signIn`, userData, {
      withCredentials: true,
    });
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error("Failed to sign in", error);
    throw error;
  }
};

//  log out
export const logOut = async () => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/logOut`,
      {},
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to log out", error);
    throw error;
  }
};

//  update user
export const updateUser = async (updateData: any) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/users/updateUser`,
      updateData,
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to update user", error);
    throw error;
  }
};

// delete a user
export const deleteUser = async () => {
  try {
    const response = await axios.delete(`${BASE_URL}/users/delete`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete user", error);
    throw error;
  }
};
