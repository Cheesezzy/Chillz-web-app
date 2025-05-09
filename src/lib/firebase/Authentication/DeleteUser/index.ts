import { FirebaseError } from "firebase/app";
import { auth } from "../..";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import {
  EmailAuthProvider,
  GoogleAuthProvider,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
} from "firebase/auth";
import { RoutesEnum } from "../../../../routes";
import { NavigateFunction } from "react-router-dom";

export const deleteUserFromFirestore = async (
  navigate: NavigateFunction,
  isEmailUser: boolean,
  isGoogleUser: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>, // Add this
  setIsAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>, // Add this
  password?: string
) => {
  const user = auth?.currentUser;
  if (!user || user === null) return;
  try {
    setIsLoading(true);

    // handle google user
    if (isGoogleUser) {
      const googleProvider = new GoogleAuthProvider();
      await reauthenticateWithPopup(user, googleProvider);
      await deleteUser(user);
      navigate(RoutesEnum.Home);
    }

    // handle email user
    if (isEmailUser) {
      if (!password || password === "") {
        setAlertMessage("Please enter your password"); // Set the alert message
        setIsAlertModalOpen(true); // Open the modal
        return;
      }
      const userEmail = user.email as string;
      const credential = EmailAuthProvider.credential(userEmail, password);
      await reauthenticateWithCredential(user, credential);
      await deleteUser(user);
      navigate(RoutesEnum.Home);
    }
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
      return;
    }
  } finally {
    setIsLoading(false);
  }
};
