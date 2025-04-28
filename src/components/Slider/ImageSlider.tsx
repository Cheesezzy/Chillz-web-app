import React, { useState, useEffect } from "react";

interface Slide {
  url: string;
  text: string;
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
  position: "relative",
};

const textOverlayStyles: React.CSSProperties = {
  position: "absolute",
  bottom: "20px",
  left: "20px",
  color: "#fff",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
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

  // Reset currentIndex if slides array changes
  useEffect(() => {
    if (slides.length > 0) {
      setCurrentIndex(0);
    }
  }, [slides]);

  // Automatically change slides every 3 seconds
  useEffect(() => {
    if (slides.length === 0) return; // Prevent interval if no slides

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [slides]);

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

  // Handle empty slides array
  if (slides.length === 0) {
    return (
      <div style={sliderStyles}>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No slides available.
        </p>
      </div>
    );
  }

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
