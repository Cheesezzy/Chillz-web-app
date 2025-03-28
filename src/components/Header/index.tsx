import React from "react";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";
import { auth } from "../../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [user] = useAuthState(auth);

  return (
    <header>
      <DesktopHeader
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        isUserSignedIn={user !== null}
      />
      <MobileHeader
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        isUserSignedIn={user !== null}
      />
    </header>
  );
}

export default Header;
