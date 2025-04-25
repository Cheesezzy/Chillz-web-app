import Sidebar from "../../../components/CreateEvent/Sidebar";
import MainCotent from "../../../components/CreateEvent/MainCotent";

const CreateEvent = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <MainCotent />
      </div>
    </>
  );
};

export default CreateEvent;
