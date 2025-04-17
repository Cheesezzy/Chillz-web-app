import { EmailAuthProvider, createUserWithEmailAndPassword, reauthenticateWithCredential, sendEmailVerification, signInWithEmailAndPassword, updateEmail, } from "firebase/auth";
import { auth } from "../..";
import { RoutesEnum } from "../../../../routes";
import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
export const registerUser = async (name, email, password, setLoading, navigate) => {
    try {
        setLoading(true);
        // create a new user
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const results = userCredential.user;
        console.log(results);
        // Send an email verification to the users email
        await sendEmailVerification(results);
        alert(`A verification email has been sent to your email address ${name}!. Please verify your email to login.`);
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            generateFirebaseAuthErrorMessage(error);
        }
        console.error(error);
    }
    finally {
        setLoading(false);
        navigate(RoutesEnum.Login);
    }
};
export const loginUserWithEmailAndPassword = async (email, password, navigate) => {
    try {
        // console.log(email, password);
        // Login user
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const results = userCredential.user;
        if (results.emailVerified === false) {
            alert("Please verify your email to login.");
            return;
        }
        navigate(RoutesEnum.Home);
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            generateFirebaseAuthErrorMessage(error);
        }
        console.error(error);
    }
};
export const updateUserEmail = async (email, newEmail, password, setIsLoading) => {
    try {
        if (auth.currentUser === null)
            return;
        setIsLoading(true);
        // Reauthenticate the user before updating the email
        const credential = EmailAuthProvider.credential(email, password);
        await reauthenticateWithCredential(auth.currentUser, credential);
        // Update the email after successful reauthentication
        await updateEmail(auth.currentUser, newEmail);
        // Send email verification to the new email
        await sendEmailVerification(auth.currentUser);
        alert(`A verification email has been sent to your new email address ${newEmail}!. Please verify your email to login.`);
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            generateFirebaseAuthErrorMessage(error);
        }
        console.error(error);
    }
    finally {
        setIsLoading(false);
    }
};
