import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  sendEmailVerification,
  signInWithEmailAndPassword,
  updateEmail,
} from "firebase/auth";
import { auth } from "../..";
import { RoutesEnum } from "../../../../routes";
import { NavigateFunction } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { TFunction } from "i18next";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate: NavigateFunction,
  t: TFunction
) => {
  try {
    setLoading(true);
    // create a new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const results = userCredential.user;
    await sendEmailVerification(results);
    alert(
      t('hello') + ' ' +
      name + ' ' +
      t('aVerificationEmailHasBeenSentToYourEmailAddress') + ' ' +
      email + ' ' +
      t('pleaseVerifyYourEmailToLogin')
    );
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
    console.error(error);
  } finally {
    setLoading(false);
    navigate(RoutesEnum.Login);
  }
};

export const loginUserWithEmailAndPassword = async (
  email: string,
  password: string,
  navigate: NavigateFunction,
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setIsAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  t: TFunction
) => {
  try {
    // Login user
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const results = userCredential.user;
    if (results.emailVerified === false) {
      setAlertMessage(t('pleaseVerifyYourEmailToLogin'));
      setIsAlertModalOpen(true);
      return;
    }
    navigate(RoutesEnum.Home);
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
    console.error(error);
  }
};

export const updateUserEmail = async (
  email: string,
  newEmail: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setAlertMessage: React.Dispatch<React.SetStateAction<string | null>>,
  setIsAlertModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  t: TFunction
) => {
  try {
    if (auth.currentUser === null) return;
    setIsLoading(true);

    // Reauthenticate the user before updating the email
    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(auth.currentUser, credential);

    // Update the email after successful reauthentication
    await updateEmail(auth.currentUser, newEmail);

    // Send email verification to the new email
    await sendEmailVerification(auth.currentUser);
    setAlertMessage(
      t('aVerificationEmailHasBeenSentToYourNewEmailAddress') + ' ' +
        newEmail + ' ' +
        t('pleaseVerifyYourEmailToLogin')
    );
    setIsAlertModalOpen(true);
  } catch (error) {
    if (error instanceof FirebaseError) {
      generateFirebaseAuthErrorMessage(error);
    }
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
