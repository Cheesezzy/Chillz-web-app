import ImageSlider from "./ImageSlider";

interface Slide {
  url: string;
  title: string;
}

const Slides: React.FC = () => {
  const slides: Slide[] = [
    { url: "/cover/1.png", title: "chillz" },
    { url: "/cover/2.png", title: "chillz" },
    { url: "/cover/3.png", title: "chillz" },
    { url: "/cover/1.png", title: "chillz" },
    { url: "/cover/2.png", title: "chillz" },
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
