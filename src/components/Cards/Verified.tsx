import clock from "/clock.png";
import map from "/location.png";
import dates from "/calendar.png";
import badge from "/badge.png";
import "./Cards.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RoutesEnum } from "../../routes";
import LoadingSpinner from "../LoadingSpinner";
import { useVerifiedEvents } from "../../hooks/useVerifiedEvents";

const Verified = () => {
  const { t } = useTranslation();
  const { events, loading, error } = useVerifiedEvents();

  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };
  

  if (error) {
    return (
      <div className="card_wrapper">
        <div className="text-center text-red-600">
          {t('errorLoadingEvents')}
        </div>
      </div>
    );
  }

  return (
    <div className="card_wrapper">
      <div className="flex justify-between items-center lg:px-18">
        <div className="head_text">
          <h2>{t('upcomingEvents')}</h2>
        </div>
        <Link to={RoutesEnum.VerifiedEventFeeds}>
          <p className="text-sm text-red-600 hover:text-red-800">{t('viewAll')}</p>
        </Link>
      </div>
      <div className="card grid grid-cols-1 lg:px-18 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {loading ? (
          <div className="col-span-full flex justify-center items-center">
            <LoadingSpinner />
          </div>
        ) : events.length > 0 ? (
          events
            .filter(event => event.status === 'upcoming' || event.status === 'ongoing')
            .slice(0, 3)
            .map((event) => (
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
                        <i className="text-sm sm">{event.date}</i>
                      </p>
                      <p className="clock">
                        <img src={clock} alt="clock" width={10} height={10} className="icon" />
                        <i className="text-sm sm">{event.time}</i>
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center">
                     <div className="flex flex-wrap items-center gap-2 mt-2 px-2">
                     <span className=" inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
      {t(event.category)}
    </span>
    {(event.subcategories ?? []).map((subcategory) => (
      <span key={subcategory} className="inline-block bg-cyan-100 text-cyan-800 text-xs font-semibold px-3 py-1 rounded-full capitalize">
        {t(subcategory)}
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
      {t(event.status || '')}
    </span>
                     </div>
    </div>
                    <div className="flex flex-col px-4">
                      <h2 className="text-lg font-semibold">{truncateText(event.title, 3)}</h2>
                      <div>
                          {truncateText(event.description, 10)}
                      </div>
                      <div className="flex items-end justify-between py-4">
                        
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
  );
};

export default Verified;
