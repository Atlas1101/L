import React, { useState } from "react";
import {
    searchEvents,
    searchVolunteers,
    searchOrganizations,
} from "@/api/searchAPI"; // Import the relevant API calls
import EventViewCard from "./Event-view-card";
import VolunteerCard from "./Volunteer-card";
import OrganizationCard from "./Organization-card";

export default function SearchPage() {
    const [searchType, setSearchType] = useState("events"); // Default to events
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            let data;
            if (searchType === "events") {
                data = await searchEvents(searchQuery);
            } else if (searchType === "volunteers") {
                data = await searchVolunteers(searchQuery);
            } else if (searchType === "organizations") {
                data = await searchOrganizations(searchQuery);
            }
            setResults(data);
        } catch (err) {
            setError(err.message || "Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Search</h1>

            {/* Search Controls */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Enter your search query..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-2/3"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border border-gray-300 rounded-md px-4 py-2"
                >
                    <option value="events">Search Events</option>
                    <option value="volunteers">Search Volunteers</option>
                    <option value="organizations">Search Organizations</option>
                </select>
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
                >
                    Search
                </button>
            </div>

            {/* Search Results */}
            {loading && <div>Loading...</div>}
            {error && <div className="text-red-500">{error}</div>}
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
                <div>No results found.</div>
            )}
        </div>
    );
}
