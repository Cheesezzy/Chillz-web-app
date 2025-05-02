import Slides from "../../components/Slider/Slides";
import Categories from "../../components/Categories/Categories";
import Cards from "../../components/Cards/Cards";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Carousel from "../../components/Carousel/Carousel";
import Verified from "../../components/Cards/Verified";
import WeatherReport from "../../components/Weather/WeatherReport";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DefaultLayout>
        <Slides />
        <Categories />
        <Verified />
        <Cards />
        <WeatherReport/>
        <Carousel />
      </DefaultLayout>
      <Footer />
    </div>
  );
};

export default Home;
