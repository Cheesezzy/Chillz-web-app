import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RoutesEnum } from "./routes";
import React from "react";
const Home = React.lazy(() => import("./pages/Home/Home"));
const Login = React.lazy(() => import("./pages/Login"));
const Register = React.lazy(() => import("./pages/Register"));
const ForgotPassword = React.lazy(() => import("./pages/ForgotPassword"));
const Account = React.lazy(() => import("./pages/Account"));
const RequireUser = React.lazy(
  () => import("./lib/firebase/components/RequireUser")
);

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
