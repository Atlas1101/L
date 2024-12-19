// src/utils/userUtils.ts
import { Dispatch } from "redux";
import { setUser } from "@/store/slices/userSlice";
import { validateToken } from "@/api/userAPI";
// import { validateOrganizationToken } from "@/api/organizationAPI";
// 
export const getUserFromToken = async (dispatch: Dispatch) => {
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
  };

  const jwt = getCookie("jwt");
  console.log("JWT:", jwt); // Output the jwt value

  const myuser = await validateToken();

  // Check if username or orgName exists in the response
  if (myuser?.data?.username?.username !== undefined) {
    console.log("here");
    const userId = myuser.data.username._id;
    const username = myuser.data.username.username;
    const userType = "user";
    const myNewUser = { userId, username, userType };
    console.log("new user", myNewUser);

    dispatch(setUser(myNewUser));

    return myNewUser; // Return the user data
  } else if (myuser?.data?.orgName) {
    const organizationUser = { ...myuser, userType: "organization" };
    dispatch(setUser(organizationUser));
    
    return organizationUser;
  }

  return null;
};
