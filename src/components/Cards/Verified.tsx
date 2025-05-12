import clock from "/clock.png";
import map from "/location.png";
import dates from "/calendar.png";
import badge from "/badge.png";
import "./Cards.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { verifiedEvents } from "../../data/verifiedEvents";

const Verified = () => {
  const { t } = useTranslation();
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };
  return (
    <div className="card_wrapper">
      <div className="head_text lg:px-18">
        <h2>{t('upcomingEvents')}</h2>
      </div>
      <div className="card grid grid-cols-1 lg:px-18 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {verifiedEvents.map((event) => (
          <Link 
            to="/verified-details" 
            key={event.id} 
            className="block"
            state={{ event }}
          >
            <div className="card_item h-full">
              <div className="card_img px-1">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
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
                <div className="flex flex-col gap-2 px-4 py-2">
                  <h2 className="text-lg font-semibold line-clamp-2">{truncateText(event.title, 4)}</h2>
                  <div className="flex items-end justify-between">
                    <button className="ticket_btn">
                      {t('getTicket')}
                    </button>
                    <span className="flex items-center gap-1">
                      <img src={badge} alt="badge" width={20} height={20} />
                      <p className="text-xs font-semibold">{t('verified')}</p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Verified;
