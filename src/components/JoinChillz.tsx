import { Link } from "react-router-dom";
import { RoutesEnum } from "../routes";
import meet from "/meet.png";
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
          <img src={meet} alt="Chillz" className="max-w-xs" />
        </div>
      </div>
    </section>
  );
}
