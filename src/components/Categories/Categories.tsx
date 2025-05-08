import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Categories.css";

// Import category images
const categoryImages = {
  entertainment: "/music.png",
  sports: "/sport.png",
  business: "/cooperation.png",
  food: "/fast-food.png",
  education: "/gaming.png",
  social: "/party.png",
  cultural: "/art.png",
  techInnovation: "/tech.png",
  other: "/interview.png"
};

function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    { key: 'entertainment', image: categoryImages.entertainment },
    { key: 'sports', image: categoryImages.sports },
    { key: 'business', image: categoryImages.business },
    { key: 'food', image: categoryImages.food },
    { key: 'education', image: categoryImages.education },
    { key: 'social', image: categoryImages.social },
    { key: 'cultural', image: categoryImages.cultural },
    { key: 'techInnovation', image: categoryImages.techInnovation },
    { key: 'other', image: categoryImages.other }
  ];

  const handleCategoryClick = (categoryKey: string) => {
    navigate(`/events?category=${encodeURIComponent(categoryKey)}`);
  };

  return (
    <div className="categories-container">
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category.key}
            className="con"
            onClick={() => handleCategoryClick(category.key)}
          >
            <img
              src={category.image}
              alt={t(category.key)}
              width="50%"
              height="50%"
            />
            <h6>{t(category.key)}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
