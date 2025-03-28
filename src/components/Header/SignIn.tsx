import { RoutesEnum } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../lib/firebase/Authentication/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import "./App.css";

function SignIn({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen?: (open: boolean) => void;
}) {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

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
    return <div>Loading...</div>;
  }

  if (!user || user === null) {
    return (
      <Link
        to={RoutesEnum.Login}
        className="text-sm font-semibold leading-6 log"
        onClick={() => setMobileMenuOpen && setMobileMenuOpen(false)} // Close the menu
      >
        Log in <span aria-hidden="true">&rarr;</span>
      </Link>
    );
  }

  return (
    <div className="flex gap-4 flex-col lg:flex-row">
      <p
        onClick={() => handleNavigation(RoutesEnum.Account)} // Navigate to /Account
        className="text-sm font-semibold leading-6 link"
      >
        My Account <span aria-hidden="true">&rarr;</span>
      </p>
      <p
        onClick={() => signOutUser(navigate)} // Sign out the user and navigate
        className="text-sm font-semibold leading-6 cursor-pointer text-red-600 log"
      >
        Sign Out
      </p>
    </div>
  );
}

export default SignIn;
