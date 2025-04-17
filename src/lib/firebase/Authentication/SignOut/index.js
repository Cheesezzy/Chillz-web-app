import { signOut } from "firebase/auth";
import { auth } from "../..";
import { RoutesEnum } from "../../../../routes";
export const signOutUser = async (navigate) => {
    try {
        await signOut(auth);
        alert("You have been signed out.");
        navigate(RoutesEnum.Home);
    }
    catch (error) {
        console.error(error);
    }
};
