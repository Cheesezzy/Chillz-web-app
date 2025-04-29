import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../lib/firebase/components/AuthProvider";
import { useEventData } from "../../hooks/useEventData"; // Import the custom hook
import Header from "../Header";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Heart,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";

import Share from "../Button/ShareBtn";
import AlertModal from "../../Modals/AlertModal";
import OrganizationName from "../OrganizationName";

export default function Free() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message
  const { event, organization, interested, loading, toggleInterest, addPost } =
    useEventData(id, user?.email);
  const [newPost, setNewPost] = useState<string>("");

  if (loading) {
    return (
      <div className="loading-container font-bold text-xl text-red-600">
        Loading Event Details...
      </div>
    );
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  const handlePostSubmit = async () => {
    if (!isAuthenticated) {
      navigate("/login", { state: { from: `/event/${id}` } });
      return;
    }

    if (!newPost.trim()) {
      setAlertMessage("Post cannot be empty.");
      return;
    }

    await addPost(newPost);
    setNewPost(""); // Clear the input field
  };

  const handleAlertClose = () => {
    setAlertMessage(null); // Close the alert modal
  };

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-6 bg-gray-50 mt-16">
        {/* Hero Image */}
        <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden mb-6">
          <img
            src={event.imageUrl || "/no-image.png"}
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
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  event.location
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className=" hover:underline"
              >
                {event.location}
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => {
              if (!isAuthenticated) {
                navigate("/login", { state: { from: `/event/${id}` } });
                return;
              }
              toggleInterest();
            }}
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

          <Share event={event} />
        </div>

        <div className="mb-8">
          <div className="py-6">
            <div id="about">
              <h2 className="text-xl font-semibold mb-4">About This Event</h2>
              <p className="text-gray-700 mb-6">{event.description}</p>

              <div className="flex items-center text-gray-600 mb-6">
                <Users className="w-5 h-5 mr-2" />
                <span>{event.interestedUsers?.length || 0} people going</span>
              </div>

              {/* Organized By */}
              <div className="mb-6 hover:cursor-pointer">
                <h3 className="font-semibold mb-2">Organized By</h3>
                {organization ? (
                  <div className="flex items-center ">
                    {organization.logo && (
                      <img
                        src={organization.logo || "/user.png"}
                        alt={organization.organizationName}
                        className="w-16 h-16 rounded-full mb-4 mr-2"
                      />
                    )}
                    <div className="text-xs flex flex-col items-centertext-gray-500">
                      <p className="text-sm text-gray-500">Event Organizer</p>
                      <OrganizationName
                        eventId={event.id}
                        userEmail={event.email}
                      />
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No organization profiles found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Section */}
        {isAuthenticated && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Discussion
            </h2>

            <div className="mb-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                placeholder="Ask a question about this event..."
                rows={3}
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handlePostSubmit}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Post
              </button>
            </div>
            <div className="mt-6">
              {event.posts.length === 0 ? (
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">
                    No comments yet. Start the conversation!
                  </p>
                </div>
              ) : (
                <>
                  {event.posts
                    .slice(0, showAllPosts ? event.posts.length : 2)
                    .map((post, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex-grow">
                          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-2">
                              <p className="font-medium text-gray-800">
                                {post.user.split("@")[0].replace(/[._]/g, " ")}
                              </p>
                              <span className="text-xs text-gray-400">
                                {post.timestamp}
                              </span>
                            </div>
                            <p className="text-gray-600">{post.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  {event.posts.length > 2 && (
                    <div className="text-center mt-4">
                      <button
                        onClick={() => setShowAllPosts(!showAllPosts)}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                      >
                        {showAllPosts ? "Show Less" : "Show More"}
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
      {alertMessage && (
        <AlertModal message={alertMessage} onClose={handleAlertClose} />
      )}
    </>
  );
}
