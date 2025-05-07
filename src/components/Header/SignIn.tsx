import { RoutesEnum } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../lib/firebase/Authentication/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase"; // Import Firestore
import "./App.css";
import { UserImg } from "../UserImg";
import { useTranslation } from 'react-i18next';

function SignIn({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen?: (open: boolean) => void;
}) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleNavigation = (href: string) => {
    if (user) {
      if (setMobileMenuOpen) setMobileMenuOpen(false); // Close the menu if in mobile view
      navigate(href);
    } else {
      if (setMobileMenuOpen) setMobileMenuOpen(false); // Close the menu if in mobile view
      navigate(RoutesEnum.Login);
    }
  };

  if (loading) {
    return <div className="text-red-600">Loading...</div>;
  }

  if (!user || user === null) {
    return (
      <Link
        to={RoutesEnum.Login}
        className="text-sm font-semibold leading-6 log"
        onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)} // Close the menu
      >
        {t('logIn')} <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center flex-col  lg:flex-row">
      <div className="flex items-center link justify-center flex-col  lg:flex-row">
        <UserImg />
        <p
          onClick={() => handleNavigation(RoutesEnum.Account)} // Navigate to /Account
          className="text-sm font-semibold leading-6  cursor-pointer"
        >
          {user.email}
        </p>
      </div>

      <p
        onClick={() => signOutUser(navigate)} // Sign out the user and navigate
        className="text-sm font-semibold leading-6 cursor-pointer text-red-600 log"
      >
        {t('signOut')}
      </p>
    </div>
  );
}

export default SignIn;
