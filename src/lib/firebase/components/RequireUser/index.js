import { jsx as _jsx } from "react/jsx-runtime";
import { auth } from "../..";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import { RoutesEnum } from "../../../../routes";
const RequireUser = ({ children }) => {
    const [user, loading] = useAuthState(auth);
    if (loading)
        return _jsx("div", { children: "Loading..." });
    if (!user || user === null)
        return _jsx(Navigate, { to: RoutesEnum.Login });
    return children;
};
export default RequireUser;
