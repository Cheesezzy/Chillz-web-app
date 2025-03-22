import React from "react";
import { RoutesEnum } from "../routes";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
// import { auth } from "../../lib/firebase";
// import { signOutUser } from "../../lib/firebase/Authentication/SignOut";

function SignIn() {
  return (
    <Link to={RoutesEnum.Login} className="text-sm font-semibold leading-6">
      Log in <span aria-hidden="true">&rarr;</span>
    </Link>
  );
}

export default SignIn;
