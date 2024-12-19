import React, { useState } from "react";
import { getAllEvents } from "@/api/eventAPI"; // Import the relevant API calls
import { getAllUsers } from "@/api/eventAPI"; // Import the relevant API calls
import { getAllOrganizations } from "@/api/eventAPI"; // Import the relevant API calls
import EventViewCard from "../components/EventComponents/Event-view-card";

export default function SearchPage() {
    const [searchType, setSearchType] = useState("events"); // Default to events
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            setError("Please enter a valid search query.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const apiCalls = {
                events: searchEvents,
                volunteers: searchVolunteers,
                organizations: searchOrganizations,
            };

            const data = await apiCalls[searchType](searchQuery);
            setResults(data);
        } catch (err) {
            setError(err.message || "Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Search</h1>

            {/* Search Controls */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-2/3 shadow-sm bg-white focus:outline-none focus:ring focus:ring-blue-300"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-white"
                >
                    <option value="events">Search Events</option>
                    <option value="volunteers">Search Volunteers</option>
                    <option value="organizations">Search Organizations</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300 shadow-sm"
                >
                    Search
                </button>
            </div>

            {/* Search Results */}
            <div>
                {loading && (
                    <div className="text-center text-blue-600 font-medium">
                        Loading...
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500 font-medium">
                        {error}
                    </div>
                )}
                {!loading && !error && results.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {searchType === "events" &&
                            results.map((event) => (
                                <EventViewCard key={event.id} ev={event} />
                            ))}
                        {searchType === "volunteers" &&
                            results.map((volunteer) => (
                                <VolunteerCard
                                    key={volunteer.id}
                                    volunteer={volunteer}
                                />
                            ))}
                        {searchType === "organizations" &&
                            results.map((organization) => (
                                <OrganizationCard
                                    key={organization.id}
                                    organization={organization}
                                />
                            ))}
                    </div>
                )}
                {!loading && !error && results.length === 0 && (
                    <div className="text-center text-gray-500">
                        No results found. Try searching for something else.
                    </div>
                )}
            </div>
        </div>
    );
}
