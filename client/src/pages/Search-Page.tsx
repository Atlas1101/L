import React, { useState, useEffect } from "react";
import { getAllEvents } from "@/api/eventAPI"; // Import the relevant API calls
import { getAllUsers } from "@/api/userAPI";
import { getAllOrganizations } from "@/api/organizationAPI";
import EventViewCard from "../components/EventComponents/Event-view-card";

export default function SearchPage() {
    const [searchType, setSearchType] = useState("events"); // Default to events
    const [searchQuery, setSearchQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Debounce search to prevent excessive API calls
        const debounceTimeout = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch();
            } else {
                setResults([]);
            }
        }, 300); // Adjust debounce delay as needed

        return () => clearTimeout(debounceTimeout);
    }, [searchQuery, searchType]);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);

        try {
            const apiCalls = {
                events: getAllEvents,
                volunteers: getAllUsers,
                organizations: getAllOrganizations,
            };

            const data = await apiCalls[searchType]();
            // Filter data based on the query
            const filteredData = data.filter((item) =>
                searchType === "volunteers"
                    ? item.username
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    : searchType === "events"
                    ? item.evName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
                    : item.orgName
                          .toLowerCase()
                          .includes(searchQuery.toLowerCase())
            );
            setResults(filteredData);
        } catch (err) {
            setError("Failed to fetch search results.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-16 max-w-4xl mx-auto px-6 py-8 bg-white shadow-md rounded-lg">
            <h1 className="text-4xl font-bold mb-10 text-center text-blue-600">
                Search
            </h1>

            {/* Search Controls */}
            <div className="flex flex-col md:flex-row items-center gap-4 mb-8">
                <input
                    type="text"
                    placeholder="Search by keyword..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full md:w-2/3 shadow-sm bg-gray-50 focus:outline-none focus:ring focus:ring-blue-300"
                />
                <select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:outline-none focus:ring focus:ring-blue-300 bg-gray-50"
                >
                    <option value="events">Search Events</option>
                    <option value="volunteers">Search Volunteers</option>
                    <option value="organizations">Search Organizations</option>
                </select>
            </div>

            {/* Search Results */}
            <div>
                {loading && (
                    <div className="text-center text-blue-500 font-medium">
                        Loading...
                    </div>
                )}
                {error && (
                    <div className="text-center text-red-500 font-medium">
                        {error}
                    </div>
                )}
                {!loading && !error && results.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {searchType === "events" &&
                            results.map((event) => (
                                <EventViewCard key={event.id} ev={event} />
                            ))}
                        {searchType === "volunteers" &&
                            results.map((volunteer) => (
                                <div
                                    key={volunteer.id}
                                    className="p-4 bg-gray-50 rounded-lg shadow"
                                >
                                    <p className="font-semibold">
                                        Username: {volunteer.username}
                                    </p>
                                </div>
                            ))}
                        {searchType === "organizations" &&
                            results.map((organization) => (
                                <div
                                    key={organization.id}
                                    className="p-4 bg-gray-50 rounded-lg shadow"
                                >
                                    <p className="font-semibold">
                                        Organization Name:{" "}
                                        {organization.orgName}
                                    </p>
                                </div>
                            ))}
                    </div>
                )}
                {!loading && !error && results.length === 0 && searchQuery && (
                    <div className="text-center text-gray-500">
                        No results found. Try searching for something else.
                    </div>
                )}
            </div>
        </div>
    );
}
