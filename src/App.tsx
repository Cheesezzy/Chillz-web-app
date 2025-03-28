import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RoutesEnum } from "./routes";
import React from "react";
const Home = React.lazy(() => import("./pages/Hero"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Account = React.lazy(() => import("./pages/Account"));
const RequireUser = React.lazy(
  () => import("./lib/firebase/components/RequireUser")
);
const ContactUs = React.lazy(() => import("./pages/ContactUs"));
const EventFeeds = React.lazy(() => import("./pages/Event/Feeds"));
const HelpCenter = React.lazy(() => import("./pages/HelpCenter"));
const CreateAnEvent = React.lazy(() => import("./pages/Event/Create Event"));

const App = () => {
  return (
    <>
      <Routes>
        <Route path={RoutesEnum.Login} element={<Login />} />
        <Route path={RoutesEnum.Home} element={<Home />} />
        <Route path={RoutesEnum.Register} element={<Register />} />
        <Route path={RoutesEnum.ForgotPassword} element={<ForgotPassword />} />
        <Route
          path={RoutesEnum.Account}
          element={
            <RequireUser>
              <Account />
            </RequireUser>
          }
        />
        <Route path={RoutesEnum.ContactUs} element={<ContactUs />} />
        <Route path={RoutesEnum.EventFeeds} element={<EventFeeds />} />
        <Route path={RoutesEnum.HelpCenter} element={<HelpCenter />} />
        <Route path={RoutesEnum.CreateAnEvent} element={<CreateAnEvent />} />

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
