import ContinueWithGoogle from "../../modules/Login/ContineWithGoogle";
import LogoSection from "../../modules/Login/LogoSection";
import loginBg from "/event-bg.jpeg";
import RegisterForm from "../../modules/Register/RegisterForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";

const Register = () => {
  const [loading] = useAuthState(auth); // Get the user from Firebase Auth

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div> {/* Spinning animation */}
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-1 min-h-screen">
      {/* Left hand column */}
      <div className="flex flex-1 flex-col justify-center px-4 py-16 sm:px-6 lg:flex-none xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <LogoSection isRegisterPage />
          <RegisterForm />
          <ContinueWithGoogle />
        </div>
      </div>

      {/* Right hand column */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <img
          src={loginBg}
          alt="BallersBoutique"
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
