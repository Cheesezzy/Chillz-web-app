import Categories from "./components/Categories";
import DefaultLayout from "./components/layout/DefaultLayout";
import Nav from "./components/Nav";
import Slides from "./components/Slider/Slides";

function App() {
  return (
    <DefaultLayout>
      <Nav />
      <Slides />
      <Categories />
    </DefaultLayout>
  );
}

export default App;
