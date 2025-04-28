import React, { useState, useEffect } from "react";

interface Slide {
  url: string;
  text: string; // Add a text property for each slide
}

interface ImageSliderProps {
  slides: Slide[];
}

const slideStyles: React.CSSProperties = {
  width: "100%",
  height: "400px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  transition: "background-image 1s ease-in-out",
  marginTop: "20px",
  position: "relative", // Make the slide position relative for text overlay
};

const textOverlayStyles: React.CSSProperties = {
  position: "absolute",
  bottom: "20px",
  left: "20px",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background for better readability
  padding: "10px 20px",
  borderRadius: "5px",
  fontSize: "18px",
  fontWeight: "bold",
};

const rightArrowStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  right: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const leftArrowStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translate(0, -50%)",
  left: "32px",
  fontSize: "45px",
  color: "#fff",
  zIndex: 1,
  cursor: "pointer",
};

const sliderStyles: React.CSSProperties = {
  position: "relative",
  height: "100%",
};

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const slideStylesWithBackground: React.CSSProperties = {
    ...slideStyles,
    backgroundImage: `url(${slides[currentIndex].url})`,
  };

  return (
    <div style={sliderStyles}>
      <div>
        <div onClick={goToPrevious} style={leftArrowStyles}>
          ❰
        </div>
        <div onClick={goToNext} style={rightArrowStyles}>
          ❱
        </div>
      </div>
      <div style={slideStylesWithBackground}>
        {/* Text overlay */}
        <div style={textOverlayStyles}>{slides[currentIndex].text}</div>
      </div>
    </div>
  );
};

export default ImageSlider;
