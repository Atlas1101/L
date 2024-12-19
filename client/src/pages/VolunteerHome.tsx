import React, { useEffect, useState } from "react";
import EventCarousel from "@/components/EventComponents/EventCarousel";
import EventGrid from "@/components/EventComponents/EventGrid";
import { useSelector, useDispatch } from "react-redux";
import { validateToken } from "@/api/userAPI";
import { setUser } from "@/store/slices/userSlice";
import { validateOrganizationToken } from "@/api/organizationAPI";

function VolunteerHome() {
  const dispatch = useDispatch();
  const storedUser = useSelector((state: RootState) => state.user.userData);
  const [user, setUserState] = useState(storedUser); // Initialize state with the stored user data

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  useEffect(() => {
    const fetchData = async () => {
      const jwt = getCookie("jwt");
      console.log("JWT:", jwt); // Output the jwt value

      const myuser = await validateToken();

      // Check if username or orgName exists in the response
      if (myuser?.data?.username.username !== undefined) {
        console.log("here");
        const userId = myuser.data.username._id;
        const username = myuser.data.username.username;
        const userType = "user";
        const myNewUser = { userId, username, userType };
        console.log("new user", myNewUser);

        dispatch(setUser(myNewUser));
      } else if (myuser?.data?.orgName) {
        dispatch(setUser({ ...myuser, userType: "organization" }));
      }

      setUserState(myuser); // Update local state with the user data
    };

    fetchData();
  }, [dispatch]);
  // The useEffect only depends on dispatch, not `user`

  useEffect(() => {
    if (user?.success) {
      console.log(user);

      console.log(
        "Username:",
        user?.data.username.username || "No username found"
      );
      console.log("User ID:", user?.data.username._id || "No user ID found");
      console.log("User Type:", user?.data?.userType || "No user type found");
    } else {
      console.log("User is not authenticated.");
    }
  }, [user]); // React to changes in `user` state

  return (
    <div className="flex flex-col items-center max-w-full min-h-screen px-1 bg-gray-50">
      <header className="w-full bg-[hsl(198, 91.40%, 31.80%)] text-[hsl(200,76%,44%)] py-6 mx-3 text-center shadow-md">
        <h1 className="text-3xl font-bold">Be Kind with Your Kind</h1>
        <p className="mt-2 text-sm">
          Discover and join events that make a difference.
        </p>
      </header>

      <main className="w-full max-w-6xl p-4 mx-3">
        <section className="mb-10">
          <EventCarousel type="date" />
        </section>

        <section className="mb-10">
          <EventCarousel type="location" />
        </section>

        <section className="px-4 mb-10">
          <EventCarousel type="friends" />
        </section>

        <section className="mb-10">
          <EventGrid />
        </section>
      </main>

      <footer className="w-full py-4 mt-auto text-center text-white bg-gray-800">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Volunteer Platform. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default VolunteerHome;
