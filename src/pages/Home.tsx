import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./Contact";
import Nav from "../components/Nav";
import DefaultLayout from "../components/layout/DefaultLayout";
import Slides from "../components/Slider/Slides";
import Categories from "../components/Categories";
import Cards from "../components/Cards";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <Router>
      <Nav />
      <DefaultLayout>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Slides />
                <Categories />
                <Cards />
              </>
            }
          />
          <Route path="/contact" element={<Contact />} />
          {/* Add other routes here */}
        </Routes>
      </DefaultLayout>
      <Footer />
    </Router>
  );
};

export default Home;
