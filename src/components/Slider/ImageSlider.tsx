import React, { useState, useEffect } from "react";

interface Slide {
  url: string;
  text: string;
}

interface ImageSliderProps {
  slides: Slide[];
}

const sliderStyles: React.CSSProperties = {
  position: "relative",
  width: "100%",
  height: "400px",
  overflow: "hidden",
  marginTop: "20px",
};

const slideImageStyles: React.CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  position: "absolute",
  top: 0,
  left: 0,
  transition: "opacity 1s ease-in-out",
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
  zIndex: 2,
};

const arrowStyles: React.CSSProperties = {
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "45px",
  color: "#fff",
  zIndex: 3,
  cursor: "pointer",
};

const leftArrowStyles = { ...arrowStyles, left: "32px" };
const rightArrowStyles = { ...arrowStyles, right: "32px" };

const ImageSlider: React.FC<ImageSliderProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length > 0) {
      setCurrentIndex(0);
    }
  }, [slides]);

  useEffect(() => {
    if (slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  if (slides.length === 0) {
    return (
      <div style={sliderStyles}>
        <p style={{ textAlign: "center", marginTop: "20px" }}>
          No slides available.
        </p>
      </div>
    );
  }

  return (
    <div style={sliderStyles}>
      <div onClick={goToPrevious} style={leftArrowStyles}>
        ❰
      </div>
      <div onClick={goToNext} style={rightArrowStyles}>
        ❱
      </div>

      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.url}
          alt={slide.text}
          style={{
            ...slideImageStyles,
            opacity: index === currentIndex ? 1 : 0,
            zIndex: index === currentIndex ? 1 : 0,
          }}
        />
      ))}

      <div style={textOverlayStyles}>{slides[currentIndex].text}</div>
    </div>
  );
};

export default ImageSlider;
