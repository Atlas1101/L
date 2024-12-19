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
    const tags = useRef<HTMLInputElement>(null);
    const date = useRef<HTMLInputElement>(null);
    const startTime = useRef<HTMLInputElement>(null);
    const endTime = useRef<HTMLInputElement>(null);
    const [organization, setOrganization] = useState<string>("");

    // Handle form submission
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
            images: ev ? ev.images : [],
            volunteers: ev ? ev.volunteers : [],
            comments: ev ? ev.comments : [],
        };

        try {
            if (isEditing) {
                // Update existing event
                await axios.put(`/api/events/${ev._id}`, payload);
                alert("Event updated successfully!");
            } else {
                // Create new event
                await axios.post("/api/events", payload);
                alert("Event created successfully!");
            }
            navigate("/"); // Navigate to the desired route
        } catch (error) {
            console.error("Error submitting the form", error);
            alert("Failed to submit the event. Please try again.");
        }
    };

    useEffect(() => {
        if (ev) {
            // Populate fields if editing
            evName.current!.value = ev.evName;
            details.current!.value = ev.details;
            capacity.current!.value = String(ev.capacity);
            address.current!.value = ev.address;
            setOrganization(ev.organization.orgName);
            tags.current!.value = ev.tags.join(" ");
            date.current!.value = new Date(ev.startTime)
                .toISOString()
                .split("T")[0];
            startTime.current!.value = new Date(
                ev.startTime
            ).toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
            });
            endTime.current!.value = new Date(ev.endTime).toLocaleTimeString(
                "en-GB",
                {
                    hour: "2-digit",
                    minute: "2-digit",
                }
            );
        }
    }, [ev]);

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
