import { useLocation, useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clock from "/clock.png";
import map from "/location.png";
import dates from "/calendar.png";
import badge from "/badge.png";
import Header from "../Header";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { verifiedEvents } from "../../data/verifiedEvents";
import SkeletonLoaderV from "../SkeletonLoaderV";

const TABS = [
  { label: "Overview", key: "overview" },
  { label: "Itinerary", key: "itinerary" },
  { label: "Price & Date", key: "price" },
  { label: "Background", key: "background" },
  { label: "Reviews", key: "reviews" },
];

const VerifiedDetails = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event;
  const [activeTab, setActiveTab] = useState("itinerary");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Reset loading every time event changes
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
    return (
      <>
        <SkeletonLoaderV/>
      </>
    );
  }
  const relatedEvents = verifiedEvents.filter(e => e.id !== event.id).slice(0, 3);

  return (
    <>
      <Header />
     
      <div className="bg-white shadow-lg overflow-hidden w-full mt-20">
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-[320px] object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-2 shadow">
                  <img src={badge} alt="verified" width={20} height={20} />
                  <span className="text-sm font-semibold text-red-500">{t('verified')}</span>
                </div>
              </div>
            </div>
            {loading && (
              <SkeletonLoaderV/>
            )}
       <DefaultLayout>
       <div className="flex flex-col lg:flex-row gap-10 mt-5 px-6">
          {/* LEFT COLUMN */}
          <div className="lg:w-1/2 flex flex-col items-center">
            
            {/* Info Box */}
            <div className="bg-white rounded-lg shadow p-6 mt-6 w-full">
              <div className="mb-2"><b>Duration:</b> {event.time}</div>
              <div className="mb-2"><b>Location:</b> {event.location}</div>
              <div className="mb-2"><b>Date:</b> {event.date}</div>
              <div className="mb-2"><b>Attendees:</b> 0</div>
              <div className="flex flex-col gap-3 mt-6">
                <button className="border-2 border-red-500 text-red-500 rounded-full py-2 font-semibold hover:bg-red-50 transition">BOOK FOR THIS EVENT</button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:w-3/4">
            <div className="flex flex-col gap-4">
              {/* Title and duration */}
              <h1 className="text-3xl font-bold">
                {event.title} <span className="text-red-500 font-bold">4 days</span>
              </h1>
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 mt-2 mb-4">
                {TABS.map(tab => (
                  <button
                    key={tab.key}
                    className={`px-6 py-2 border-2 rounded-full font-semibold transition
                      ${activeTab === tab.key
                        ? 'bg-red-500 text-white border-red-500'
                        : 'bg-white text-red-500 border-red-500 hover:bg-red-50'}
                    `}
                    onClick={() => setActiveTab(tab.key)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {/* Description/Itinerary */}
              <div>
                {activeTab === "overview" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Overview</h2>
                    <p className="mb-4 text-gray-500">
                      There are only two million heads of Bactrian camels or two-humped camels in the world. The two-humped camels are native to Central Asian steppes. Among them, the camels in the Mongolian Gobi Desert are an inseparable part of the nomads' livelihood...
                    </p>
                  </div>
                )}
                {activeTab === "itinerary" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Itinerary</h2>
                    <p className="font-bold mb-1">February 1, Day 1: Drive to the Dalanzadgad</p>
                    <p className="mb-2 text-gray-500">
                      Meet with your guide and driver and start the adventure driving 580 km on paved roads of the vast open Gobi Desert steppes heading to Dalanzadgad town. Check-in at a hotel upon arrival in Dalanzadgad.
                    </p>
                    <div className="mb-2"><b>Accommodation:</b> Local hotel</div>
                    <div className="mb-2"><b>Meals:</b> Lunch, Dinner</div>
                  </div>
                )}
                {activeTab === "price" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Price & Date</h2>
                    <p className="text-gray-500">Contact us for the latest price and available dates.</p>
                  </div>
                )}
                {activeTab === "background" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Background</h2>
                    <p className="text-gray-500">Background information about the event goes here.</p>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Reviews</h2>
                    <p className="text-gray-500">No reviews yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Related Events Section */}
        <div className="px-6 mt-10" >
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
                  }, 500); // 500ms for a quick loading effect
                }}
              >
                <img src={relEvent.image} alt={relEvent.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{relEvent.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <img src={map} alt="map" className="w-4 h-4 mr-1" />
                    {relEvent.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-1">
                    <img src={dates} alt="date" className="w-4 h-4 mr-1" />
                    {relEvent.date}
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
