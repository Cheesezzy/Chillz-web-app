import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAllEventsData } from "../../hooks/useAllEventsData";
import search from "/search.svg";
import DefaultLayout from "../../components/layout/DefaultLayout";
import EventCard from "../../components/CreateEvent/Feeds/EventCard";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";
import { categoryGroups } from "../../components/CreateEvent/types";

function CategoryPage() {
  const location = useLocation();
  const { t } = useTranslation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const { events, loading, error } = useAllEventsData();
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Category cover images mapping
  const categoryCovers = {
    entertainment: "/category/music-concert.png",
    sports: "/category/gym.png",
    business: "/category/business.png",
    food: "/category/food-drinks.png",
    education: "/category/gaming.jpg",
    social: "/category/party.png",
    cultural: "/category/karaoke.png",
    tours: "/category/tour.jpg",
    other: "/category/hangout.png"
  };

  // Filter events by category and search term
  const filteredEvents = events.filter((event) => {
    // If a main category is selected, check if the event's category is in that main category's subcategories
    const matchesCategory = category 
      ? categoryGroups[category as keyof typeof categoryGroups]?.includes(event.category)
      : true;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchLower) ||
      event.description.toLowerCase().includes(searchLower) ||
      event.location.toLowerCase().includes(searchLower);
    
    return matchesCategory && matchesSearch;
  });

  // Get subcategories for the selected main category
  const subcategories = category ? categoryGroups[category as keyof typeof categoryGroups] || [] : [];

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F7FFF7] to-[#F4F4F9]">
      {/* Category Cover Image */}
      {category && categoryCovers[category as keyof typeof categoryCovers] && (
        <div className="relative w-full h-[400px]">
          <img
            src={categoryCovers[category as keyof typeof categoryCovers]}
            alt={t(category)}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-opacity-40 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white">
              {/* {t(category)} */}
            </h1>
          </div>
        </div>
      )}

      <DefaultLayout>
        <div className="px-4 md:px-8 py-6">
          {/* Search Bar */}
          <div className="flex bg-white p-2 border border-gray-300 items-center rounded-md">
            <img src={search} alt="search" className="p-2 w-6 h-6" />
            <input
              type="text"
              placeholder={t("searchEventsPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-gray-700 focus:outline-none"
            />
          </div>

          {/* Category Title and Subcategories */}
          <div className="my-6">
            <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">
              {category ? t("eventsForCategory", { category: t(category) }) : t("allEvents")}
            </h2>
            <Link to="/verified-event-feeds">
            <p className="text-sm text-red-500 hover:text-red-700 cursor-pointer">
              View Others
            </p>
            </Link>
            </div>
            {category && subcategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {subcategories.map((subcategory) => (
                  <span
                    key={subcategory}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {t(subcategory)}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Event List */}
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center text-red-600 py-8">
              {t("errorLoadingEvents")}
            </div>
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">
              {t("noEventsFound")}
            </div>
          )}
        </div>
      </DefaultLayout>

      {/* Footer */}
      <footer className="bg-black text-white w-full mt-auto">
        <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="md:flex items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <p className="mt-1 text-sm text-gray-300">
                © {new Date().getFullYear()} Chillz. {t("allRightsReserved")}
              </p>
            </div>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:text-white text-sm">
                {t("contactUs")}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CategoryPage;