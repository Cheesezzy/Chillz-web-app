import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { loginUserWithEmailAndPassword } from "../../lib/firebase/Authentication/EmailAuth";
import { useState } from "react";
import { RoutesEnum } from "../../routes";
import React from "react";
import AlertModal from "../../Modals/AlertModal";
import { useTranslation } from 'react-i18next';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginUserWithEmailAndPassword(
      email,
      password,
      navigate,
      setAlertMessage,
      setIsAlertModalOpen,
      t
    );
  };
  return (
    <>
      <form
        className="flex flex-col gap-4 mt-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          label={t('email')}
          name="email"
          value={email}
          onChange={setEmail}
          placeholder={t('placeholder.email')}
        />
        <Input
          label={t('password')}
          name="password"
          value={password}
          onChange={setPassword}
          placeholder={t('placeholder.password')}
        />
        <Link
          to={RoutesEnum.ForgotPassword}
          className="flex justify-end text-sm leading-6 font-semibold text-red-500 hover:text-red-300"
        >
          {t('forgotPassword')}
        </Link>
        <Button type="submit" text={t('signIn')} />
      </form>
      {isAlertModalOpen && alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setIsAlertModalOpen(false)}
        />
      )}
    </>
  );
};

export default LoginForm;
