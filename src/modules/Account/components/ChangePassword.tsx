import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import ChangePasswordForm from "./ChangePasswordForm";

const ChangePassword = () => {
  const [open, setOpen] = useState(false);
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // updateUserDetails(email, isGoogleUser, setIsLoading);
      }}
    >
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b  pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7">Password</h2>
            <p className="mt-1 text-sm leading-6">Update your password</p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            {/* Password Button */}
            <div className="sm:col-span-4">
              <div className="w-1/2 mt-4">
                <Button
                  text="Change Password"
                  type="button"
                  handleClick={() => setOpen(!open)}
                />
              </div>
              <Modal open={open} setOpen={setOpen}>
                <ChangePasswordForm />
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
