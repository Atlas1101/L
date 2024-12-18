// import axios from "axios";

// const BASE_URL = "http://localhost:3000/api";

// // validate the token
// export const validateToken = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/validateToken`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Token validation failed", error);
//     throw error;
//   }
// };

// //  all users
// export const getAllUsers = async () => {
//   try {
//     const response = await axios.get(`${BASE_URL}/users`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch users", error);
//     throw error;
//   }
// };

// //  user by username
// export const getUserByUsername = async (username: string) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/users/${username}`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to fetch user by username", error);
//     throw error;
//   }
// };

// //  send a friend request
// export const sendFriendRequest = async (targetUserId: string) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/users/sendFriendRequest`,
//       { targetUserId },
//       { withCredentials: true }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to send friend request", error);
//     throw error;
//   }
// };

// //  remove a friend
// export const removeFriend = async (targetUserId: string) => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/users/removeFriend`,
//       { targetUserId },
//       { withCredentials: true }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to remove friend", error);
//     throw error;
//   }
// };

// //  sign up
// export const signUp = async (userData: any) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/users/signup`, userData);
//     return response.data;
//   } catch (error) {
//     console.error("Failed to sign up", error);
//     throw error;
//   }
// };

// //  sign in
// export const signIn = async (userData: any) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/users/signIn`, userData, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to sign in", error);
//     throw error;
//   }
// };

// //  log out
// export const logOut = async () => {
//   try {
//     const response = await axios.post(
//       `${BASE_URL}/users/logOut`,
//       {},
//       { withCredentials: true }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to log out", error);
//     throw error;
//   }
// };

// //  update user
// export const updateUser = async (updateData: any) => {
//   try {
//     const response = await axios.patch(
//       `${BASE_URL}/users/updateUser`,
//       updateData,
//       { withCredentials: true }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Failed to update user", error);
//     throw error;
//   }
// };

// // delete a user
// export const deleteUser = async () => {
//   try {
//     const response = await axios.delete(`${BASE_URL}/users/delete`, {
//       withCredentials: true,
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Failed to delete user", error);
//     throw error;
//   }
// };

import axios, { AxiosResponse } from "axios";

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

// User Data Type
interface User {
    _id: string;
    username: string;
    email: string;
    friends?: User[];
}

// Utility to handle Axios errors
const handleAxiosError = (error: unknown): string | object => {
    if (axios.isAxiosError(error)) {
        return error.response?.data || error.message;
    }
    return "An unexpected error occurred";
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

// 2. Sign Up
export const signUp = async (
    userData: SignUpPayload
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${BASE_URL}/users/signup`,
            userData
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// 3. Sign In
export const signIn = async (
    userData: SignInPayload
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.post(
            `${BASE_URL}/users/signIn`,
            userData,
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
export const updateUser = async (
    updateData: UpdateUserPayload
): Promise<ApiResponse<User>> => {
    try {
        const response: AxiosResponse<User> = await axios.patch(
            `${BASE_URL}/users/updateUser`,
            updateData,
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// 6. Delete User
export const deleteUser = async (): Promise<ApiResponse<null>> => {
    try {
        const response: AxiosResponse<null> = await axios.delete(
            `${BASE_URL}/users/delete`,
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// 7. Fetch All Users
export const getAllUsers = async (): Promise<ApiResponse<User[]>> => {
    try {
        const response: AxiosResponse<User[]> = await axios.get(
            `${BASE_URL}/users`,
            { withCredentials: true }
        );
        return { success: true, data: response.data };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
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

// 9. Send Friend Request
export const sendFriendRequest = async (
    targetUserId: string
): Promise<ApiResponse<null>> => {
    try {
        await axios.post(
            `${BASE_URL}/users/sendFriendRequest`,
            { targetUserId },
            { withCredentials: true }
        );
        return { success: true, data: null }; // Return success directly
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};

// 10. Remove Friend
export const removeFriend = async (
    targetUserId: string
): Promise<ApiResponse<null>> => {
    try {
        await axios.post(
            `${BASE_URL}/users/removeFriend`,
            { targetUserId },
            { withCredentials: true }
        );
        return { success: true, data: null };
    } catch (error) {
        return { success: false, error: handleAxiosError(error) };
    }
};
