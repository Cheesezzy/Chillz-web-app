import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../lib/firebase";
// import { deleteUserFromFirestore } from "../../../lib/firebase/DeleteAuth";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import { deleteUserFromFirestore } from "../../../lib/firebase/Authentication/DeleteUser";

const ConfirmDeleteUser: React.FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const isEmailUser = auth?.currentUser?.providerData.some(
    (provider) => provider.providerId === "password"
  );
  const isGoogleUser = auth?.currentUser?.providerData.some(
    (provider) => provider.providerId === "google.com"
  );

  if (isLoading) return <div>Loading...</div>;

  if (isGoogleUser) {
    return (
      <div className="mt-4 text-sm text-gray-500 flex flex-col gap-4">
        <Button
          text="Confirm delete"
          type="button"
          handleClick={() =>
            deleteUserFromFirestore(navigate, false, true, setIsLoading)
          }
        />
      </div>
    );
  }

  if (isEmailUser) {
    return (
      <div className="mt-4 text-sm text-gray-500 flex flex-col gap-4">
        Please enter your password to delete your account:
        <Input
          label="Password"
          name="password"
          value={password}
          onChange={setPassword}
        />
        <Button
          text="Confirm delete"
          type="button"
          handleClick={() =>
            deleteUserFromFirestore(
              navigate,
              true,
              false,
              setIsLoading,
              password
            )
          }
        />
      </div>
    );
  }

  return;
};

export default ConfirmDeleteUser;
