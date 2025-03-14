import ImageSlider from "./ImageSlider";

interface Slide {
  url: string;
  title: string;
}

const Slides: React.FC = () => {
  const slides: Slide[] = [
    { url: "/image-1.jpg", title: "beach" },
    { url: "/image-2.jpg", title: "boat" },
    { url: "/image-3.jpg", title: "forest" },
    { url: "/image-4.jpg", title: "city" },
    { url: "/image-5.jpg", title: "italy" },
  ];

  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "300px",
    margin: "0 auto",
  };

  return (
    <div>
      <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>
    </div>
  );
};

export default Slides;
