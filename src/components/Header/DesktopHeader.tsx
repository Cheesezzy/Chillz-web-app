import { Link, useNavigate } from "react-router-dom";
import chillzlogo from "/chillz.png";
import { DesktopHeaderProps } from "./types";
import MenuIcon from "./MenuIcon";
import search from "/search.svg";
import SignIn from "./SignIn";
import { RoutesEnum } from "../../routes";
import "./App.css";

function DesktopHeader({
  setMobileMenuOpen,
  mobileMenuOpen,
  isUserSignedIn,
}: DesktopHeaderProps & { mobileMenuOpen: boolean; isUserSignedIn: boolean }) {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (isUserSignedIn) {
      navigate(href);
    } else {
      navigate(RoutesEnum.Login);
    }
  };

  return (
    <nav className="" aria-label="Global">
      {/* logo */}
      <Link to={RoutesEnum.Home}>
        <img src={chillzlogo} className="logo" alt="Chillz logo" />
      </Link>
      <div className="search bg-white">
        <Link to={RoutesEnum.EventFeeds} className="icon-sec ">
          <img src={search} alt="search" className="search-img" />
          <input
            className="nav-input"
            type="text"
            placeholder="Search for Events"
          />
        </Link>
        <img src={search} alt="search" className="ser" />
      </div>
      <div className="block 2xl:hidden">
        <MenuIcon
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
      </div>
      {/* pages */}

      <div className="hidden 2xl:flex 2xl:gap-x-5">
        <Link
          to={RoutesEnum.EventFeeds}
          className="text-sm font-semibold leading-6 link"
        >
          Event Feeds
        </Link>
        <Link
          to={RoutesEnum.HelpCenter}
          onClick={() => handleNavigation(RoutesEnum.HelpCenter)}
          className="text-sm font-semibold leading-6 link"
        >
          Help Center
        </Link>

        <button
          onClick={() => handleNavigation(RoutesEnum.CreateAnEvent)}
          className="text-sm font-semibold leading-6 link"
        >
          Create an Event
        </button>
        <button
          onClick={() => handleNavigation(RoutesEnum.Tickets)}
          className="text-sm font-semibold leading-6 link"
        >
          Tickets
        </button>
        {/* <LanguageToggle /> */}
      </div>
      {/* login */}
      <div className="hidden 2xl:flex 2xl:justify-end 2xl:gap-4">
        <SignIn />
      </div>
    </nav>
  );
}

export default DesktopHeader;
