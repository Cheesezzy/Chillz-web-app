import React, { useState } from "react";

import EventCard from "../../../components/CreateEvent/Feeds/EventCard";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../../routes";
import SignIn from "../../../components/Header/SignIn";
import chillzlogo from "/chillz.png";
import { useAllEventsData } from "../../../hooks/useAllEventsData";

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { events, loading } = useAllEventsData();

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
    <div className="bg-[#f4f4f9] min-h-screen">
      <header className="bg-[#f7fff7] p-2 px-4 shadow-md flex items-center justify-between">
        <Link to={RoutesEnum.Home}>
          <img src={chillzlogo} className="logo" alt="Chillz logo" />
        </Link>
        <SignIn />
      </header>
      <div className="container mx-auto px-4 py-8">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
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
      <footer className="bg-black text-white w-full mt-auto">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <p className="mt-1 text-sm text-gray-300">
                © 2025 Chillz. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EventsPage;
