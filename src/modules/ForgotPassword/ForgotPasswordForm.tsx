import { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../lib/firebase/Authentication/PasswordAuth";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <form
        className="mx-auto max-w-3xl space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          forgotPassword(email, navigate);
        }}
      >
        <Input
          label="Email address"
          name="email"
          value={email}
          onChange={setEmail}
        />
        <Button text="Reset Password" type="submit" />
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
