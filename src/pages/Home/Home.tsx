import Slides from "../../components/Slider/Slides";
import Categories from "../../components/Categories/Categories";
import Cards from "../../components/Cards/Cards";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import DefaultLayout from "../../components/layout/DefaultLayout";

const Home = () => {
  return (
    <div style={{ flex: "1" }}>
      <Header />
      <DefaultLayout>
        <Slides />
        <Categories />
        <Cards />
      </DefaultLayout>
      <Footer />
    </div>
  );
};

export default Home;
