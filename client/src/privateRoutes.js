import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AccountContext } from "./accountContext";

const useAuth = () => {
    const { user } = useContext(AccountContext);
    return user && user.loggedIn;
};

const PrivateRoutes = () => {
    const isAuth = useAuth();
    return isAuth ? 
    <Outlet /> : 
    <Navigate to="/admin" />
};

export default PrivateRoutes;