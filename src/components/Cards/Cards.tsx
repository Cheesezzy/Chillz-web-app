import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Adjust the path to your Firebase config
import EventCard from "../CreateEvent/Feeds/EventCard";
import Free from "./Free";
import Verified from "./Verified";

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
    <div>
      <Verified />
      <Free />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {loading ? (
          <p>Loading events...</p>
        ) : events.length > 0 ? (
          events.map((event) => <EventCard key={event.id} event={event} />)
        ) : (
          <p>No events found.</p>
        )}
      </div>
    </div>
  );
}

export default Cards;
