import { Link, useNavigate } from "react-router-dom";
import chillzlogo from "/chillz.png";
import { DesktopHeaderProps } from "./types";
import MenuIcon from "./MenuIcon";
import search from "/search.svg";
import SignIn from "./SignIn";
import { RoutesEnum } from "../../routes";
import "./App.css";
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuth } from '../../lib/firebase/components/AuthProvider';
import { LanguageToggle } from "../../Global/LanguageToggle";
import { useTranslation } from 'react-i18next';

function DesktopHeader({
  setMobileMenuOpen,
  mobileMenuOpen,
  isUserSignedIn
}: DesktopHeaderProps & { mobileMenuOpen: boolean; isUserSignedIn: boolean }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [hasOrganization, setHasOrganization] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  useEffect(() => {
    const checkOrganizationProfile = async () => {
      if (user?.uid) {
        setIsChecking(true);
        try {
          const orgQuery = query(
            collection(db, 'organizationProfile'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(orgQuery);
          setHasOrganization(!querySnapshot.empty);
        } catch (error) {
          console.error('Error checking organization profile:', error);
          setHasOrganization(false);
        } finally {
          setIsChecking(false);
        }
      }
    };
    checkOrganizationProfile();
  }, [user]);

  const handleNavigation = (route: string) => {
    if (!isUserSignedIn) {
      navigate(RoutesEnum.Login);
      return;
    }

    if (route === RoutesEnum.CreateAnEvent) {
      if (isChecking) return; // Wait for check to complete
      if (!hasOrganization) {
        navigate(RoutesEnum.Onboarding);
      } else {
        navigate(RoutesEnum.CreateAnEvent);
      }
    } else {
      navigate(route);
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
            placeholder={t('search')}
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
          {t('eventFeeds')}
        </Link>
        <Link
          to={RoutesEnum.HelpCenter}
          onClick={() => handleNavigation(RoutesEnum.HelpCenter)}
          className="text-sm font-semibold leading-6 link"
        >
          {t('helpCenter')}
        </Link>

        <button
          onClick={() => handleNavigation(RoutesEnum.CreateAnEvent)}
          className={`text-sm font-semibold leading-6 link ${isChecking ? 'opacity-50 cursor-wait' : ''}`}
          disabled={isChecking}
        >
          {isChecking ? t('checking') : t('createAnEvent')}
        </button>
        <button
          onClick={() => handleNavigation(RoutesEnum.Tickets)}
          className="text-sm font-semibold leading-6 link"
        >
          {t('tickets')}
        </button>
        <LanguageToggle />
      </div>
      {/* login */}
      <div className="hidden 2xl:flex 2xl:justify-end 2xl:gap-4">
        <SignIn />
      </div>
    </nav>
  );
}

export default DesktopHeader;
