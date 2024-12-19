import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "@/store/slices/userSlice";
import { getUserFromToken } from "@/utils/UserByToken"; // ייבוא הפונקציה החדשה
import EventCarousel from "@/components/EventComponents/EventCarousel";
import EventGrid from "@/components/EventComponents/EventGrid";
import { DrawerLeader } from "@/components/FriendComponent/DrawerLeader";

function VolunteerHome() {
  const dispatch = useDispatch();
  const storedUser = useSelector((state: RootState) => state.user.userData);
  const [user, setUserState] = useState(storedUser); // Initialize state with the stored user data

  useEffect(() => {
    const fetchData = async () => {
      const myuser = await getUserFromToken(dispatch); // השתמשנו בפונקציה מ-`userUtils.ts`
      setUserState(myuser); // Update local state with the user data
    };

        fetchData();
    }, [dispatch]);

    useEffect(() => {
        if (user?.success) {
            console.log(user);

            console.log(
                "Username:",
                user?.data.username.username || "No username found"
            );
            console.log(
                "User ID:",
                user?.data.username._id || "No user ID found"
            );
            console.log(
                "User Type:",
                user?.data?.userType || "No user type found"
            );
        } else {
            console.log("User is not authenticated.");
        }
    }, [user]); // React to changes in `user` state

    return (
        <div className="flex flex-col items-center max-w-full min-h-screen px-1 bg-gradient-to-r from-blue-100 to-purple-100">
            <header className="w-full bg-[hsl(198, 91.40%, 31.80%)] text-[hsl(200,76%,44%)] py-6 mx-3 text-center shadow-md">
                <h1 className="text-3xl font-bold">Be Kind with Your Kind</h1>
                <p className="mt-2 text-sm">
                    Discover and join events that make a difference.
                </p>
            </header>

            <main className="w-full max-w-6xl p-4 mx-3">
                <DrawerLeader />
                <section className="mb-10">
                    <EventCarousel type="date" />
                </section>

                <section className="mb-10">
                    <EventGrid />
                </section>
            </main>

            <footer className="w-full py-4 mt-auto text-center text-white bg-gray-800">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Volunteer Platform. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default VolunteerHome;
