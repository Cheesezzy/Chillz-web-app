import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { User } from "firebase/auth";
import { updateUserEmail } from "../../../lib/firebase/Authentication/EmailAuth";

type UpdateEmailFormProps = {
  user: User;
};

const UpdateEmailForm: React.FC<UpdateEmailFormProps> = ({ user }) => {
  const [email, setEmail] = useState(user?.email as string);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-4">
      {/* Email */}
      <div>
        <Input
          label="Current Email address"
          name="email"
          value={email}
          onChange={setEmail}
        />
      </div>
      <div>
        <Input
          label="New Email address"
          name="email"
          value={newEmail}
          onChange={setNewEmail}
        />
      </div>
      {/* Password */}
      <div>
        <Input
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
        />
      </div>
      <div>
        <Button
          text="Update Email"
          type="button"
          handleClick={() => {
            updateUserEmail(email, newEmail, password, setIsLoading);
          }}
        />
      </div>
    </div>
  );
};

export default UpdateEmailForm;
