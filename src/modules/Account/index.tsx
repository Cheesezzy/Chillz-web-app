import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import UpdateForm from "./components/ChangeEmail";
import ChangePassword from "./components/ChangePassword";
import UserProfile from "./components/UserProfile";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function AccountLayout() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <LoadingSpinner />;
  }
  if (!user || user === null) return <div>Not Found</div>;

  const isGoogleUser = user.providerData[0].providerId === "google.com";

  return (
    <div className="mt-16 gap-8 flex flex-col h-screen px-4">
      <UserProfile user={user} />
      {/* <OrganizerSetup user={user} /> */}

      {/* Update Form for email users only */}
      {!isGoogleUser ? (
        <>
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
