import { Link } from "react-router-dom";
import { RoutesEnum } from "../routes";

export default function HowChillzWorks() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-2">
      <h2 className="text-3xl font-bold mb-8">How Chillz works</h2>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Discover events and groups */}
        <div className="flex-1 bg-blue-50 rounded-xl p-8 flex items-start gap-4">
          {/* Magnifying glass icon */}
          <div className="flex-shrink-0">
            <svg
              className="w-10 h-10 text-cyan-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Discover events and groups</h3>
            <p className="text-gray-700 mb-2">
              See who's hosting local events for all the things you love
            </p>
            <Link to="/events" className="text-cyan-700 font-semibold hover:underline">
              Search local events happening near you
            </Link>
          </div>
        </div>
        {/* Start a group to host events */}
        <div className="flex-1 bg-blue-50 rounded-xl p-8 flex items-start gap-4">
          {/* Plus icon */}
          <div className="flex-shrink-0">
            <svg
              className="w-10 h-10 text-cyan-700"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-1">Start and host events</h3>
            <p className="text-gray-700 mb-2">
              Create your own Event on Chillz, and draw from a community of millions
            </p>
            <Link to={RoutesEnum.CreateAnEvent} className="text-cyan-700 font-semibold hover:underline">
              Create your own event
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
