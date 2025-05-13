import React, { useState } from "react";

import EventCard from "../../../components/CreateEvent/Feeds/EventCard";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../../routes";
import SignIn from "../../../components/Header/SignIn";
import chillzlogo from "/chillz.png";
import { useAllEventsData } from "../../../hooks/useAllEventsData";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import Footer from "../../../components/Footer/Footer";

const EventsPage: React.FC = () => {
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { t } = useTranslation();
  const { events, loading } = useAllEventsData();

  // Filter events based on category and search term
  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      filter === "all" || event.category.toLowerCase() === filter.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate =
      !selectedDate ||
      (event.date && event.date.startsWith(selectedDate));
    return matchesCategory && matchesSearch && matchesDate;
  });

  // Get unique categories for filter options
  const categories = ["all", ...new Set(events.map((event) => event.category))];

  return (
    <div className="bg-[#f4f4f9] min-h-screen">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to={RoutesEnum.Home}>
            <img src={chillzlogo} className="logo" alt="Chillz logo" />
          </Link>
          <div className="flex items-center">
            <div className="relative group">
              <SignIn />
            </div>
          </div>
        </div>
      </header>
      <div className="container mx-auto px-4 py-8">
        {/* Search and filter section */}
        <div className="bg-[#F4F4F9] rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="mb-4 md:mb-0 md:w-1/2">
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('searchEvents')}
              </label>
              <input
                type="text"
                id="search"
                placeholder={t('searchEventsPlaceholder')}
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
                {t('filterByCategory')}
              </label>
              <select
                id="category-filter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? t('allCategories') : category}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:w-1/3 mt-4 md:mt-0">
              <label
                htmlFor="date-filter"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                {t('filterByDate') || "Filter by Date"}
              </label>
              <input
                type="date"
                id="date-filter"
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Events listing */}
        {loading ? (
          <LoadingSpinner/>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-2">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-xl text-gray-600">
              {t('noEventsFoundMatchingYourCriteria')}
            </p>
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => {
                setFilter("all");
                setSearchTerm("");
                setSelectedDate("");
              }}
            >
              {t('clearFilters')}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default EventsPage;
