import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

// Define interface for destination
interface Destination {
  id: number;
  name: string;
  image: string;
}

const Carousel: React.FC = () => {
  const { t } = useTranslation();
  // Destinations data
  const destinations: Destination[][] = [
    [
      {
        id: 1,
        name: "Genghis Khan Statue Complex",
        image: "/rec-place/chinggis-khan.jpg",
      },
      { id: 2, name: "Gobi Desert", image: "/rec-place/Gobi-desert.jpg" },
      {
        id: 3,
        name: "Khuvsgul Lake",
        image: "/rec-place/Hovsgol-lake.jpg",
      },
      {
        id: 4,
        name: "Terelj National Park",
        image: "/rec-place/Terelj.jpg",
      },
    ],
    [{ id: 6, name: "Gobi Desert", image: "/rec-place/Gobi-desert.jpg" }],
    [
      {
        id: 7,
        name: "Khuvsgul Lake",
        image: "/rec-place/Hovsgol-lake.jpg",
      },
    ],
    [
      {
        id: 8,
        name: "Terelj National Park",
        image: "/rec-place/Terelj.jpg",
      },
    ],
  ];

  const [currentRowIndex, setCurrentRowIndex] = useState(0);
  const [visibleColumns, setVisibleColumns] = useState(4);

  // Responsive column adjustment
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setVisibleColumns(1);
      } else if (width < 1024) {
        setVisibleColumns(2);
      } else if (width < 1280) {
        setVisibleColumns(3);
      } else {
        setVisibleColumns(4);
      }
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentRowIndex((prev) =>
      prev === 0 ? destinations.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentRowIndex((prev) => (prev + 1) % destinations.length);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8 mt-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center mb-8">
        {t('recommendedPlacesToVisit')}
      </h2>

      <div className="relative flex items-center">
        {/* Previous Arrow */}

        {visibleColumns < 4 && (
          <button
            onClick={handlePrev}
            className="absolute left-0 z-10 bg-white/75 rounded-full p-2 shadow-md hover:bg-white/90 transition -translate-x-1/2"
          >
            <div className="rounded-full bg-white p-1">
              <ChevronLeft size={24} className="text-gray-700" />
            </div>
          </button>
        )}

        {/* Next Arrow */}
        {visibleColumns < 4 && (
          <button
            onClick={handleNext}
            className="absolute right-0 z-10 bg-white/75 rounded-full p-2 shadow-md hover:bg-white/90 transition translate-x-1/2"
          >
            <div className="rounded-full bg-white p-1">
              <ChevronRight size={24} className="text-gray-700" />
            </div>
          </button>
        )}

        {/* Destinations Grid */}
        <div className="w-full overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentRowIndex * 100}%)`,
            }}
          >
            {destinations.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`w-full flex-shrink-0 grid gap-4`}
                style={{
                  gridTemplateColumns: `repeat(${visibleColumns}, 1fr)`,
                }}
              >
                {row.slice(0, visibleColumns).map((destination) => (
                  <div
                    key={destination.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="w-full h-40 md:h-48 lg:h-56 object-cover"
                    />
                    <div className="p-3 md:p-4 text-center">
                      <span className="text-base md:text-lg font-semibold">
                        <a href="https://www.amicusmongolia.com/places-to-visit-in-mongolia.html">
                          {destination.name}
                        </a>
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
