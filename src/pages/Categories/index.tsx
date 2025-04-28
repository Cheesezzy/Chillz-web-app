import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAllEventsData } from "../../hooks/useAllEventsData";
import { RoutesEnum } from "../../routes";
import chillzlogo from "/chillz.png";
import search from "/search.svg";
import DefaultLayout from "../../components/layout/DefaultLayout";
import SignIn from "../../components/Header/SignIn";
import EventCard from "../../components/CreateEvent/Feeds/EventCard";

function CategoryPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const { events, loading, error } = useAllEventsData();

  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter events by category and search term
  const filteredEvents = events.filter((event) => {
    const matchesCategory = category ? event.category === category : true;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categoryCovers: { [key: string]: string } = {
    Business: "/category/business.jpg",
    Food_and_Drinks: "/category/food-drinks.jpg",
    Gaming: "/category/gaming.jpg",
    Gym: "/category/gym.jpeg",
    Hangout: "/category/hangout.jpeg",
    Karaoke: "/category/karaoke.png",
    Musical_Concert: "/category/music.png",
    Sport: "/category/sport.jpg",
    Night_Life_and_Party: "/category/night.png",
  };

  const normalizedCategory = category ? category.replace(/ /g, "_") : null;
  const selectedCover = normalizedCategory
    ? categoryCovers[normalizedCategory]
    : null;

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-800 to-white-500 ">
        {/* Header with Search Input */}
        <header className=" p-2 px-4 shadow-md flex items-center justify-between">
          <Link to={RoutesEnum.Home}>
            <img src={chillzlogo} className="logo" alt="Chillz logo" />
          </Link>
          <SignIn />
        </header>

        <DefaultLayout>
          <img
            src={selectedCover || ""} // Use selectedCover if available, otherwise fallback to a default image
            alt={category || "Default Cover"} // Use the category name or a default alt text
            style={{
              width: "100%",
              height: "300px",
              margin: "0 auto",
              objectFit: "cover", // Ensure the image fits nicely
            }}
          />
          <div className="px-8">
            <div className="flex bg-white p-2 border border-gray-300 items-center rounded-md mt-4">
              <img src={search} alt="search" className="p-2" />

              <input
                type="text"
                placeholder="Search for events by title, description, or location"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-gray-700 focus:outline-none"
              />
            </div>

            <h1 className="text-2xl font-bold mb-2 mt-6">
              Events for {category || "All Categories"}
            </h1>

            {/* Event List */}
            {loading ? (
              <div className="loading-container">
                <div className="spinner"></div> {/* Spinning animation */}
                <p>Loading...</p>
              </div>
            ) : error ? (
              <p>Error loading events. Please try again later.</p>
            ) : filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <p className="text-xl text-gray-600">
                No events found for this category or search term.
              </p>
            )}
          </div>
        </DefaultLayout>

        {/* Footer */}
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
    </>
  );
}

export default CategoryPage;
