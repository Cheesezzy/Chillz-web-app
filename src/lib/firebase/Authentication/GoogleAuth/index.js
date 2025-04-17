import { FirebaseError } from "firebase/app";
import { generateFirebaseAuthErrorMessage } from "../ErrorHandler";
import { signInWithPopup } from "firebase/auth";
import { auth, googleAuthProvider } from "../..";
import { RoutesEnum } from "../../../../routes";
export const signInUserWithGoogle = async (navigate) => {
    try {
        const result = await signInWithPopup(auth, googleAuthProvider);
        if (!result || !result.user) {
            throw new Error("No user found");
        }
        const user = result.user;
        console.log(user);
        navigate(RoutesEnum.Account);
        alert(`Welcome ${user.displayName}!`);
    }
    catch (error) {
        if (error instanceof FirebaseError) {
            generateFirebaseAuthErrorMessage(error);
        }
        console.log(error);
    }
};
