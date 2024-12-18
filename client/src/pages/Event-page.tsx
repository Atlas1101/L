import { useEffect, useState } from "react";
import Event from "@/types/EventType";
import { useParams } from "react-router-dom";
import { getEventById } from "@/api/eventAPI";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { start } from "repl";

export default function EventPage() {
    const [eventData, setEventData] = useState<Event | { images: String[] }>({
        images: [],
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    let images;

    if (eventData.images.length === 0) {
        images = [
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
            "https://via.placeholder.com/150",
        ];
    } else {
        images = eventData.images;
    }

    console.log(eventData);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const event = await getEventById(id);
                setEventData(event);
                setLoading(false);
            } catch (err) {
                setError(err.message || "an error had accrued");
                setLoading(false);
            }
        };
        fetchEventData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div>
                <h1>{eventData.evName}</h1>
                <h3>{eventData.organization.orgName}</h3>
                <span>📍{eventData.address}, </span>
                <Carousel
                    plugins={[Autoplay({ delay: 2000 })]}
                    opts={{ loop: true, align: "center" }}
                >
                    <CarouselContent className="-ml-2">
                        {images.map((image, index) => {
                            return (
                                <CarouselItem
                                    key={index}
                                    className="basis-1/2 my-4 pl-2"
                                >
                                    <img src={image} alt="" />
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                </Carousel>
            </div>
        </>
    );
}
