import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clock from "/clock.png";
import map from "/location.png";
import dates from "/calendar.png";
import badge from "/badge.png";
import Header from "../Header";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import SkeletonLoaderV from "../SkeletonLoaderV";
import { useVerifiedEvents, VerifiedEvent } from "../../hooks/useVerifiedEvents";

const TABS = [
  { label: "Overview", key: "overview" },
  { label: "Schedule", key: "schedule" },
  { label: "Price & Details", key: "price" },
  { label: "Requirements", key: "requirements" },
  { label: "Reviews", key: "reviews" },
];

const VerifiedDetails = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { events } = useVerifiedEvents();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [event]);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (loading) {
    return <SkeletonLoaderV />;
  }

  const relatedEvents = events.filter((e: VerifiedEvent) => e.id !== event.id).slice(0, 3);

  return (
    <>
      <Header />
      <div className="bg-white shadow-lg overflow-hidden w-full mt-20">
        <div className="relative">
          <img
            src={event.image ? event.image : "/card-default.png"}
            alt={event.title}
            className="w-full h-[320px] object-cover"
            onError={e => { e.currentTarget.src = "/card-default.png"; }}
          />
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow">
            <img src={badge} alt="verified" width={20} height={20} />
            <span className="text-sm font-semibold text-red-500">{t('verified')}</span>
          </div>
        </div>
      </div>

      <DefaultLayout>
        <div className="flex flex-col lg:flex-row gap-10 mt-5 px-6">
          {/* LEFT COLUMN */}
          <div className="lg:w-1/3 flex flex-col items-center">
            {/* Info Box */}
            <div className="bg-white rounded-lg shadow p-6 mt-6 w-full">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Event Details</h3>
                <div className="mb-2"><b>Duration:</b> {event.time}</div>
                <div className="mb-2">
                  <b>Location:</b>{" "}
                  {event.venue.coordinates.latitude && event.venue.coordinates.longitude ? (
                    <a
                      href={`https://www.google.com/maps?q=${event.venue.coordinates.latitude},${event.venue.coordinates.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 hover:underline flex items-center gap-1"
                    >
                      {event.venue.name || event.location}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  ) : (
                    event.venue.name || event.location
                  )}
                </div>
                <div className="mb-2"><b>Address:</b> {event.venue.address}</div>
                <div className="mb-2"><b>Date:</b> {event.schedule.startDate}</div>
                <div className="mb-2"><b>Capacity:</b> {event.capacity} people</div>
                <div className="mb-2"><b>Attendees:</b> {event.attendees}</div>
                <div className="mb-2"><b>Status:</b> <span className="capitalize">{event.status}</span></div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Organizer</h3>
                <div className="flex items-center gap-3">
                  {(event.organizer.image && !imageError) ? (
                    <img 
                      src={event.organizer.image} 
                      alt={event.organizer.name} 
                      className="w-10 h-10 rounded-full"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {event.organizer.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <button 
                      onClick={() => setShowSocialLinks(!showSocialLinks)}
                      className="font-semibold hover:text-blue-600 transition-colors focus:outline-none"
                    >
                      {event.organizer.name}
                    </button>
                    {/* Show content when name is clicked */}
                    {showSocialLinks && (
                      <div className="mt-2">
                        {event.socialLinks && Object.values(event.socialLinks).some(link => link) ? (
                          <div className="space-y-1">
                            {event.socialLinks.website && (
                              <a 
                                href={event.socialLinks.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-sm text-blue-500 hover:underline"
                              >
                                Visit Website
                              </a>
                            )}
                            {event.socialLinks.facebook && (
                              <a 
                                href={event.socialLinks.facebook} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-sm text-blue-500 hover:underline"
                              >
                                Facebook
                              </a>
                            )}
                            {event.socialLinks.twitter && (
                              <a 
                                href={event.socialLinks.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-sm text-blue-500 hover:underline"
                              >
                                Twitter
                              </a>
                            )}
                            {event.socialLinks.instagram && (
                              <a 
                                href={event.socialLinks.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="block text-sm text-blue-500 hover:underline"
                              >
                                Instagram
                              </a>
                            )}
                          </div>
                        ) : (
                          <div className="text-sm text-red-500 mt-1">
                            No social links or website available for this organizer
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 mt-6">
                {bookingError && (
                  <div className="text-red-500 text-center mb-2">
                    {bookingError}
                  </div>
                )}
                <button 
                  className="border-2 border-red-500 text-red-500 rounded-full py-2 font-semibold hover:bg-red-50 transition"
                  onClick={() => setBookingError("Unable to book for this event at the moment")}
                >
                  BOOK FOR THIS EVENT
                </button>
                <div className="text-center text-gray-500">
                  {event.price.regular > 0 ? (
                    <div className="space-y-1">
                      <div className="font-semibold">Regular: {event.currency} {event.price.regular}</div>
                      {event.price.vip > 0 && <div className="font-semibold">VIP: {event.currency} {event.price.vip}</div>}
                      {event.price.vvip > 0 && <div className="font-semibold">VVIP: {event.currency} {event.price.vvip}</div>}
                    </div>
                  ) : (
                    "Contact for pricing"
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-2/3">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">
                {event.title}
              </h1>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag: string, index: number) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    className={`px-6 py-2 border-2 rounded-full font-semibold transition
                      ${activeTab === tab.key
                        ? 'bg-[#1a535c] text-white border-[#1a535c]'
                        : 'bg-white text-[#1a535c] border-[#1a535c] hover:bg-cyan-50'}
                    `}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-lg shadow p-6">
                {activeTab === "overview" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
                    <p className="mb-4 text-gray-600">{event.description}</p>
                    {event.includedItems.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">What's Included:</h3>
                        <ul className="list-disc list-inside text-gray-600">
                          {event.includedItems.map((item: string, index: number) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === "schedule" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule</h2>
                    <div className="mb-4">
                      <div className="font-semibold">Event Period</div>
                      <div className="text-gray-600">
                        {event.schedule.startDate} - {event.schedule.endDate}
                      </div>
                    </div>
                    {event.schedule.sessions.map((session: { title: string; startTime: string; endTime: string; description: string }, index: number) => (
                      <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold">{session.title}</h3>
                        <div className="text-gray-600">
                          <div>{session.startTime} - {session.endTime}</div>
                          <p className="mt-2">{session.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "price" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Price & Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Pricing</h3>
                        {event.price.regular > 0 ? (
                          <div className="space-y-2">
                            <div className="text-xl font-bold text-red-500">
                              Regular: {event.currency} {event.price.regular}
                            </div>
                            {event.price.vip > 0 && (
                              <div className="text-xl font-bold text-red-500">
                                VIP: {event.currency} {event.price.vip}
                              </div>
                            )}
                            {event.price.vvip > 0 && (
                              <div className="text-xl font-bold text-red-500">
                                VVIP: {event.currency} {event.price.vvip}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="text-2xl font-bold text-red-500">Contact for pricing</div>
                        )}
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Venue</h3>
                        <div className="text-gray-600">
                          <div>{event.venue.name}</div>
                          <div>{event.venue.address}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "requirements" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Requirements</h2>
                    {event.requirements.length > 0 ? (
                      <ul className="list-disc list-inside text-gray-600">
                        {event.requirements.map((req: string, index: number) => (
                          <li key={index} className="mb-2">{req}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-600">No specific requirements listed.</p>
                    )}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Reviews</h2>
                    {event.reviews.length > 0 ? (
                      <div className="space-y-4">
                        {event.reviews.map((review: { userName: string; rating: number; comment: string; date: string }, index: number) => (
                          <div key={index} className="border-b pb-4">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="font-semibold">{review.userName}</span>
                              <span className="text-yellow-500">{"★".repeat(review.rating)}</span>
                            </div>
                            <p className="text-gray-600">{review.comment}</p>
                            <div className="text-sm text-gray-500 mt-2">{review.date}</div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">No reviews yet.</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Events Section */}
        <div className="px-6 mt-10">
          <h2 className="text-xl font-semibold mb-4">Related Events</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedEvents.map((relEvent) => (
              <div
                key={relEvent.id}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    navigate("/verified-details", { state: { event: relEvent } });
                  }, 500);
                }}
              >
                <img src={relEvent.image ? relEvent.image : "/card-default.png"} alt={relEvent.title} className="w-full h-40 object-cover" onError={e => { e.currentTarget.src = "/card-default.png"; }} />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{relEvent.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <img src={map} alt="map" className="w-4 h-4 mr-1" />
                    {relEvent.venue.name || relEvent.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <img src={dates} alt="date" className="w-4 h-4 mr-1" />
                    {relEvent.schedule.startDate}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <img src={clock} alt="clock" className="w-4 h-4 mr-1" />
                    {relEvent.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
      <Footer />
    </>
  );
};

export default VerifiedDetails;
