import { Link } from "react-router-dom";
import AccountLayout from "../../modules/Account";
import { RoutesEnum } from "../../routes";
import chillzlogo from "/chillz.png";
import SignIn from "../../components/Header/SignIn";


const Account = () => {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link to={RoutesEnum.Home}>
            <img src={chillzlogo} className="logo" alt="Chillz logo" />
          </Link>
          <div className="flex items-center">
            <div className="relative group">
              <SignIn />
            </div>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <AccountLayout />
      </main>
    </>
  );
};

export default Account;
