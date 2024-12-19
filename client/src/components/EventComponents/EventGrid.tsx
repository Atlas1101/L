import React, { useEffect, useState } from "react";
import EventViewCard from "./Event-view-card";
import { getAllEvents } from "@/api/eventAPI";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export default function EventGrid() {
    const [events, setEvents] = useState([]);
    const [sortedEvents, setSortedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("date"); // Default sorting
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const data = await getAllEvents();
                setEvents(data);
                setSortedEvents(data); // Initialize sorted events
            } catch (err) {
                setError(err.message || "Failed to fetch events");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleSort = (criteria) => {
        let sorted = [...events];

        if (criteria === "date") {
            // Sort by startTime (earliest first)
            sorted.sort(
                (a, b) => new Date(a.startTime) - new Date(b.startTime)
            );
        } else if (criteria === "urgency") {
            // Sort by urgency (volunteers ratio to capacity)
            sorted.sort((a, b) => {
                const aUrgency =
                    a.capacity > 0
                        ? (a.volunteers?.length || 0) / a.capacity
                        : 0;
                const bUrgency =
                    b.capacity > 0
                        ? (b.volunteers?.length || 0) / b.capacity
                        : 0;
                return aUrgency - bUrgency; // Ascending order
            });
        }

        setSortedEvents(sorted);
        setSortBy(criteria); // Update active sort state
    };

    // Pagination logic
    const totalPages = Math.ceil(sortedEvents.length / itemsPerPage);
    const paginatedEvents = sortedEvents.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="justify-center">
            <div className="my-8 w-full px-4">
                {/* Header with Sorting */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">All Events</h2>
                    <select
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                        className="border border-gray-300 rounded-md px-4 py-2 bg-white text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:border-gray-400 transition duration-200 ease-in-out"
                    >
                        <option value="date">Sort by Date</option>
                        <option value="urgency">Sort by Urgency</option>
                    </select>
                </div>

                {/* Event Grid */}
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedEvents.map((event) => (
                        <div key={event.id} className="relative">
                            <EventViewCard ev={event} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                            />
                        </PaginationItem>
                        {[...Array(totalPages).keys()].map((page) => (
                            <PaginationItem key={page + 1}>
                                <PaginationLink
                                    href="#"
                                    isActive={page + 1 === currentPage}
                                    onClick={() => handlePageChange(page + 1)}
                                >
                                    {page + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}
