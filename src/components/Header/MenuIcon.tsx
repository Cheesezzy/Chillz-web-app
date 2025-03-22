import { Bars3Icon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/16/solid";
import React, { useEffect } from "react";
import { MenuIconsProps } from "./types";

function MenuIcon({
  setMobileMenuOpen,
  mobileMenuOpen,
}: MenuIconsProps & { mobileMenuOpen: boolean }) {
  // No local state needed - we use the parent's state directly
  const handleToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex 2xl:hidden">
      <button
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        onClick={handleToggle}
      >
        <span className="sr-only">
          {mobileMenuOpen ? "Close main menu" : "Open main menu"}
        </span>
        {mobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}

export default MenuIcon;
