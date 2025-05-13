import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import UpdateForm from "./components/ChangeEmail";
import ChangePassword from "./components/ChangePassword";
import UserProfile from "./components/UserProfile";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";

export default function AccountLayout() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user || user === null) return <div>Not Found</div>;

  const isGoogleUser = user.providerData[0].providerId === "google.com";

  return (
    <div className="mt-16 gap-8 flex flex-col h-screen px-4">
     
    <div className="flex gap-4">
        <div className="w-full max-w-96">
          <UserProfile user={user} />
        </div>
      <div className="flex flex-col gap-4 w-full">
      <div className=" w-full h-32 bg-white rounded-xl shadow p-4 flex items-center gap-3 mt-12">
        <Link to={RoutesEnum.UserDashboard} className="w-38 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
          Go to Dashboard
        </Link>
      </div>
      <div className=" w-full h-32 bg-white rounded-xl shadow p-4 flex items-center gap-3 mt-8">
        <Link to={RoutesEnum.UserDashboard} className="w-38 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium">
          Go to Dashboard
        </Link>
      </div>
      </div>
    </div>
      
      {/* <OrganizerSetup user={user} /> */}

      {/* Update Form for email users only */}
      {!isGoogleUser ? (
        <>
        <h2 className="text-2xl font-bold">Account Settings</h2>
          {/* <OrganizerSetup user={user} /> */}
          <UpdateForm user={user} />
          <ChangePassword />
        </>
      ) : (
        <p>{null}</p>
      )}
      {/* <DeleteUser /> */}
    </div>
  );
}
