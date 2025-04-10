import React, { useState, useEffect } from "react";
import Header from "../../../components/Header";

// Define the Event interface
interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  image?: string;
}

// EventCard component
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
      {event.image && (
        <div className="h-48 overflow-hidden">
          <img
            src="/api/placeholder/400/200"
            alt={event.title}
            className="w-full object-cover"
          />
        </div>
      )}
      <div className="p-4">
        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-600 bg-red-100 mb-2">
          {event.category}
        </span>
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-3">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span>{event.date}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{event.time}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>{event.location}</span>
        </div>
      </div>
    </div>
  );
};

// EventsPage component
const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Simulating API fetch
  useEffect(() => {
    // In a real application, this would be an API call
    const fetchEvents = () => {
      setLoading(true);

      // Simulated data
      const mockEvents: Event[] = [
        {
          id: "1",
          title: "Tech Conference 2025",
          description: "A conference for tech enthusiasts and professionals.",
          date: "April 15, 2025",
          time: "9:00 AM - 5:00 PM",
          location: "Convention Center, Downtown",
          category: "Conference",
          image: "tech-conf.jpg",
        },
        {
          id: "2",
          title: "Annual Charity Gala",
          description: "Join us for a night of giving and entertainment.",
          date: "May 20, 2025",
          time: "7:00 PM - 11:00 PM",
          location: "Grand Hotel Ballroom",
          category: "Conference",
          image: "music-fest.jpg",
        },
        {
          id: "3",
          title: "Summer Music Festival",
          description: "Three days of amazing music and fun activities.",
          date: "June 10-12, 2025",
          time: "All Day",
          location: "City Park",
          category: "Music",
          image: "music-fest.jpg",
        },
        {
          id: "4",
          title: "Business Networking Breakfast",
          description: "Connect with local business leaders over breakfast.",
          date: "April 5, 2025",
          time: "7:30 AM - 9:30 AM",
          location: "Downtown Cafe",
          category: "Business",
          image: "music-fest.jpg",
        },
        {
          id: "5",
          title: "Art Exhibition Opening",
          description: "Be the first to see this amazing new collection.",
          date: "April 22, 2025",
          time: "6:00 PM - 9:00 PM",
          location: "City Gallery",
          category: "Art",
          image: "art-exhibit.jpg",
        },
        {
          id: "6",
          title: "Annual Charity Gala",
          description: "Join us for a night of giving and entertainment.",
          date: "May 20, 2025",
          time: "7:00 PM - 11:00 PM",
          location: "Grand Hotel Ballroom",
          category: "Charity",
          image: "music-fest.jpg",
        },
        {
          id: "7",
          title: "Summer Music Festival",
          description: "Three days of amazing music and fun activities.",
          date: "June 10-12, 2025",
          time: "All Day",
          location: "City Park",
          category: "Music",
          image: "music-fest.jpg",
        },
        {
          id: "8",
          title: "Business Networking Breakfast",
          description: "Connect with local business leaders over breakfast.",
          date: "April 5, 2025",
          time: "7:30 AM - 9:30 AM",
          location: "Downtown Cafe",
          category: "Business",
          image: "music-fest.jpg",
        },
        {
          id: "9",
          title: "Art Exhibition Opening",
          description: "Be the first to see this amazing new collection.",
          date: "April 22, 2025",
          time: "6:00 PM - 9:00 PM",
          location: "City Gallery",
          category: "Art",
          image: "art-exhibit.jpg",
        },
      ];

      setTimeout(() => {
        setEvents(mockEvents);
        setLoading(false);
      }, 1000); // Simulated delay
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
