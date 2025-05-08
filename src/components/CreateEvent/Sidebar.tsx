import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import chillzlogo from "/chillz.png";
import SignIn from "../Header/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { useTranslation } from "react-i18next";

const Sidebar = () => {
  const [user] = useAuthState(auth); // Get the user from Firebase Auth
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (user) {
      navigate(href);
    } else {
      navigate(RoutesEnum.Login);
    }
  };

  return (
    <div className="w-full sm:w-60 h-auto bg-[#1A535C] text-white flex flex-col gap-3 items-center py-6">
      <Link to={RoutesEnum.Home}>
        <img src={chillzlogo} className="logo" alt="Chillz logo" />
      </Link>
      <button
        onClick={() => handleNavigation(RoutesEnum.UserDashboard)}
        className="text-xl font-medium hover:text-gray-300 sm:text-sm font-medium hover:text-gray-300"
      >
        {t("dashboard")}
      </button>
      <button
        onClick={() => handleNavigation(RoutesEnum.EventFeeds)}
        className="text-xl font-medium hover:text-gray-300  sm:text-sm font-medium hover:text-gray-300"
      >
        {t("eventFeeds")}
      </button>
      <button
        onClick={() => handleNavigation(RoutesEnum.HelpCenter)}
        className="text-xl font-medium hover:text-gray-300  sm:text-sm font-medium hover:text-gray-300"
      >
        {t("helpCenter")}
      </button>
      {/* <LanguageToggle /> */}
      <div className="mt-4 sm:mt-auto text-white">
        <SignIn />
      </div>
    </div>
  );
};

export default Sidebar;
