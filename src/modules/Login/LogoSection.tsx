import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import logo from "../../assets/logo.png";

type LogoSectionProps = {
  isRegisterPage?: boolean;
};

const LogoSection: React.FC<LogoSectionProps> = ({ isRegisterPage }) => {
  const appColor = "red";

  if (isRegisterPage) {
    return (
      <>
        {/* Logo */}
        <Link to={RoutesEnum.Home}>
          <img className="h-16 w-auto" src={logo} alt="BallersBoutique" />
        </Link>
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Register for an account
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          Are you a member?{" "}
          <Link
            to={RoutesEnum.Login}
            className={`cursor-pointer font-semibold text-${appColor}-600 hover:text-${appColor}-500`}
          >
            {" "}
            Sign In
          </Link>
        </p>
      </>
    );
  }

  return (
    <>
      {/* Logo */}
      <Link to={RoutesEnum.Home}>
        <img className="h-16 w-auto" src={logo} alt="BallersBoutique" />
      </Link>
      <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        Not a member?{" "}
        <Link
          to={RoutesEnum.Register}
          className={`cursor-pointer font-semibold text-${appColor}-600 hover:text-${appColor}-500`}
        >
          {" "}
          Register Now
        </Link>
      </p>
    </>
  );
};

export default LogoSection;
