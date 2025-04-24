import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import chillzlogo from "/chillz.png";
import SignIn from "../Header/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { LanguageToggle } from "../../Global/LanguageToggle";

const Sidebar = () => {
  const [user] = useAuthState(auth); // Get the user from Firebase Auth

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
        className="text-xs sm:text-sm font-medium hover:text-gray-300"
      >
        Dashboard
      </button>
      <button
        onClick={() => handleNavigation(RoutesEnum.EventFeeds)}
        className="text-xs sm:text-sm font-medium hover:text-gray-300"
      >
        Event Feeds
      </button>
      <button
        onClick={() => handleNavigation(RoutesEnum.HelpCenter)}
        className="text-xs sm:text-sm font-medium hover:text-gray-300"
      >
        Help Center
      </button>
      <LanguageToggle />
      <div className="mt-4 sm:mt-auto text-white">
        <SignIn />
      </div>
    </div>
  );
};

export default Sidebar;
