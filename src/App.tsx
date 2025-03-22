import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Contact from "./pages/ContactPage/Contact";
import AllEvents from "./pages/AllEvents/AllEvents";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import Tickets from "./pages/Tickets/Tickets";
import CreateEvent from "./pages/Auth/CreateEvents";
import DefaultLayout from "./components/layout/DefaultLayout";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header";
import { SetStateAction, useState } from "react"; // Import useState from react
import DesktopHeader from "./components/Header/DesktopHeader";

const App = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hideNavAndFooter = location.pathname === "/auth-page";

  return (
    <>
      {!hideNavAndFooter && <Header />}
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/all-events" element={<AllEvents />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/auth-page" element={<CreateEvent />} />
          {/* Add other routes here */}
        </Routes>
      </DefaultLayout>
      {!hideNavAndFooter && <Footer />}
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
