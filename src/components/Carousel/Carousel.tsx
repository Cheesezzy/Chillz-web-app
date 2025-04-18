import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define interface for destination
interface Destination {
  id: number;
  name: string;
  image: string;
}

const Carousel: React.FC = () => {
  // Destinations data
  const destinations: Destination[][] = [
    [
      { id: 1, name: "Miami", image: "https://picsum.photos/seed/4/800/600" },
      { id: 2, name: "Boston", image: "https://picsum.photos/seed/5/800/600" },
      {
        id: 3,
        name: "Las Vegas",
        image: "https://picsum.photos/seed/1/800/600",
      },
      {
        id: 4,
        name: "Charlotte",
        image: "https://picsum.photos/seed/2/800/600",
      },
      {
        id: 5,
        name: "New York",
        image: "https://picsum.photos/seed/3/800/600",
      },
      {
        id: 6,
        name: "San Francisco",
        image: "https://picsum.photos/seed/4/800/600",
      },
    ],
    [
      {
        id: 7,
        name: "Orlando",
        image: "https://picsum.photos/seed/5/800/600",
      },
      {
        id: 8,
        name: "Seattle",
        image: "https://picsum.photos/seed/4/800/600",
      },
      { id: 9, name: "Denver", image: "https://picsum.photos/seed/2/800/600" },
      {
        id: 10,
        name: "Atlanta",
        image: "https://picsum.photos/seed/2/800/600",
      },
      {
        id: 11,
        name: "Chicago",
        image: "https://picsum.photos/seed/2/800/600",
      },
      {
        id: 12,
        name: "Houston",
        image: "https://picsum.photos/seed/5/800/600",
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
    <div className="relative w-full max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center mb-20">
        Recomended Places To Visit
      </h2>

      <div className="relative flex items-center">
        {/* Previous Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-0 z-10 bg-white/75 rounded-full p-2 shadow-md hover:bg-white/90 transition -translate-x-1/2"
        >
          <div className="rounded-full bg-white p-1">
            <ChevronLeft size={24} className="text-gray-700" />
          </div>
        </button>

        {/* Next Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-0 z-10 bg-white/75 rounded-full p-2 shadow-md hover:bg-white/90 transition translate-x-1/2"
        >
          <div className="rounded-full bg-white p-1">
            <ChevronRight size={24} className="text-gray-700" />
          </div>
        </button>

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
                        {destination.name}
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
