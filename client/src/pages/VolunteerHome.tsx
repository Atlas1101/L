import React, { useEffect } from "react";
import EventCarousel from "@/components/EventComponents/EventCarousel";
import EventGrid from "@/components/EventComponents/EventGrid";
import { useSelector, useDispatch } from "react-redux";
import { validateToken } from "@/api/userAPI";
import { setUser } from "@/store/slices/userSlice";
import { validateOrganizationToken } from "@/api/organizationAPI";

function VolunteerHome() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let responseData = await validateOrganizationToken();
        if (responseData === undefined) {
          responseData = await validateToken();
        }

        if (responseData?.data) {
          const { username, _id, orgName } = responseData.data;

          const payload = {
            userId: _id,
            username: username || orgName || "",
            userType: username ? "user" : "organization",
          };

          dispatch(setUser(payload));
        }
      } catch (error) {
        console.error("Error validating token:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (user.isAuthenticated) {
      console.log("Username:", user.userData?.username || "No username found");
      console.log(
        "User ID:",
        user.userData?.username._id || "No user ID found"
      );
      console.log(
        "User Type:",
        user.userData?.userType || "No user type found"
      );
    } else {
      console.log("User is not authenticated.");
    }
  }, [user]);

  // Ensure that the username exists before logging
  console.log(user?.userData?.username);

  useEffect(() => {
    if (user.isAuthenticated) {
      // הדפס את הערכים המתאימים
      console.log(
        "Username:",
        user.userData?.username.username || "No username found"
      );
      console.log(
        "User ID:",
        user.userData?.username._id || "No user ID found"
      );
      console.log(
        "User Type:",
        user.userData?.userType || "No user type found"
      );
    } else {
      console.log("User is not authenticated.");
    }
  }, [user]);

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
