import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserOrOrganization } from "../../types/user.ts";

// state
interface UserState {
  userData: UserOrOrganization | null;
  isAuthenticated: boolean;
}

// state start
const initialState: UserState = {
  userData: null,
  isAuthenticated: false,
};

// create slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // save the data
    setUser: (state, action: PayloadAction<UserOrOrganization>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
    },

    // clear data
    clearUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});

//reducer
export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
