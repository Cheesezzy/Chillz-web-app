import DefaultLayout from "./components/layout/DefaultLayout";
import Nav from "./components/Nav";
import Slides from "./components/Slider/Slides";

function App() {
  return (
    <DefaultLayout>
      <Nav />
      <Slides />
    </DefaultLayout>
  );
}

export default App;
