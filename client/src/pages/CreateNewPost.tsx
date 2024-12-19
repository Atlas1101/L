import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function CreateNewPost({ ev = null }) {
    const [isEditing, setIsEditing] = useState<boolean>(ev != null);
    const navigate = useNavigate();

    // Form refs
    const evName = useRef<HTMLInputElement>(null);
    const details = useRef<HTMLInputElement>(null);
    const capacity = useRef<HTMLInputElement>(null);
    const address = useRef<HTMLInputElement>(null);
    const imageRef = useRef<HTMLInputElement>(null);

    const tags = useRef<HTMLInputElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const startTime = useRef<HTMLInputElement>(null);
    const endTime = useRef<HTMLInputElement>(null);
    const [organization, setOrganization] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            evName: evName.current?.value,
            details: details.current?.value,
            capacity: parseInt(capacity.current?.value || "0", 10),
            address: address.current?.value,
            organization,
            tags: tags.current?.value?.split(" ") || [],
            startTime: new Date(
                `${date.current?.value}T${startTime.current?.value}`
            ),
            endTime: new Date(
                `${date.current?.value}T${endTime.current?.value}`
            ),
            status: ev ? ev.status : "open",
            images: imageRef.current?.value ? [imageRef.current.value] : [],
            volunteers: ev ? ev.volunteers : [],
            comments: ev ? ev.comments : [],
        };

        // Log the payload
        console.log("Payload to be sent:", payload);

        // Check individual fields for undefined or invalid values
        console.log("evName:", evName.current?.value);
        console.log("details:", details.current?.value);
        console.log("capacity:", capacity.current?.value);
        console.log("address:", address.current?.value);
        console.log("organization:", organization);
        console.log("tags:", tags.current?.value?.split(" "));
        console.log("startTime:", payload.startTime);
        console.log("endTime:", payload.endTime);
        console.log("images:", payload.images);

        try {
            if (isEditing) {
                // Log the PUT request details
                console.log("Updating event with ID:", ev?._id);
                const response = await axios.put(
                    `/api/events/${ev._id}`,
                    payload
                );
                console.log("Update response:", response.data);
                alert("Event updated successfully!");
            } else {
                // Log the POST request details
                console.log("Creating new event...");
                const response = await axios.post("/api/events", payload);
                console.log("Create response:", response.data);
                alert("Event created successfully!");
            }

            // Log navigation
            console.log("Navigating to home...");
            navigate("/"); // Navigate to the desired route
        } catch (error) {
            // Log error details
            console.error("Error during event submission:", error);

            // Log Axios error response if available
            if (axios.isAxiosError(error)) {
                console.error("Axios error response:", error.response);
            }

            alert("Failed to submit the event. Please try again.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditing ? "Edit Event" : "Create New Event"}
            </h1>
            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Event Name */}
                <div>
                    <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Event Title
                    </label>
                    <Input
                        ref={evName}
                        name="title"
                        id="title"
                        className="w-full"
                    />
                </div>
                {/* Details */}
                <div>
                    <label
                        htmlFor="details"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Event Details
                    </label>
                    <Input
                        ref={details}
                        name="details"
                        id="details"
                        className="w-full"
                    />
                </div>
                {/* Capacity */}
                <div>
                    <label
                        htmlFor="capacity"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Volunteer Capacity
                    </label>
                    <Input
                        ref={capacity}
                        name="capacity"
                        id="capacity"
                        className="w-full"
                        type="number"
                    />
                </div>
                {/* Image URL */}
                <div>
                    <label
                        htmlFor="imageUrl"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Event Image URL
                    </label>
                    <Input
                        type="url"
                        ref={imageRef}
                        name="imageUrl"
                        id="imageUrl"
                        className="w-full"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                {/* Address */}
                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Address
                    </label>
                    <Input
                        ref={address}
                        name="address"
                        id="address"
                        className="w-full"
                    />
                </div>
                {/* Tags */}
                <div>
                    <label
                        htmlFor="tags"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Tags
                    </label>
                    <Input
                        ref={tags}
                        name="tags"
                        id="tags"
                        className="w-full"
                    />
                </div>
                {/* Date */}
                <div>
                    <label
                        htmlFor="date"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Event Date
                    </label>
                    <Input
                        ref={date}
                        name="date"
                        id="date"
                        className="w-full"
                        type="date"
                    />
                </div>
                {/* Start Time */}
                <div>
                    <label
                        htmlFor="startTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        Start Time
                    </label>
                    <Input
                        ref={startTime}
                        name="startTime"
                        id="startTime"
                        className="w-full"
                        type="time"
                    />
                </div>
                {/* End Time */}
                <div>
                    <label
                        htmlFor="endTime"
                        className="block text-sm font-medium text-gray-700 mb-1"
                    >
                        End Time
                    </label>
                    <Input
                        ref={endTime}
                        name="endTime"
                        id="endTime"
                        className="w-full"
                        type="time"
                    />
                </div>
                {/* Submit */}
                <div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                    >
                        {isEditing ? "Update Event" : "Create Event"}
                    </button>
                </div>
            </form>
        </div>
    );
}
