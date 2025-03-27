import { useState } from "react";
import Header from "../../components/Header";
import ForgotPasswordForm from "../../modules/ForgotPassword/ForgotPasswordForm";

const ForgotPassword = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <ForgotPasswordForm />
      </main>
    </>
  );
};

export default ForgotPassword;
