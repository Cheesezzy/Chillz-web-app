import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { User } from "firebase/auth";
import { updateUserEmail } from "../../../lib/firebase/Authentication/EmailAuth";
import React from "react";
import AlertModal from "../../../Modals/AlertModal";
import { useTranslation } from "react-i18next";
type UpdateEmailFormProps = {
  user: User;
};

const UpdateEmailForm: React.FC<UpdateEmailFormProps> = ({ user }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState(user?.email as string);
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = React.useState<string | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = React.useState(false);

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="flex flex-col gap-4">
        {/* Email */}
        <div>
          <Input
            label={t("currentEmailAddress")}
            name="email"
            value={email}
            onChange={setEmail}
          />
        </div>
        <div>
          <Input
            label={t("newEmailAddress")}
            name="email"
            value={newEmail}
            onChange={setNewEmail}
          />
        </div>
        {/* Password */}
        <div>
          <Input
            label={t("password")}
            name="password"
            value={password}
            onChange={setPassword}
          />
        </div>
        <div>
          <Button
            text={t("updateEmail")}
            type="button"
            handleClick={() => {
              updateUserEmail(
                email,
                newEmail,
                password,
                setIsLoading,
                setAlertMessage,
                setIsAlertModalOpen,
                t
              );
            }}
          />
        </div>
      </div>
      {isAlertModalOpen && alertMessage && (
        <AlertModal
          message={alertMessage}
          onClose={() => setIsAlertModalOpen(false)} // Close the modal
        />
      )}
    </>
  );
};

export default UpdateEmailForm;
