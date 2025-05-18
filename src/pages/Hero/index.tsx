import Slides from "../../components/Slider/Slides";
import Categories from "../../components/Categories/Categories";
import Cards from "../../components/Cards/Cards";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import DefaultLayout from "../../components/layout/DefaultLayout";
import Carousel from "../../components/Carousel/Carousel";
import Verified from "../../components/Cards/Verified";
import WeatherReport from "../../components/Weather/WeatherReport";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase/index";
import HowChillzWorks from "../../components/HowChillzWorks";
import JoinChillz from "../../components/JoinChillz";

const Home = () => {
  const [user, loading] = useAuthState(auth);

  if (loading) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <DefaultLayout>
        <Slides />
        <Categories />
        {/* <Verified /> */}
        {!user && (
          <>
            <HowChillzWorks />
           
          </>
        )}
        <Cards />

        {!user &&(
          <>
           <JoinChillz />
          </>
        )}
        <WeatherReport/>
        <Carousel />
      </DefaultLayout>
      <Footer />
    </div>
  );
};

export default Home;
