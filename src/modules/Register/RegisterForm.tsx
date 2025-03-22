import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { registerUser } from "../../lib/firebase/Authentication/EmailAuth";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    registerUser(name, email, password, setIsLoading, navigate);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form
      className="flex flex-col gap-4 mt-10"
      onSubmit={(e) => handleSubmit(e)}
    >
      <Input label="First Name" name="text" value={name} onChange={setName} />
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

      <Button text="Register" type="submit" />
    </form>
  );
};

export default RegisterForm;
