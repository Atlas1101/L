import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventById } from "@/api/eventAPI";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function EventPage() {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getEventById(id);
                if (eventData.success === false) {
                    throw new Error(eventData.error);
                }
                setEvent(eventData);
            } catch (err) {
                setError(err.message || "Failed to load event details.");
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const images =
        event?.images?.length > 0
            ? event.images
            : [
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
                  "https://via.placeholder.com/150",
              ];

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="p-6 max-w-4xl mx-auto">
            {/* Event Name and Description */}
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
                {event.evName || "Event Name"}
            </h1>
            <p className="text-gray-600 mb-4">
                {event.description || "No description available."}
            </p>

            {/* Carousel for Images */}
            <Carousel
                plugins={[Autoplay({ delay: 2000 })]}
                opts={{ loop: true, align: "center" }}
                className="mb-6"
            >
                <CarouselContent className="-ml-2">
                    {images.map((image, index) => (
                        <CarouselItem
                            key={index}
                            className="basis-1/2 my-4 pl-2"
                        >
                            <img
                                src={image}
                                alt={`Event Image ${index + 1}`}
                                className="rounded-lg shadow-lg w-full h-48 object-cover"
                            />
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Organized By:{" "}
                    <span className="text-gray-600">
                        {event.organization?.orgName || "Unknown Organization"}
                    </span>
                </h3>
                <p className="text-gray-600">
                    📍 Address: {event.address || "Location not provided"}
                </p>
                <p className="text-gray-600">
                    📞 Phone: {event.organization?.phone || "N/A"}
                </p>
                <p className="text-gray-600">
                    📧 Email: {event.organization?.email || "N/A"}
                </p>
            </div>

            {/* Volunteers Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                    Volunteers
                </h3>
                {event.volunteers?.length > 0 ? (
                    <ul className="space-y-2">
                        {event.volunteers.map((volunteer) => (
                            <li
                                key={volunteer._id}
                                className="flex items-center gap-4"
                            >
                                <img
                                    src={
                                        volunteer.img ||
                                        "https://via.placeholder.com/50"
                                    }
                                    alt={volunteer.username}
                                    className="w-12 h-12 rounded-full"
                                />
                                <span className="text-gray-700">
                                    {volunteer.username}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No volunteers yet.</p>
                )}
            </div>
        </div>
    );
}
