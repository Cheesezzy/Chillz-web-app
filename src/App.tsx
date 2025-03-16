import Categories from "./components/Categories";
import Footer from "./components/Footer";
import DefaultLayout from "./components/layout/DefaultLayout";
import Nav from "./components/Nav";
import Slides from "./components/Slider/Slides";

function App() {
  return (
    <DefaultLayout>
      <Nav />
      <Slides />
      <Categories />
      <Footer />
    </DefaultLayout>
  );
}

export default App;
