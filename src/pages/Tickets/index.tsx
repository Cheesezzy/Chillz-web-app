import React, { useState, useEffect } from "react";
import {
  Clock,
  Mail,
  ArrowRight,
  GithubIcon,
  TwitterIcon,
  InstagramIcon,
} from "lucide-react";
import chillzlogo from "/chillz.png";

// CountdownTimer component for the coming soon page
const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = targetDate.getTime() - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timeUnits = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <div className="flex justify-center space-x-4 md:space-x-8">
      {timeUnits.map((unit, index) => (
        <div key={index} className="flex flex-col items-center">
          <div className="bg-white bg-opacity-20 rounded-lg w-16 h-16 md:w-24 md:h-24 flex items-center justify-center">
            <span className="text-2xl md:text-4xl font-bold text-white">
              {unit.value}
            </span>
          </div>
          <span className="mt-2 text-sm text-white">{unit.label}</span>
        </div>
      ))}
    </div>
  );
};

// Main ComingSoon component
const ComingSoon: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set launch date to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the email to your backend
    console.log("Email submitted:", email);
    setIsSubmitted(true);
    setEmail("");

    // Reset the submission message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-800 to-red-700 text-white">
      {/* Header with logo */}
      <header className="py-6 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">
            <img src={chillzlogo} className="w-28" alt="Chillz-logo" />
          </div>
          <a href="/" className="text-white hover:text-indigo-200 transition">
            Back to Home
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Coming Soon</h1>
          <p className="text-xl md:text-2xl mb-8">
            We're working hard to bring you the best event management
            experience. Stay tuned!
          </p>

          {/* Countdown timer */}
          <div className="mb-12">
            <h2 className="text-xl mb-6 flex items-center justify-center">
              <Clock className="mr-2" size={24} />
              Launching In
            </h2>
            <CountdownTimer targetDate={launchDate} />
          </div>

          {/* Email notification form */}
          <div className="bg-white bg-opacity-10 rounded-lg p-6 md:p-8 mb-8">
            <h3 className="text-xl mb-4">Get notified when we launch</h3>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col md:flex-row gap-4"
            >
              <div className="flex-grow relative">
                <Mail
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-white"
                />
              </div>
              <button
                type="submit"
                className="bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-6 py-3 flex items-center justify-center transition-colors"
              >
                Notify Me
                <ArrowRight className="ml-2" size={18} />
              </button>
            </form>
            {isSubmitted && (
              <div className="mt-4 text-green-300">
                Thank you! We'll notify you when we launch.
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="mb-4 md:mb-0">
              © 2025 EventMaster. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-white hover:text-indigo-200 transition"
              >
                <TwitterIcon size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-indigo-200 transition"
              >
                <InstagramIcon size={20} />
              </a>
              <a
                href="#"
                className="text-white hover:text-indigo-200 transition"
              >
                <GithubIcon size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ComingSoon;
