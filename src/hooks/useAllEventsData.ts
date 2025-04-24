import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
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
}

export const useAllEventsData = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        // Query Firestore for all events
        const eventsRef = collection(db, "events");
        const querySnapshot = await getDocs(eventsRef);

        // Map the Firestore documents to an array of events
        const allEvents: Event[] = querySnapshot.docs.map((doc) => {
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
            interestedUsers: data.interestedUsers || "",
            ticketPrice: data.ticketPrice || "",
            posts: data.posts || "",
          } as Event;
        });
        setEvents(allEvents); // Update the state with the fetched events
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
