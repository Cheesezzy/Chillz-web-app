import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import AllEvents from "./pages/AllEvents";
import HelpCenter from "./pages/HelpCenter";
import Tickets from "./pages/Tickets";
import CreateEvent from "./pages/Auth/CreateEvents";
import DefaultLayout from "./components/layout/DefaultLayout";
import Footer from "./components/Footer";
import Nav from "./components/Nav";

const App = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname !== "/auth-page" && <Nav />}
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
      <Footer />
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
