import { Link } from "react-router-dom";
import { RoutesEnum } from "../../routes";
import logo from "/chillz.png";
import { useTranslation } from 'react-i18next';

type LogoSectionProps = {
  isRegisterPage?: boolean;
};

const LogoSection: React.FC<LogoSectionProps> = ({ isRegisterPage }) => {
  const { t } = useTranslation();
  if (isRegisterPage) {
    return (
      <>
        {/* Logo */}
        <Link to={RoutesEnum.Home}>
          <img className="h-16 w-auto" src={logo} alt="Chillz logo" />
        </Link>
        <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {t('register')}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          {t('areYouMember')}
          <Link
            to={RoutesEnum.Login}
            className={`cursor-pointer font-semibold text-red-600 hover:text-red-300`}
          >
            {" "}
            {t('signIn')}
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
        {t('signIn')}
      </h2>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        {t('notMember')}
        <Link
          to={RoutesEnum.Register}
          className={`cursor-pointer font-semibold text-red-600 hover:text-red-300`}
        >
          {" "}
          {t('register')}
        </Link>
      </p>
    </>
  );
};

export default LogoSection;
