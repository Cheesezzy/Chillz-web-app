import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface VerifiedEvent {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  image: string;
  category: string;
  subcategories?: string[];
  description: string;
  price: {
    regular: number;
    vip: number;
    vvip: number;
  };
  currency: string;
  organizer: {
    id: string;
    name: string;
    image: string;
  };
  capacity: number;
  attendees: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  tags: string[];
  venue: {
    name: string;
    address: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  schedule: {
    startDate: string;
    endDate: string;
    sessions: Array<{
      title: string;
      startTime: string;
      endTime: string;
      description: string;
    }>;
  };
  requirements: string[];
  includedItems: string[];
  reviews: Array<{
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
  }>;
  socialLinks: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

interface UseVerifiedEventsReturn {
  events: VerifiedEvent[];
  loading: boolean;
  error: Error | null;
}

export const useVerifiedEvents = (): UseVerifiedEventsReturn => {
  const [events, setEvents] = useState<VerifiedEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchVerifiedEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventsRef = collection(db, "verifiedEvents");
        const querySnapshot = await getDocs(eventsRef);
        
        const today = new Date();
        const fetchedEvents: VerifiedEvent[] = querySnapshot.docs
          .map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              title: data.title || "",
              location: data.location || "",
              date: data.date || "",
              time: data.time || "",
              image: data.image || "/card-default.png",
              category: data.category || "other",
              subcategories: data.subcategories || [],
              mainCategory: data.mainCategory || "",
              description: data.description || "",
              price: {
                regular: data.price?.regular || 0,
                vip: data.price?.vip || 0,
                vvip: data.price?.vvip || 0
              },
              currency: data.currency || "MNT",
              organizer: data.organizer || {
                id: "",
                name: "",
                image: ""
              },
              capacity: data.capacity || 0,
              attendees: data.attendees || 0,
              status: data.status || "upcoming",
              tags: data.tags || [],
              venue: data.venue || {
                name: "",
                address: "",
                coordinates: {
                  latitude: 0,
                  longitude: 0
                }
              },
              schedule: data.schedule || {
                startDate: "",
                endDate: "",
                sessions: []
              },
              requirements: data.requirements || [],
              includedItems: data.includedItems || [],
              reviews: data.reviews || [], 
              socialLinks: data.socialLinks || {}
            };
          })
          .filter(event => {
            const eventDate = new Date(event.date);
            // Only include if eventDate is today or in the future
            return !isNaN(eventDate.getTime()) && eventDate >= new Date(today.toDateString());
          });


        setEvents(fetchedEvents);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An error occurred while fetching events'));
        console.error("Error fetching verified events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVerifiedEvents();
  }, []);

  return { events, loading, error };
}; 

