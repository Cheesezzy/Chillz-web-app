import { useState } from "react";
import clock from "/clock.png";
import map from "/location.png";
import dates from "/calendar.png";
import badge from "/badge.png";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useVerifiedEvents } from "../../hooks/useVerifiedEvents";
import "../../components/Cards/Cards.css";
import { Users } from "lucide-react";
import DefaultLayout from "../../components/layout/DefaultLayout";

const VerifiedEventFeeds = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { events, loading, error } = useVerifiedEvents();

  const categories = [
    { id: "all", name: t('allCategories') },
    { id: "art", name: t('art') },
    { id: "music", name: t('music') },
    { id: "tech", name: t('technology') },
    { id: "food", name: t('food') },
    { id: "sports", name: t('sports') },
    { id: "fashion", name: t('fashion') },
    { id: "travel", name: t('travel') },
    { id: "business", name: t('business') },
    { id: "health", name: t('health') },
    { id: "education", name: t('education') },
    { id: "entertainment", name: t('entertainment') },
    { id: "other", name: t('other') },
  ];

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };

  const filteredEvents = selectedCategory === "all" 
    ? events 
    : events.filter(event => event.category === selectedCategory);

  if (error) {
    return (
      <>
        <Header />
        <div className="card_wrapper mt-18">
          <div className="text-center text-red-600">
            {t('errorLoadingEvents')}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header/>
      <DefaultLayout>
      <div className="card_wrapper mt-18">
        {/* Categories Filter */}
        <div className="flex flex-wrap gap-4 mt-6 lg:px-18">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${selectedCategory === category.id 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        <div className="card grid grid-cols-1 lg:px-18 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {loading ? (
            <div className="col-span-full flex justify-center items-center">
              <LoadingSpinner />
            </div>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link 
                to="/verified-details" 
                key={event.id} 
                className="block"
                state={{ event }}
              >
                <div className="card_item h-full">
                  <div className="card_img px-1">
                  <img
                      src={event.image ? event.image : "/card-default.png"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                      onError={e => { e.currentTarget.src = "/card-default.png"; }}
                    />
                  </div>
                  <div className="card_text">
                    <div className="card_icon">
                      <p className="map">
                        <img src={map} alt="map" width={10} height={10} className="icon" />
                        <i className="text-sm sm">{event.location}</i>
                      </p>
                      <p className="calender">
                        <img src={dates} alt="calender" width={10} height={10} className="icon" />
                        <i className="text-sm sm">{event.date || event.schedule.startDate + " - " + event.schedule.endDate}</i>
                      </p>
                      <p className="clock">
                        <img src={clock} alt="clock" width={10} height={10} className="icon" />
                        <i className="text-sm sm">{event.time}</i>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-between mt-2 gap-2 mb-2">
                     <div className="flex flex-wrap items-center gap-2 mt-2 px-2">
                     <span className=" inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
      {event.category}
    </span>
    {(event.subcategories ?? []).map((subcategory) => (
      <span key={subcategory} className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
        {subcategory}
      </span>
    ))}
    {/* Status */}
    <span
      className={`
        inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize
        ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : ''}
        ${event.status === 'ongoing' ? 'bg-yellow-100 text-yellow-800' : ''}
        ${event.status === 'completed' ? 'bg-gray-200 text-gray-600' : ''}
        ${event.status === 'cancelled' ? 'bg-red-100 text-red-700' : ''}
      `}
    >
      {event.status}
    </span>
                     </div>
                     <div className="flex items-center pr-4">
                    <Users className="w-5 h-5 text-gray-600" />
                    <span>{event.capacity}</span>
                  </div>
    </div>
                    <div className="flex flex-col px-4 py-2">
                      <h2 className="text-lg font-semibold">{truncateText(event.title, 3)}</h2>
                      <div>
                          {truncateText(event.description, 10)}
                      </div>
                      <div className="flex items-end justify-between">
                        
                        <div className="inline-block bg-red-50 text-red-700 font-bold text-sm mt-4 px-3 py-2 rounded-full shadow-sm">
                          {event.price.regular > 0
                            ? `${event.currency} ${event.price.regular.toLocaleString()}`
                            : t('free')}
                        </div>
                        <span className="flex items-center gap-1">
                          <img src={badge} alt="badge" width={20} height={20} />
                          <p className="text-xs font-semibold">{t('verified')}</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {t('noEventsFound')}
            </div>
          )}
        </div>
      </div>
      </DefaultLayout>
    </>
  );
};

export default VerifiedEventFeeds; 