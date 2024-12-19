import { getUserByUsername } from "@/api/userAPI";
import { useSelector } from "react-redux";

export const getUserCity = async () => {
  const user = useSelector((state) => state.user);
  try {
    // Access the Redux store to get the username
    const username = user.data?.username;

    if (!username) {
      throw new Error("Username is not available in Redux state");
    }

    // Fetch the user data from your API
    const user = await getUserByUsername(username);

    if (!user || !user.city) {
      throw new Error("City information is missing in the user data");
    }

    return user.city; // Return the city
  } catch (error) {
    console.error("Error fetching user city:", error.message);
    throw error;
  }
};
