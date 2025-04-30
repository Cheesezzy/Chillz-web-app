import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RoutesEnum } from "./routes";
import React from "react";
import ComingSoon from "./components/EventDetails/ComingSoon";
const Home = React.lazy(() => import("./pages/Hero"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Account = React.lazy(() => import("./pages/Account"));
const RequireUser = React.lazy(
  () => import("./lib/firebase/components/RequireUser")
);
const Tickets = React.lazy(() => import("./pages/Tickets"));
const EventFeeds = React.lazy(() => import("./pages/Event/Feeds"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const CreateAnEvent = React.lazy(() => import("./pages/Event/CreateEvent"));
const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
const EventDetails = React.lazy(() => import("./pages/Event/EventDetails"));
const CategoryPage = React.lazy(() => import("./pages/Categories"));

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
              <CreateAnEvent />
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
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path={RoutesEnum.EventFeeds} element={<EventFeeds />} />
        <Route path={RoutesEnum.HelpCenter} element={<HelpCenter />} />
        <Route path={RoutesEnum.EventDetails} element={<EventDetails />} />

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
