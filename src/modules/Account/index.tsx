import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import UpdateForm from "./components/ChangeEmail";
import ChangePassword from "./components/ChangePassword";
import UserProfile from "./components/UserProfile";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import { useTranslation } from "react-i18next";

export default function AccountLayout() {
  const [user, loading] = useAuthState(auth);
  const { t } = useTranslation();
  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user || user === null) return <div>Not Found</div>;

  const isGoogleUser = user.providerData[0].providerId === "google.com";

  return (
    <div className=" gap-8 flex flex-col h-screen px-4 mt-8">
     
    <div className="flex flex-col md:flex-row gap-4">
      <div className="w-full md:max-w-md">
        <UserProfile user={user} />
      </div>
      <div className="flex flex-col gap-4 w-full min-w-0">
        <div className="w-full bg-rose-50 rounded-xl shadow p-6 flex flex-col justify-center gap-2 mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {t("welcomeToChillz")}
            <span className="font-extrabold inline-block text-2xl">
              {user.email && user.email.split("@")[0].charAt(0).toUpperCase() + user.email.split("@")[0].slice(1)}
            </span>
          </h2>
          <p className="text-gray-600 mb-2">
            {t("readyToHostYourFirstEvent")}
          </p>
          <Link
            to={RoutesEnum.CreateAnEvent}
            className="self-end bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            {t("createAnEvent")}
          </Link>
        </div>
        <div className="w-full bg-orange-50 rounded-xl shadow p-6 flex flex-col justify-center gap-2">
          <h2 className="text-xl font-bold text-gray-800 mb-1">{t("yourDashboard")}</h2>
          <p className="text-gray-600 mb-2">
            {t("manageYourEvents")}
          </p>
          <Link
            to={RoutesEnum.UserDashboard}
            className="self-end bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
          >
            {t("goToDashboard")}
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
