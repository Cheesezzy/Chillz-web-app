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
import { useTranslation } from "react-i18next";



function Categories() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const categories = [
    { name: t('musicalConcert'), image: music },
    { name: t('nightLifeAndParty'), image: night },
    { name: t('karaoke'), image: karaoke },
    { name: t('sport'), image: sport },
    { name: t('gym'), image: gym },
    { name: t('business'), image: business },
    { name: t('foodAndDrinks'), image: fooddrinks },
    { name: t('gaming'), image: gaming },
    { name: t('hangout'), image: hangout },
  ];

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
            <h6>{t(category.name)}</h6>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
