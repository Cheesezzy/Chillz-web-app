import React from "react";
import comingSoonImage from "/coming-soon.jpg"; // Replace with your image path

const ComingSoon: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <img src={comingSoonImage} alt="Coming Soon" className="w-64 h-64 mb-6" />
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        No Event Details For This Category Yet!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        We're working hard to bring you something amazing. Stay tuned!
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-500 transition"
      >
        Go Back to Home
      </a>
    </div>
  );
};

export default ComingSoon;
