import { MobileHeaderProps } from "./types";
import { Link, useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import chillzlogo from "/chillz.png";
import SignIn from "./SignIn";
import search from "/search.svg";
import "./App.css";

function MobileHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
  isUserSignedIn,
}: MobileHeaderProps) {
  const navigate = useNavigate();

  const handleNavigation = (href: string) => {
    if (isUserSignedIn) {
      setMobileMenuOpen(false);
      navigate(href);
    } else {
      setMobileMenuOpen(false);
      navigate(RoutesEnum.Login);
    }
  };
  return (
    <>
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-opacity-50"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
      {mobileMenuOpen && (
        <section className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* Logo */}
          <div className="flex items-center justify-between">
            <Link
              to={RoutesEnum.Home}
              onClick={() => setMobileMenuOpen(false)} // Close menu on navigation
            >
              <img className="h-10 w-auto" src={chillzlogo} alt="Chillz" />
            </Link>
          </div>

          <div className="mt-6 flow-root ">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 rev">
                <Link to={RoutesEnum.EventFeeds} className="display rev">
                  <div className="icon-sec ">
                    <img src={search} alt="search" className="search-img" />
                    <input type="text" placeholder="Search for Events" />
                  </div>
                </Link>
                <Link
                  to={RoutesEnum.EventFeeds}
                  className="-mx-3 mt-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Event Feeds
                </Link>
                <Link
                  to={RoutesEnum.HelpCenter}
                  className="-mx-3 mt-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Help Center
                </Link>
                <button
                  className="-mx-3 mt-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => handleNavigation(RoutesEnum.Onboarding)}
                >
                  Create an Event
                </button>
                <button
                  className="-mx-3 mt-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  onClick={() => handleNavigation(RoutesEnum.Tickets)}
                >
                  Tickets
                </button>
              </div>
              {/* <LanguageToggle /> */}
              <div className="space-y-2 py-6 rev">
                <SignIn setMobileMenuOpen={setMobileMenuOpen} />
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default MobileHeader;
