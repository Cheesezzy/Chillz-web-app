import { RoutesEnum } from "../../routes";
import { Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../lib/firebase/Authentication/SignOut";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase"; // Import Firestore
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";

function SignIn({
  setMobileMenuOpen,
}: {
  setMobileMenuOpen?: (open: boolean) => void;
}) {
  const [user, loading] = useAuthState(auth);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!user?.email) return; // Ensure the user is authenticated

      try {
        const docRef = doc(db, "userProfiles", user.email); // Use email as the document ID
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setImageUrl(data.imageUrl); // Set the fetched image URL
        } else {
          console.log("No such document!");
          setImageUrl(null);
        }
      } catch (error) {
        console.error("Error fetching image URL:", error);
      }
    };

    fetchImageUrl();
  }, [user?.email]);

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
    <div className="flex flex-col items-center justify-center flex-col  lg:flex-row">
      <div className="flex items-center link justify-center flex-col  lg:flex-row">
        <img
          className="h-8 w-8 rounded-full mr-2"
          src={imageUrl || "/user.png"}
          alt="User avatar"
        />
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
        Sign Out
      </p>
    </div>
  );
}

export default SignIn;
