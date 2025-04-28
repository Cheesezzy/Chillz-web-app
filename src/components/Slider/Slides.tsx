import React from "react";
import ImageSlider from "./ImageSlider";

const Slides: React.FC = () => {
  const slides = [
    {
      url: "/cover/1.png",
      text: "Welcome, Explore a World of Events",
    },
    { url: "/cover/2.png", text: "Discover Amazing Events" },
    { url: "/cover/3.png", text: "Join the Community" },
    { url: "/cover/1.png", text: "Create Your Own Events" },
    { url: "/cover/2.png", text: "Experience Local Events around you" },
  ];

  return (
    <div>
      <ImageSlider slides={slides} />
    </div>
  );
};

export default Slides;
