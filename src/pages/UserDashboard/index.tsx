import React, { useState, useEffect } from "react";
import chillzlogo from "/chillz.png";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase";
import SignIn from "../../components/Header/SignIn";
import StatCard from "../../components/UserDashboard/StatCard";
import PersonalEventList from "../../components/UserDashboard/PersonalEventList";
import AttendingEventList from "../../components/UserDashboard/AttendingEventList";
import { collection, query, where, getDocs } from "firebase/firestore";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
}
// Main Personal Dashboard Component
const UserDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user, loading] = useAuthState(auth);
  const [events, setEvents] = useState<Event[]>([]); // State to store events
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      if (!user?.uid) return; // Ensure the user is authenticated

      try {
        setIsLoading(true);

        // Query Firestore for events created by the authenticated user
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, where("createdBy", "==", user.uid));
        const querySnapshot = await getDocs(q);

        // Map the Firestore documents to an array of events
        const userEvents: Event[] = querySnapshot.docs.map((doc) => ({
          id: doc.id, // Firestore document ID
          title: doc.data().title,
          date: doc.data().date,
          location: doc.data().location,
          attendees: doc.data(doc.data().maxAttendees).attendees || 0, // Default to 0 if attendees is not set
        }));

        setEvents(userEvents); // Update the state with the fetched events
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [user?.uid]);

  if (loading || isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    );
  }

  const eventsAttending = [
    {
      id: 4,
      title: "Tech Conference 2025",
      date: "2025-04-15",
      location: "San Francisco",
      organizer: "Tech Events Inc.",
      role: "Attendee",
    },
    {
      id: 5,
      title: "Department Lunch",
      date: "2025-04-08",
      location: "Bistro Garden",
      organizer: "HR Team",
      role: "Attendee",
    },
    {
      id: 6,
      title: "Quarterly Review",
      date: "2025-04-22",
      location: "Meeting Room 3",
      organizer: "Management",
      role: "Attendee",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to={RoutesEnum.Home}>
            <img src={chillzlogo} className="logo" alt="Chillz logo" />
          </Link>
          {/* <h1 className="text-xl font-semibold text-gray-900">
            My Event Dashboard
          </h1> */}
          <div className="flex items-center">
            <div className="relative group">
              <SignIn />
            </div>
          </div>
        </div>
      </header>
      <div className="border-b border-gray-200">
        <div className="flex items-center justify-center -mb-px">
          <button
            onClick={() => setActiveTab("overview")}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === "overview"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("myEvents")}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === "myEvents"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            My Events
          </button>
          <button
            onClick={() => setActiveTab("attending")}
            className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
              activeTab === "attending"
                ? "border-red-500 text-red-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            Attending
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Welcome Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-3xl font-medium text-gray-900">
            <b>Welcome back,</b>{" "}
            <span className="text-4xl  ml-2">
              <b>{user?.email}</b>
            </span>
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Here's what's happening with your events and tasks.
          </p>
        </div>

        {/* Stats Section */}
        {/* <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-2 mb-6">
          <StatCard
            title="My Events"
            value={stats.myEvents}
            color="bg-red-500"
          />
          <StatCard
            title="Events Attending"
            value={stats.attending}
            color="bg-blue-500"
          />
        </div> */}

        {/* Tabs */}
        <div className="bg-white shadow rounded-lg mb-6">
          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Upcoming Events */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium text-gray-900">
                        My Upcoming Events
                      </h3>
                      <button
                        className="text-sm text-red-600 hover:text-red-800"
                        onClick={() => setActiveTab("myEvents")}
                      >
                        View all
                      </button>
                    </div>
                    <PersonalEventList events={events} />
                  </div>

                  {/* Events I'm Attending */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-base font-medium text-gray-900">
                        Events I'm Attending
                      </h3>
                      <button
                        className="text-sm text-red-600 hover:text-red-800"
                        onClick={() => setActiveTab("attending")}
                      >
                        View all
                      </button>
                    </div>
                    <AttendingEventList events={eventsAttending.slice(0, 2)} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "myEvents" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Events I'm Organizing
                  </h2>
                  <Link
                    to={RoutesEnum.CreateAnEvent}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
                  >
                    Create New Event
                  </Link>
                </div>
                <PersonalEventList events={events} />
              </div>
            )}

            {activeTab === "attending" && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium text-gray-900">
                    Events I'm Attending
                  </h2>
                  <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">
                    Find More Events
                  </button>
                </div>
                <AttendingEventList events={eventsAttending} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
