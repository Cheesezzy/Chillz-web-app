import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { RoutesEnum } from "./routes";
import React, { useEffect, useState } from "react";
import OnboardingFlow from './components/Onboarding/OnboardingFlow';
import OrganizerSetupForm from "./modules/Account/components/OrganizerSetupForm";
import { useAuth } from "./lib/firebase/components/AuthProvider";
import { db } from "./lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import LoadingSpinner from "./components/LoadingSpinner";
import VerifiedDetails from "./components/EventDetails/VerifiedDetails";
const Home = React.lazy(() => import("./pages/Hero"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Account = React.lazy(() => import("./pages/Account"));
const RequireUser = React.lazy(() => import("./lib/firebase/components/RequireUser"));
const Tickets = React.lazy(() => import("./pages/Tickets"));
const EventFeeds = React.lazy(() => import("./pages/Event/Feeds"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const CreateAnEvent = React.lazy(() => import("./pages/Event/CreateEvent"));
const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
const EventDetails = React.lazy(() => import("./pages/Event/EventDetails"));
const CategoryPage = React.lazy(() => import("./pages/Categories"));

// Protected Route Component for Organization Setup
const OrganizationSetupRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [hasOrganization, setHasOrganization] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOrganizationProfile = async () => {
      if (user?.uid) {
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
      } else {
        setIsChecking(false);
      }
    };
    checkOrganizationProfile();
  }, [user]);

  if (isChecking) {
    return <div><LoadingSpinner/></div>; // You can replace this with your loading component
  }

  // If user has an organization profile, redirect to create event
  if (hasOrganization) {
    return <Navigate to={RoutesEnum.CreateAnEvent} replace />;
  }

  // If user doesn't have an organization profile, allow access to setup
  return <>{children}</>;
};

// Protected Route Component for Create Event
const CreateEventRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const [hasOrganization, setHasOrganization] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkOrganizationProfile = async () => {
      if (user?.uid) {
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
      } else {
        setIsChecking(false);
      }
    };
    checkOrganizationProfile();
  }, [user]);

  if (isChecking) {
    return <div><LoadingSpinner/></div>; 
  }

  // If user doesn't have an organization profile, redirect to setup
  if (!hasOrganization) {
    return <Navigate to={RoutesEnum.Onboarding} replace />;
  }

  // If user has an organization profile, allow access to create event
  return <>{children}</>;
};

const App = () => {
  return (
    <>
      <Routes>
        {/* English Routes */}
        <Route path={RoutesEnum.Login} element={<Login />} />
        <Route path={RoutesEnum.Home} element={<Home />} />
        <Route path={RoutesEnum.Register} element={<Register />} />
        <Route path={RoutesEnum.ForgotPassword} element={<ForgotPassword />} />
        <Route path={RoutesEnum.CategoryPage} element={<CategoryPage />} />
        <Route
          path={RoutesEnum.Account}
          element={
            <RequireUser>
              <Account />
            </RequireUser>
          }
        />
        <Route
          path={RoutesEnum.Tickets}
          element={
            <RequireUser>
              <Tickets />
            </RequireUser>
          }
        />
        <Route
          path={RoutesEnum.CreateAnEvent}
          element={
            <RequireUser>
              <CreateEventRoute>
                <CreateAnEvent />
              </CreateEventRoute>
            </RequireUser>
          }
        />
        <Route
          path={RoutesEnum.UserDashboard}
          element={
            <RequireUser>
              <UserDashboard />
            </RequireUser>
          }
        />
        <Route path="/verified-details" element={<VerifiedDetails />} />
        <Route path={RoutesEnum.EventFeeds} element={<EventFeeds />} />
        <Route path={RoutesEnum.HelpCenter} element={<HelpCenter />} />
        <Route path={RoutesEnum.EventDetails} element={<EventDetails />} />
        <Route
          path={RoutesEnum.Onboarding}
          element={
            <RequireUser>
              <OrganizationSetupRoute>
                <OnboardingFlow />
              </OrganizationSetupRoute>
            </RequireUser>
          }
        />
        <Route
          path="/organizer-setup"
          element={
            <RequireUser>
              <OrganizationSetupRoute>
                <OrganizerSetupForm />
              </OrganizationSetupRoute>
            </RequireUser>
          }
        />

        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
