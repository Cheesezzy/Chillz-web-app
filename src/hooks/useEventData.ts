import { useEffect, useState } from "react";
import {
  doc,
  getDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
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
  imageUrl: string | null;
  ticketPrice: string;
  maxAttendees: string;
  interestedUsers: string[]; // Array of user IDs or emails
  posts: { user: string; message: string; timestamp: string }[];
  interest: number; // Field to track the number of interested users
  organizationProfileId: string;
}
interface OrganizationProfile {
  id: string;
  organizationName: string;
  description: string;
  email: string;
  phone: string;
  website: string;
  facebook: string;
  twitter: string;
  instagram: string;
  logo: string | null;
}

export const useEventData = (
  id: string | undefined,
  userEmail: string | undefined
) => {
  const [event, setEvent] = useState<Event | null>(null);
  const [interested, setInterested] = useState(false);
  const [loading, setLoading] = useState(true);
  const [organization, setOrganization] = useState<OrganizationProfile | null>(
    null
  );

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const fetchEventData = async () => {
      try {
        setLoading(true);

        // Fetch the event details
        const eventDocRef = doc(db, "events", id);
        const eventDocSnap = await getDoc(eventDocRef);

        if (eventDocSnap.exists()) {
          const eventData = eventDocSnap.data();
          const eventObj = {
            id: eventDocSnap.id,
            title: eventData.title || "",
            description: eventData.description || "",
            organizer: eventData.organizer || "",
            category: eventData.category || "Hangout",
            date: eventData.date || "",
            startTime: eventData.startTime || "",
            endTime: eventData.endTime || "",
            location: eventData.location || "",
            imageUrl: eventData.imageUrl || null,
            ticketPrice: eventData.ticketPrice || "",
            maxAttendees: eventData.maxAttendees || "",
            interestedUsers: eventData.interestedUsers || [],
            posts: eventData.posts || [],
            interest: eventData.interest || 0,
            organizationProfileId: eventData.organizationProfileId || "",
          };

          setEvent(eventObj);

          // FIX: Check if the user is already interested using the correct field name
          if (userEmail && eventData.interestedUsers?.includes(userEmail)) {
            setInterested(true);
          } else {
            setInterested(false);
          }
          // Fetch the organization profile if organizationProfileId exists
          if (eventData.organizationProfileId) {
            const orgDocRef = doc(
              db,
              "organizationProfile",
              eventData.organizationProfileId
            );
            const orgDocSnap = await getDoc(orgDocRef);

            if (orgDocSnap.exists()) {
              const orgData = orgDocSnap.data();
              const organizationObj: OrganizationProfile = {
                id: orgDocSnap.id,
                organizationName: orgData.organizationName || "",
                description: orgData.description || "",
                email: orgData.email || "",
                phone: orgData.phone || "",
                website: orgData.website || "",
                facebook: orgData.facebook || "",
                twitter: orgData.twitter || "",
                instagram: orgData.instagram || "",
                logo: orgData.logo || null,
              };

              setOrganization(organizationObj);
            }
          }
        } else {
          console.warn(`Event with ID ${id} does not exist.`);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id, userEmail]);

  const toggleInterest = async () => {
    if (!id || !userEmail) return;

    try {
      const eventDocRef = doc(db, "events", id);

      if (interested) {
        // Remove user from interestedUsers and decrement interest
        await updateDoc(eventDocRef, {
          interestedUsers: arrayRemove(userEmail),
        });
        setInterested(false);
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                interestedUsers: prev.interestedUsers.filter(
                  (user) => user !== userEmail
                ),
              }
            : prev
        );
      } else {
        // Add user to interestedUsers and increment interest
        await updateDoc(eventDocRef, {
          interestedUsers: arrayUnion(userEmail),
        });
        setInterested(true);
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                interestedUsers: [...prev.interestedUsers, userEmail],
              }
            : prev
        );
      }
    } catch (error) {
      console.error("Error updating interest:", error);
    }
  };

  const addPost = async (message: string) => {
    if (!id || !userEmail || !message.trim()) return;

    try {
      const eventDocRef = doc(db, "events", id);

      const newPost = {
        user: userEmail,
        message,
        timestamp: new Date().toISOString(),
      };

      // Add the new post to the posts array
      await updateDoc(eventDocRef, {
        posts: arrayUnion(newPost),
      });

      setEvent((prev) =>
        prev ? { ...prev, posts: [...prev.posts, newPost] } : prev
      );
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return { event, organization, interested, loading, toggleInterest, addPost };
};
