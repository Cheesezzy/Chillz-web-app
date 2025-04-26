import React, { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Button from "../../../components/Button";
import OrganizerSetupForm from "./OrganizerSetupForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../lib/firebase";

type ChangeEmailProps = {
  user: User;
};

const OrganizerSetup: React.FC<ChangeEmailProps> = () => {
  const [open, setOpen] = useState(false);
  const [isSetupComplete, setIsSetupComplete] = useState(false); // Track setup completion
  const [user] = useAuthState(auth);

  // Retrieve setup completion state from localStorage
  useEffect(() => {
    const userId = user?.email || "defaultUser"; // Use a user-specific key
    const setupComplete = localStorage.getItem(`isSetupComplete_${userId}`);
    if (setupComplete === "true") {
      setIsSetupComplete(true);
    }
  }, [user]);

  // Save setup completion state to localStorage
  const handleSetupComplete = () => {
    const userId = user?.email || "defaultUser"; // Use a user-specific key
    setIsSetupComplete(true); // Mark setup as complete
    setOpen(false); // Close the form
    localStorage.setItem(`isSetupComplete_${userId}`, "true"); // Save to localStorage
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7">Organizer Setup</h2>
          <p className="mt-1 text-sm leading-6">
            Setup or Update your Organizer Profile
          </p>
        </div>

        <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
          <div className="sm:col-span-4">
            <div className="w-1/2 mt-4">
              <Button
                text={
                  isSetupComplete
                    ? "Organizer Setup Complete" // Button text when setup is complete
                    : open
                    ? "Close Organizer Setup"
                    : "Setup Organizer"
                }
                type="button"
                handleClick={() => setOpen(!open)} // Toggle the `open` state
                disabled={isSetupComplete} // Disable the button when setup is complete
              />
            </div>

            {open && (
              <OrganizerSetupForm onSetupComplete={handleSetupComplete} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizerSetup;
