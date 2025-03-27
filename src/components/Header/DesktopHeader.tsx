import { Link } from "react-router-dom";
import chillzlogo from "/chillz.png";
import { DesktopHeaderProps, NavigationType } from "./types";
import MenuIcon from "./MenuIcon";
import search from "/search.svg";
import { navigation } from "./helper";
import SignIn from "./SignIn";
import "./App.css";

function DesktopHeader({
  setMobileMenuOpen,
  mobileMenuOpen,
}: DesktopHeaderProps & { mobileMenuOpen: boolean }) {
  return (
    <nav className="" aria-label="Global">
      {/* logo */}
      <Link to="/">
        <img src={chillzlogo} className="logo" alt="Chillz logo" />
      </Link>
      <div className="search">
        <div className="icon-sec ">
          <img src={search} alt="search" className="search-img" />
          <input type="text" placeholder="Search for Events" />
        </div>
        <input type="text" placeholder="Location" className="loc" />
        <img src={search} alt="search" className="ser" />
      </div>
      <div className="block 2xl:hidden">
        <MenuIcon
          setMobileMenuOpen={setMobileMenuOpen}
          mobileMenuOpen={mobileMenuOpen}
        />
      </div>
      {/* pages */}

      <div className="hidden 2xl:flex 2xl:gap-x-10">
        {navigation.map((item: NavigationType) => (
          <a
            key={item.name}
            href={item.href}
            className="text-sm font-semibold leading-6 link"
          >
            {item.name}
          </a>
        ))}
      </div>
      {/* login */}
      <div className="hidden 2xl:flex 2xl:justify-end 2xl:gap-4">
        <SignIn />
      </div>
    </nav>
  );
}

export default DesktopHeader;
