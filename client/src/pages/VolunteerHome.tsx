import React from "react";
import EventCarousel from "@/components/EventComponents/EventCarousel";
import EventGrid from "@/components/EventComponents/EventGrid";
import { DrawerLeader } from "@/components/FriendComponent/DrawerLeader";

function VolunteerHome() {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-1 max-w-full">
            <header className="w-full bg-[hsl(198, 91.40%, 31.80%)] text-[hsl(200,76%,44%)] py-6 mx-3 text-center shadow-md">
                <h1 className="text-3xl font-bold">Be Kind with Your Kind</h1>
                <p className="text-sm mt-2">
                    Discover and join events that make a difference.
                </p>
            </header>

            <main className="w-full max-w-6xl p-4 mx-3">
                <DrawerLeader />
                <section className="mb-10">
                    {/* <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Upcoming Events
                    </h2> */}
                    <EventCarousel type="date" />
                </section>

                {/* <section className="mb-10">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Events Near You
                    </h2>
                    <EventCarousel type="location" />
                </section>

                <section className="mb-10 px-4">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Events Your Friends Are Attending
                    </h2>
                    <EventCarousel type="" />
                </section> */}

                <section className="mb-10">
                    <EventGrid />
                </section>
            </main>

            <footer className="w-full bg-gray-800 text-white py-4 text-center mt-auto">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Volunteer Platform. All
                    rights reserved.
                </p>
            </footer>
        </div>
    );
}

export default VolunteerHome;
