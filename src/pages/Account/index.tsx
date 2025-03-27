import { useState } from "react";
import Header from "../../components/Header";
import AccountLayout from "../../modules/Account";

const Account = () => {
  const [darkMode, setDarkMode] = useState(false);
  return (
    <>
      <Header />
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AccountLayout />
      </main>
    </>
  );
};

export default Account;
