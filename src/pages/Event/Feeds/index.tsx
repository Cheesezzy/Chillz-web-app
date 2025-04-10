import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";
import { db } from "../../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import EventCard from "../../../components/CreateEvent/Feeds/EventCard";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  image?: string;
}
const EventsPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // Query Firestore for all events
        const eventsRef = collection(db, "events");
        const querySnapshot = await getDocs(eventsRef);

        // Map the Firestore documents to an array of events
        const allEvents: Event[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            date: data.date || "",
            startTime: data.startTime || "",
            endTime: data.endTime || "",
            location: data.location || "",
            category: data.category || "",
            image: data.imageUrl || undefined,
          } as Event;
        });
        setEvents(allEvents); // Update the state with the fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on category and search term
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      filter === "all" || event.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get unique categories for filter options
  const categories = ["all", ...new Set(events.map((event) => event.category))];

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Search and filter section */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Events
              </label>
              <input
                type="text"
                id="search"
                placeholder="Search by title or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-1/3">
              <label
                htmlFor="category-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Filter by Category
              </label>
              <select
                id="category-filter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Events listing */}
        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div> {/* Spinning animation */}
            <p>Loading...</p>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600">
              No events found matching your criteria.
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
