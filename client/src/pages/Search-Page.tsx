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
    <div className="max-w-6xl p-4 mx-auto my-8">
      <h1 className="mb-8 text-3xl font-bold text-center">Search</h1>

      {/* Search Controls */}
      <div className="flex flex-col items-center gap-4 mb-8 md:flex-row">
        <input
          type="text"
          placeholder="Search by keyword..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm md:w-2/3 focus:outline-none focus:ring focus:ring-blue-300"
        />
        <select
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        >
          <option value="events">Search Events</option>
          <option value="volunteers">Search Volunteers</option>
          <option value="organizations">Search Organizations</option>
        </select>
        <button
          onClick={handleSearch}
          className="px-6 py-2 text-white transition duration-300 bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div>
        {loading && (
          <div className="font-medium text-center text-blue-600">
            Loading...
          </div>
        )}
        {error && (
          <div className="font-medium text-center text-red-500">{error}</div>
        )}
        {!loading && !error && results.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {searchType === "events" &&
              results.map((event) => (
                <EventViewCard key={event.id} ev={event} />
              ))}
            {searchType === "volunteers" &&
              results.map((volunteer) => (
                <VolunteerCard key={volunteer.id} volunteer={volunteer} />
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
