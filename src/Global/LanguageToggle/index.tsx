import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const LanguageToggle = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isEnglish, setIsEnglish] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  // Determine current language from URL on component mount
  useEffect(() => {
    const pathParts = location.pathname.split("/en/");
    const langPrefix = pathParts[1];
    setIsEnglish(langPrefix !== "mn");
  }, [location.pathname]);

  const switchLanguage = () => {
    // Start animation
    setIsAnimating(true);

    // Extract current path without language prefix
    const pathParts = location.pathname.split("/");
    pathParts.splice(1, 1); // Remove language part
    const pathWithoutLang = pathParts.join("/") || "/";

    // Set new language prefix
    const newLangPrefix = isEnglish ? "mn" : "en";

    // Wait for animation to complete before navigating
    setTimeout(() => {
      navigate(`/${newLangPrefix}${pathWithoutLang}`);
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
        <span
          className={`text-sm font-medium ${
            isEnglish ? "text-red" : "text-gray-500"
          }`}
        >
          {/* {isEnglish ? "EN" : "MN"} */}
        </span>
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
      {/* <span
        className={`text-sm font-medium ${
          !isEnglish ? "text-red" : "text-gray-500"
        }`}
      >
        MN
      </span> */}
    </div>
  );
};
