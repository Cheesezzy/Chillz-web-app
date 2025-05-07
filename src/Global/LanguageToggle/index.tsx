import { useState } from "react";
import { useTranslation } from "react-i18next";

export const LanguageToggle = () => {
  const { i18n } = useTranslation();
  const [isEnglish, setIsEnglish] = useState(i18n.language === 'en');
  const [isAnimating, setIsAnimating] = useState(false);

  const switchLanguage = () => {
    setIsAnimating(true);
    const newLang = isEnglish ? 'mn' : 'en';
    setTimeout(() => {
      i18n.changeLanguage(newLang);
      setIsEnglish(!isEnglish);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <div className="flex items-center">
        <img
          src={isEnglish ? "/uk-flag.png" : "/mn-flag.png"}
          alt={isEnglish ? "English flag" : "Mongolian flag"}
          className="w-6 h-4 mr-1"
        />
      </div>
      <button
        onClick={switchLanguage}
        className="relative w-12 h-6 bg-gray-200 rounded-full p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red focus:ring-opacity-50"
        aria-label={isEnglish ? "Switch to Mongolian" : "Switch to English"}
      >
        <div
          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transform transition-transform duration-300 shadow-md flex items-center justify-center ${
            isEnglish ? "translate-x-0" : "translate-x-6"
          } ${isAnimating ? "scale-90" : "scale-100"}`}
        ></div>
        <div
          className={`absolute inset-0 rounded-full transition-colors duration-300 ${
            isEnglish ? "" : "bg-red"
          }`}
        ></div>
        <div
          className={`absolute inset-0 flex items-center justify-between px-1.5 text-xs font-bold`}
        >
          <span
            className={`transition-opacity duration-300 ${
              isEnglish ? "opacity-0" : "opacity-100 text-gray-700"
            }`}
          >
            MN
          </span>
          <span
            className={`transition-opacity duration-300 ${
              isEnglish ? "opacity-100 text-gray-700" : "opacity-0"
            }`}
          >
            EN
          </span>
        </div>
      </button>
    </div>
  );
};
