import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header>
      <DesktopHeader
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
      />
      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />
    </header>
  );
}

export default Header;
