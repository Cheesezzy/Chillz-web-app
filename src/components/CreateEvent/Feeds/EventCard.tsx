import { MessageCircle, Users } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  interestedUsers: string[];
  posts: { user: string; message: string; timestamp: string }[]; // Updated type
  image?: string | null;
  eventType: string;
  recurringPattern?: {
    frequency: string;
    selectedWeekDays?: string[];
    selectedMonthDays?: string[];
  };
}

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const { t } = useTranslation();
  const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return text;
  };

  return (
    <Link
      to={`/event/${event.id}`}
      className="bg-white rounded-lg shadow-md overflow-hidden mb-4"
    >
      <div className="h-48 overflow-hidden">
        <img
          src={event.image || "/no-image.png"}
          alt={event.title || "Event Image"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-red-600 bg-red-100 mb-4">
            {t(event.category)}
          </span>
          <div className="flex items-center text-gray-600 mb-6">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm mr-4">
              {event.interestedUsers?.length || ""}
            </span>

            <MessageCircle className="w-4 h-4 mr-1" />
            <span>{event.posts?.length || ""}</span>
          </div>
        </div>
        <h3 className="text-lg text-gray-800 font-semibold mb-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-3">
          {truncateText(event.description, 4)}
        </p>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          <span>
            {event.eventType === 'recurring' ? (
              <>
                {event.recurringPattern?.frequency === 'daily' && t('everyDay')}
                {event.recurringPattern?.frequency === 'weekly' && (
                  <>
                    {t('every')} {event.recurringPattern?.selectedWeekDays?.map(day => t(day.toLowerCase())).join(", ")}
                  </>
                )}
                {event.recurringPattern?.frequency === 'monthly' && (
                  <>
                    {t('every')} {event.recurringPattern?.selectedMonthDays?.join(", ")} {t('ofTheMonth')}
                  </>
                )}
              </>
            ) : (
              event.date
            )}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>
            {event.startTime} - {event.endTime}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            ></path>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            ></path>
          </svg>
          <span>{event.location}</span>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
