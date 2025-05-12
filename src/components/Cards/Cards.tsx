import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Adjust the path to your Firebase config
import EventCard from "../CreateEvent/Feeds/EventCard";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import LoadingSpinner from "../LoadingSpinner";
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
  image?: string;
}

function Cards() {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // Fetch events from Firestore
        const eventsRef = collection(db, "events");
        const querySnapshot = await getDocs(eventsRef);

        // Map Firestore documents to Event objects
        const fetchedEvents: Event[] = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || "",
            description: data.description || "",
            date: data.date || "",
            startTime: data.startTime || "",
            endTime: data.endTime || "",
            location: data.location || "",
            category: data.category || "",
            interestedUsers: data.interestedUsers || [],
            posts: data.posts || [],
            image: data.imageUrl || "/event-img.jpeg", // Fallback image
          };
        });

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);
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
            // Slice the events to show a maximum of 8
            events
              .slice(0, 4)
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
