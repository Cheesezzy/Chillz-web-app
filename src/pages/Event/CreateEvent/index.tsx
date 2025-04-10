import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";
import Sidebar from "../../../components/CreateEvent/Sidebar";
import MainCotent from "../../../components/CreateEvent/MainCotent";

const CreateEvent = () => {
  const [user, loading, error] = useAuthState(auth); // Get the user from Firebase Auth

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Spinning animation */}
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Handle any errors
  }

  if (!user) {
    return <div>Please log in to create an event.</div>; // Handle unauthenticated users
  }

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
