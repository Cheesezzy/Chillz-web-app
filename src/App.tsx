import Cards from "./components/Cards";
import Categories from "./components/Categories";
import Footer from "./components/Footer";
import DefaultLayout from "./components/layout/DefaultLayout";
import Nav from "./components/Nav";
import Slides from "./components/Slider/Slides";

function App() {
  return (
    <div>
      <Nav />
      <DefaultLayout>
        <Slides />
        <Categories />
        <Cards />
      </DefaultLayout>
      <Footer />
    </div>
  );
}

export default App;
