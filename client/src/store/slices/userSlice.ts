import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "@/types/user";

// Initial state with a specific type
const initialState: UserState = {
    userId: "",
    username: "",
    userType: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        // Set user details
        setUser: (
            state,
            action: PayloadAction<{
                userId: string;
                username: string;
                userType: "volunteer" | "organization";
            }>
        ) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.userType = action.payload.userType;
        },
        // Clear user details
        clearUser: (state) => {
            state.userId = "";
            state.username = "";
            state.userType = "";
        },
    },
});

// Export actions and reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
