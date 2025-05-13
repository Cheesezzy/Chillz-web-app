import { Link } from "react-router-dom";
import { RoutesEnum } from "../routes";

export default function JoinChillz() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center bg-blue-50 rounded-xl p-8 gap-8">
        {/* Left: Text and button */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-4">Join Chillz</h2>
          <p className="text-lg text-gray-700 mb-6">
            People use Chillz to meet new people, learn new things, find support, get out of their comfort zones, and pursue their passions. Membership is free.
          </p>
          <Link
            to={RoutesEnum.Register}
            className="inline-block bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Sign up
          </Link>
        </div>
        {/* Right: Illustration */}
        <div className="flex-1 flex justify-center">
          {/* Replace the SVG below with your own illustration if available */}
          <svg
            width="220"
            height="140"
            viewBox="0 0 220 140"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-w-xs"
          >
            <ellipse cx="140" cy="80" rx="80" ry="50" fill="#CFFAFE" />
            <g>
              <rect x="40" y="90" width="12" height="40" rx="6" fill="#FBBF24" />
              <rect x="60" y="70" width="12" height="60" rx="6" fill="#0EA5E9" />
              <rect x="80" y="100" width="12" height="30" rx="6" fill="#F59E42" />
              <rect x="100" y="80" width="12" height="50" rx="6" fill="#2563EB" />
              <rect x="120" y="95" width="12" height="35" rx="6" fill="#10B981" />
              <rect x="140" y="85" width="12" height="45" rx="6" fill="#FBBF24" />
              <rect x="160" y="100" width="12" height="30" rx="6" fill="#0EA5E9" />
              <polygon points="150,70 155,80 145,80" fill="#F87171" />
            </g>
            <g>
              <rect x="60" y="60" width="12" height="10" rx="5" fill="#fff" />
              <rect x="100" y="70" width="12" height="10" rx="5" fill="#fff" />
              <rect x="140" y="75" width="12" height="10" rx="5" fill="#fff" />
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}
