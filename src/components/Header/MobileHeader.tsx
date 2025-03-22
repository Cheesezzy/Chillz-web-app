import { Dialog } from "@headlessui/react";
import { MobileHeaderProps, NavigationType } from "./types";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../routes";
import chillzlogo from "/chillz.png";
import { navigation } from "./helper";
import SignIn from "./SignIn";
import search from "/search.svg";
import "./App.css";

function MobileHeader({
  mobileMenuOpen,
  setMobileMenuOpen,
}: MobileHeaderProps) {
  return (
    <Dialog
      as="div"
      className="2xl:hidden"
      open={mobileMenuOpen}
      onClose={() => {
        setMobileMenuOpen(false);
      }}
    >
      <div className="fixed inset-0 z-40" />
      <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        {/* Logo */}
        <div className="flex items-center justify-between">
          <Link to={RoutesEnum.Home}>
            <img className="h-10 w-auto" src={chillzlogo} alt="Chillz" />
          </Link>
        </div>

        <div className="mt-6 flow-root mt-12">
          <div className="-my-6 divide-y divide-gray-500/10">
            <div className="space-y-2 py-6 rev">
              {navigation.map((item: NavigationType) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {item.name}
                </a>
              ))}
              <div className="display rev">
                <div className="icon-sec ">
                  <img src={search} alt="search" className="search-img" />
                  <input type="text" placeholder="Search for Events" />
                </div>
                <input type="text" placeholder="Location" className="loc" />
                <img src={search} alt="search" className="ser" />
              </div>
            </div>
            <div className="py-6">
              <SignIn />
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

export default MobileHeader;
