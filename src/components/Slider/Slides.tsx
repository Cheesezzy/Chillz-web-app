import React from "react";
import ImageSlider from "./ImageSlider";
import { useTranslation } from 'react-i18next';   

const Slides: React.FC = () => {
  const { t } = useTranslation();
  const slides = [
    {
      url: "/cover/1.png",
      text: t('welcome'),
    },
    { url: "/cover/2.png", text: t('discover') },
    { url: "/cover/3.png", text: t('join') },
    { url: "/cover/1.png", text: t('create') },
    { url: "/cover/2.png", text: t('experience') },
  ];

  return (
    <div>
      <ImageSlider slides={slides} />
    </div>
  );
};

export default Slides;
