import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Adjust the path to your Firebase config
import EventCard from "../CreateEvent/Feeds/EventCard";

import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  image?: string;
}

function Cards() {
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
            Popular Events
          </p>
          <Link
            to={RoutesEnum.EventFeeds}
            className="text-sm text-red-600 hover:text-red-800"
          >
            View all
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {loading ? (
            <div className="loading-container spinner"></div>
          ) : events.length > 0 ? (
            // Slice the events to show a maximum of 8
            events
              .slice(0, 8)
              .map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p>No events found.</p>
          )}

          {/* Fill remaining slots with placeholders if fewer than 8 events */}
          {!loading &&
            events.length > 0 &&
            events.length < 8 &&
            Array.from({ length: 8 - events.length }).map((_, index) => (
              <div
                key={`placeholder-${index}`}
                className="border border-gray-300 rounded-md shadow-sm h-48 flex items-center justify-center text-gray-400"
              >
                Placeholder
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Cards;
