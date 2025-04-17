import { SetStateAction, useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import Header from "../Header";

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

export default function Free() {
  const [interested, setInterested] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const eventData = {
    organizer: "Tech Innovators Alliance",
    attendees: 0,
  };

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, "events", id!); // Fetch the event by ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setEvent({
            id: docSnap.id,
            title: data.title || "",
            description: data.description || "",
            date: data.date || "",
            startTime: data.startTime || "",
            endTime: data.endTime || "",
            location: data.location || "",
            category: data.category || "",
            image: data.imageUrl || "/event-img.jpeg",
          });
        } else {
          console.log("No such event!");
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  const handleInterestToggle = () => {
    setInterested(!interested);
  };
  // if unauthenticated and clicks on i'm interested or post , redirect to login page include a time stamp

  // if authenticated and clicked on i'm interested, update attendees count +1, if unclicked, -1.
  // if clicked on i'm interested, get auth users email and attach the count to the event details id and save to firestore
  // if unclicked on i'm interested, remove the count data from the event details id and update firestore

  // same with post

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-6 bg-gray-50 mt-16">
        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center text-gray-600 gap-y-2">
            <div className="flex items-center mr-6">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center mr-6">
              <Clock className="w-5 h-5 mr-2" />
              <span>
                {event.startTime} - {event.endTime}
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{event.location}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={handleInterestToggle}
            className={`px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-colors ${
              interested
                ? "bg-pink-100 text-pink-600 border border-pink-200"
                : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
            }`}
          >
            <Heart
              className={`w-5 h-5 mr-2 ${interested ? "fill-pink-500" : ""}`}
            />
            {interested ? "Interested" : "I'm Interested"}
          </button>

          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium flex items-center justify-center hover:bg-gray-200 transition-colors border border-gray-200">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </button>
        </div>

        <div className="mb-8">
          <div className="py-6">
            <div id="about">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-6">{event.description}</p>

              <div className="flex items-center text-gray-600 mb-6">
                <Users className="w-5 h-5 mr-2" />
                <span>{eventData.attendees} people going</span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Organized By</h3>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">{eventData.organizer}</p>
                    <p className="text-sm text-gray-500">Event Organizer</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Discussion
          </h2>

          <div className="mb-4">
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              placeholder="Ask a question about this event..."
              rows={3}
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
              Post
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
