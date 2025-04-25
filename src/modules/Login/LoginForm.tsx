import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { loginUserWithEmailAndPassword } from "../../lib/firebase/Authentication/EmailAuth";
import { useState } from "react";
import { RoutesEnum } from "../../routes";
import React from "react";
import AlertModal from "../../Modals/AlertModal";

const LoginForm = () => {
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
      setIsAlertModalOpen
    );
  };
  return (
    <>
      <form
        className="flex flex-col gap-4 mt-10"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input
          label="Email address"
          name="email"
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        <Link
          to={RoutesEnum.ForgotPassword}
          className="flex justify-end text-sm leading-6 font-semibold text-customRed hover:text-red-300"
        >
          Forgot Password
        </Link>
        <Button type="submit" text="Sign In" />
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
