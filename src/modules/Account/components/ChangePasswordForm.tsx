import React from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { updateUserPassword } from "../../../lib/firebase/Authentication/PasswordAuth";
import LoadingSpinner from "../../../components/LoadingSpinner";
import { useTranslation } from "react-i18next";

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const { t } = useTranslation();

  if (isLoading) return <LoadingSpinner/>;
  return (
    <div className="mt-4 text-sm text-gray-500 gap-4 flex flex-col">
      {t("pleaseEnterYourPasswordToDeleteYourAccount")}
      <Input
        label={t("currentPassword")}
        name="current-password"
        value={currentPassword}
        onChange={setCurrentPassword}
      />
      <Input
        label={t("newPassword")}
        name="new-password"
        value={newPassword}
        onChange={setNewPassword}
      />
      <Button
        text={t("confirmPasswordChange")}
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
