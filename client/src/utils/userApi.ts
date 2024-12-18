import axios, { AxiosError, AxiosResponse } from "axios";
import Cookies from "js-cookie";

const base_url = `http://localhost:3000`;

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
    [key: string]: string | number | boolean | unknown;
}

// interface FriendRequestPayload {
//     targetUserId: string;
// }

// User Data Type
interface User {
    _id: string;
    username: string;
    email: string;
}

// Utility to handle Axios errors
const handleAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || error.message;
    }
    return "An unexpected error occurred";
};

// Sign Up
export const signUp = async (
    user: SignUpPayload
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${base_url}/api/users/signup`,
            user
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Sign In
export const signIn = async (
    user: SignInPayload
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${base_url}/api/users/signIn`,
            user,
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Log Out
export const logOut = async (): Promise<ApiResponse<null>> => {
    try {
        const token = Cookies.get("jwt");
        if (token) {
            const response = await fetch(`${base_url}/api/users/logOut`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Logout failed.");
            Cookies.remove("jwt");
            return { success: true, data: null };
        } else throw new Error("No token found");
    } catch (error) {
        return { success: false, error: (error as Error).message };
    }
};

// Validate User Token
export const isUserValid = async (): Promise<ApiResponse<User>> => {
    try {
        const jwt = Cookies.get("jwt");
        const response: AxiosResponse<User> = await axios.get(
            `${base_url}/api/users/validateToken`,
            {
                headers: { Authorization: `Bearer ${jwt}` },
            }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Update User
export const updateUser = async (
    updatedUser: UpdateUserPayload
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.patch(
            `${base_url}/api/users/updateUser`,
            updatedUser,
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Delete User
export const deleteUser = async (): Promise<ApiResponse<null>> => {
    try {
        await axios.delete(`${base_url}/api/users/delete`, {
            withCredentials: true,
        });
        return { success: true, data: null };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Fetch User by Username
export const getUserByUsername = async (
    username: string
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.get(
            `${base_url}/api/users/${username}`
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Get Friends of User
export const getUserFriends = async (
    username: string
): Promise<ApiResponse<User[]>> => {
    try {
        const response: AxiosResponse<User[]> = await axios.get(
            `${base_url}/api/users/${username}/friends`
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Send Friend Request
export const sendFriendRequest = async (
    targetUserId: string
): Promise<ApiResponse<null>> => {
    try {
        await axios.post(
            `${base_url}/api/users/sendFriendRequest`,
            { targetUserId },
            { withCredentials: true }
        );
        return { success: true, data: null };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Remove Friend
export const removeFriend = async (
    targetUserId: string
): Promise<ApiResponse<null>> => {
    try {
        await axios.post(
            `${base_url}/api/users/removeFriend`,
            { targetUserId },
            { withCredentials: true }
        );
        return { success: true, data: null };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// Get All Users
export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
    try {
        const response: AxiosResponse<User[]> = await axios.get(
            `${base_url}/api/users/`
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};
