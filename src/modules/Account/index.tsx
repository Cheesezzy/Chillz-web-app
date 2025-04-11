import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import UpdateForm from "./components/ChangeEmail";
import ChangePassword from "./components/ChangePassword";
import DeleteUser from "./components/DeleteUser";
import UserProfile from "./components/UserProfile";

export default function AccountLayout() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }
  if (!user || user === null) return <div>Not Found</div>;

  const isGoogleUser = user.providerData[0].providerId === "google.com";

  return (
    <div className="mt-6 gap-8 flex flex-col h-screen">
      <h2 className="text-2xl font-bold leading-7  sm:truncate sm:text-3xl sm:tracking-tight mt-20">
        My Account
      </h2>
      <UserProfile user={user} />
      {/* Update Form for email users only */}
      {!isGoogleUser ? (
        <>
          <UpdateForm user={user} />
          <ChangePassword />
        </>
      ) : (
        <p>{null}</p>
      )}
      <DeleteUser />
    </div>
  );
}
