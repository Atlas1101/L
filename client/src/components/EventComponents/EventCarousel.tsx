import React, { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import EventViewCard from "./Event-view-card";
import { getAllEvents } from "@/api/eventAPI";
import { getUserCity } from "@/utils/userUtils";

export default function EventCarousel({ type }) {
    const [events, setEvents] = useState([]);
    const [userCity, setUserCity] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
            } catch (err) {
                setError(err.message || "Failed to fetch events");
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
    }, [type]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    // Filter events based on type
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
            ); // Filter by city
            title = `Events in ${userCity}`;
            break;
        case "friends":
            filteredEvents = events.filter(
                (event) => event.friendsGoing?.length > 0
            );
            title = "Events Your Friends Are Going To";
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
                <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10" />
            </Carousel>
        </div>
    );
}
