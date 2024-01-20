import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccountContext } from "./accountContext";

const useAuth = () => {
    const { user } = useContext(AccountContext);
    console.log(`usercontext ${JSON.stringify(user)}`)
    return user && user.loggedIn;
};

const PrivateRoutes = () => {
    const isAuth = useAuth();
    console.log(isAuth);
    return isAuth ? <Outlet /> : <Navigate to="/admin/dashboard" />
};

export default PrivateRoutes;