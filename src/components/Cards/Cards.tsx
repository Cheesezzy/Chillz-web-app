import EventCard from "../CreateEvent/Feeds/EventCard";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import LoadingSpinner from "../LoadingSpinner";
import { useTranslation } from "react-i18next";
import { useAllEventsData } from "../../hooks/useAllEventsData";


function Cards() {
  const { t } = useTranslation();
  const { events, loading } = useAllEventsData();

  return (
    <>
      <div className="px-6">
        <div className="flex justify-between">
          <p className="text-2xl text-extraBold font-semibold">
            {t('popularEvents')}
          </p>
          <Link
            to={RoutesEnum.EventFeeds}
            className="text-sm text-red-600 hover:text-red-800"
          >
            {t('viewAll')}
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {loading ? (
            <div className="flex justify-center items-center h-full"><LoadingSpinner/></div>
          ) : events.length > 0 ? (
            events
              .slice(0, 16)
              .map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p>{t('noEventsFound')}</p>
          )}
        </div>
      </div>
    </>
  );
}

export default Cards;
