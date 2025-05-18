import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

interface Event {
  id: string;
  title: string;
  description: string;
  organizer: string;
  category: string;
  date: string;
  startTime: string;
  endTime: string;
  location: string;
  image: string | null;
  ticketPrice: string;
  maxAttendees: string;
  interestedUsers: string[]; // Array of user IDs or emails
  posts: { user: string; message: string; timestamp: string }[];
  interest: number; // Field to track the number of interested users
  eventType: string;
  recurringPattern?: {
    frequency: string;
    selectedWeekDays?: string[];
    selectedMonthDays?: string[];
  };
}

export const useAllEventsData = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Query Firestore for current events
        const eventsRef = collection(db, "events");
        const q = query(
          eventsRef,
          where("eventType", "in", ["one-time", "recurring"])
        );
        const querySnapshot = await getDocs(q);

        // Map the Firestore documents to an array of events
        const allEvents: Event[] = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || "",
              description: data.description || "",
              organizer: data.organizer || "",
              date: data.date || "",
              startTime: data.startTime || "",
              endTime: data.endTime || "",
              location: data.location || "",
              category: data.category || "",
              image: data.imageUrl || undefined,
              interestedUsers: data.interestedUsers || [],
              ticketPrice: data.ticketPrice || "",
              posts: data.posts || [],
              eventType: data.eventType || "one-time",
              recurringPattern: data.recurringPattern || undefined,
            } as Event;
          })
          .filter(event => {
            // For one-time events, check if the event date is today or in the future
            if (event.eventType === 'one-time') {
              const eventDate = new Date(event.date);
              eventDate.setHours(0, 0, 0, 0);
              return eventDate >= today;
            }
            // Include all recurring events
            return true;
          });

        setEvents(allEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { events, loading, error };
};
