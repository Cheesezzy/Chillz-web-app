import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../../lib/firebase/Authentication/PasswordAuth";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="mt-4 text-sm text-gray-500 gap-4 flex flex-col">
      Please enter your password to delete your account:
      <Input
        label="Current Password"
        name="current-password"
        value={currentPassword}
        onChange={setCurrentPassword}
      />
      <Input
        label="New Password"
        name="new-password"
        value={newPassword}
        onChange={setNewPassword}
      />
      <Button
        text="Confirm password change"
        type="button"
        handleClick={() =>
          updateUserPassword(
            currentPassword,
            newPassword,
            navigate,
            setIsLoading
          )
        }
      />
    </div>
  );
};

export default ChangePasswordForm;
