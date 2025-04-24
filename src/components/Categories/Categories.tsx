import music from "/music.png";
import night from "/party.png";
import karaoke from "/karaoke.png";
import sport from "/sport.png";
import gym from "/weight.png";
import business from "/cooperation.png";
import fooddrinks from "/fast-food.png";
import gaming from "/gaming.png";
import hangout from "/interview.png";
import "./Categories.css";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Musical Concert", image: music },
  { name: "Night Life and Party", image: night },
  { name: "Karaoke", image: karaoke },
  { name: "Sport", image: sport },
  { name: "Gym", image: gym },
  { name: "Business", image: business },
  { name: "Food and Drinks", image: fooddrinks },
  { name: "Gaming", image: gaming },
  { name: "Hangout", image: hangout },
];

function Categories() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/events?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="categories-container">
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.name}
            className="con"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              width="50%"
              height="50%"
            />
            <h6>{category.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
