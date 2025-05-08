import React, { useState } from "react";
import { User } from "firebase/auth";
import Modal from "../../../components/Modal";
import Button from "../../../components/Button";
import UpdateEmailForm from "./UpdateEmailForm";
import { useTranslation } from "react-i18next";
type ChangeEmailProps = {
  user: User;
};

const ChangeEmail: React.FC<ChangeEmailProps> = ({ user }) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b  pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7">{t("email")}</h2>
          <p className="mt-1 text-sm leading-6">{t("updateEmailAddress")}</p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-4">
            <div className="w-1/2 mt-4">
              <Button
                text={t("updateEmail")}
                type="button"
                handleClick={() => setOpen(!open)}
              />
            </div>
            <Modal open={open} setOpen={setOpen}>
              <UpdateEmailForm user={user} />
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
