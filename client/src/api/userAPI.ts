import axios from "axios";
import { User } from "@/types/user";
const BASE_URL = "http://localhost:3000/api";

// Generic API Response Type
interface ApiResponse<T> {
    success?: boolean;
    data?: T;
    error?: string | object;
}

// Payload Types
interface SignUpPayload {
    username: string;
    email: string;
    password: string;
}

interface SignInPayload {
    username: string;
    password: string;
}

interface UpdateUserPayload {
    [key: string]: string | number | boolean;
}

// Utility to handle Axios errors
const handleAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || error.message;
    }
    return "An unexpected error occurred";
};

// Get all users
export const getAllUsers = async () => {
  try {
    const response = await axios.get("/api/users");
    console.log(response.data);
  } catch (error) {
    console.error("Error fetching all users:", error);
  }
};

// Get user friends by username
export const getUserFriends = async (username: string) => {
  try {
    const response = await axios.get(`/api/users/${username}/friends`);
    console.log(response.data);
  } catch (error) {
    console.error(`Error fetching friends for ${username}:`, error);
  }
};

// 1. Validate Token
export const validateToken = async (): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.get(
            `${BASE_URL}/users/validateToken`,
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// 4. Log Out
export const logOut = async (): Promise<ApiResponse<null>> => {
    try {
        const response: AxiosResponse<null> = await axios.post(
            `${BASE_URL}/users/logOut`,
            {},
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// 5. Update User
// Update User
export const updateUser = async (
    userId: string,
    updatedData: UpdateUserPayload
): Promise<ApiResponse<User>> => {
    try {
        const response = await axios.patch<ApiResponse<User>>(
            `${BASE_URL}/updateUser`,
            {
                userId,
                ...updatedData,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
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
        const response = await axios.post(
            `${BASE_URL}/users/signIn`,
            userData,
            {
                withCredentials: true,
            }
        );
        console.log(response.data);

        return response.data;
    } catch (error) {
        console.error("Failed to sign in", error);
        throw error;
    }
};

// 8. Fetch User by Username
export const getUserByUsername = async (
    username: string
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.get(
            `${BASE_URL}/users/${username}`,
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};
//Get All Users
export const getAllUsers = async () => {
    try {
        const response = await fetch("/api/users");
        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch users:", error);
        throw error;
    }
};

// Send Friend Request
export const sendFriendRequest = async (
    userId: string,
    targetUserId: string
): Promise<ApiResponse<null>> => {
    try {
        const response = await axios.post<ApiResponse<null>>(
            `${BASE_URL}/sendFriendRequest`,
            {
                userId,
                targetUserId,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error sending friend request:", error);
        throw error;
    }
};

// Remove Friend
export const removeFriend = async (
    userId: string,
    targetUserId: string
): Promise<ApiResponse<null>> => {
    try {
        const response = await axios.post<ApiResponse<null>>(
            `${BASE_URL}/removeFriend`,
            {
                userId,
                targetUserId,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error removing friend:", error);
        throw error;
    }
};

// Join Event
export const joinEvent = async (
    eventId: string,
    username: string
): Promise<ApiResponse<null>> => {
    try {
        const response = await axios.post<ApiResponse<null>>(
            `${BASE_URL}/events/join`,
            {
                eventId,
                username,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error joining event:", error);
        throw error;
    }
};

// Leave Event
export const leaveEvent = async (
    eventId: string,
    username: string
): Promise<ApiResponse<null>> => {
    try {
        const response = await axios.post<ApiResponse<null>>(
            `${BASE_URL}/events/leave`,
            {
                eventId,
                username,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error leaving event:", error);
        throw error;
    }
};

// Delete User
export const deleteUser = async (
    username: string
): Promise<ApiResponse<null>> => {
    try {
        const response = await axios.delete<ApiResponse<null>>(
            `${BASE_URL}/delete`,
            {
                data: { username },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
