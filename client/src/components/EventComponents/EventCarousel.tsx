import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import EventViewCard from "./Event-view-card";
import {
    getAllEvents,
    getEventsByUser,
    getEventsByOrganization,
} from "@/api/eventAPI";
import { getUserCity } from "@/utils/userUtils";

export default function EventCarousel({ type }) {
    const { username, orgName } = useParams(); // Extract route params
    const [events, setEvents] = useState([]);
    const [userCity, setUserCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                let data;

                // Fetch events based on user or organization context
                if (username) {
                    data = await getEventsByUser(username);
                } else if (orgName) {
                    data = await getEventsByOrganization(orgName);
                } else {
                    data = await getAllEvents(); // Default: fetch all events
                }

                setEvents(data);
            } catch (err) {
                setError(err.message || "Failed to fetch events");
            } finally {
                setLoading(false);
            }
        };

        const fetchCityIfNeeded = async () => {
            if (type === "location") {
                try {
                    const city = await getUserCity();
                    setUserCity(city);
                } catch (err) {
                    setError(err.message || "Failed to fetch user city");
                }
            }
        };

        setLoading(true);
        Promise.all([fetchEvents(), fetchCityIfNeeded()])
            .then(() => setLoading(false))
            .catch(() => setLoading(false));
    }, [type, username, orgName]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Filter and display relevant events
    const currentDate = new Date();
    let filteredEvents = [];
    let title = "";

    switch (type) {
        case "date":
            filteredEvents = events.filter((event) => {
                const eventDate = new Date(event.startTime);
                const diffInDays =
                    (eventDate - currentDate) / (1000 * 60 * 60 * 24);
                return diffInDays >= 0 && diffInDays <= 7;
            });
            title = "Events Within a Week";
            break;
        case "location":
            filteredEvents = events.filter(
                (event) => event.location === userCity
            );
            title = `Events in ${userCity}`;
            break;
        case "friends":
            filteredEvents = events.filter(
                (event) => event.friendsGoing?.length > 0
            );
            title = "Events Your Friends Are Going To";
            break;
        case "user":
            title = `Events for ${username}`;
            filteredEvents = events; // Assume events fetched are already filtered by user
            break;
        case "organization":
            title = `Events by ${orgName}`;
            filteredEvents = events; // Assume events fetched are already filtered by organization
            break;
        default:
            filteredEvents = events;
            title = "All Events";
    }

    return (
        <div className="my-8">
            <h2 className="text-xl font-bold mb-4">{title}</h2>
            <Carousel
                className="w-full"
                plugins={[
                    Autoplay({
                        delay: 2000,
                    }),
                ]}
                opts={{ loop: true, align: "start" }}
            >
                <CarouselContent className="-ml-2">
                    {filteredEvents.map((event) => (
                        <CarouselItem
                            key={event.id}
                            className="flex justify-center md:basis-1/1 md:basis-1/3 lg:basis-1/4 my-4 pl-2"
                        >
                            <EventViewCard ev={event} />
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-4 top-[55%] -translate-y-1/3 z-10" />
                <CarouselNext className="absolute right-4 top-[55%] -translate-y-1/3 z-10" />
            </Carousel>
        </div>
    );
}
