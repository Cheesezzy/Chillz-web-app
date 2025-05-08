import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { registerUser } from "../../lib/firebase/Authentication/EmailAuth";
import { useNavigate } from "react-router-dom";
import React from "react";
import LoadingSpinner from "../../components/LoadingSpinner";
import { useTranslation } from 'react-i18next';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(
      name,
      email,
      password,
      setIsLoading,
      navigate,
      t
    );
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <form
        className="flex flex-col gap-4 mt-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input label={t('name')} name="text" value={name} onChange={setName} placeholder={t('placeholder.name')} />
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

        <Button text={t('register')} type="submit" />
      </form>
    </>
  );
};

export default RegisterForm;
