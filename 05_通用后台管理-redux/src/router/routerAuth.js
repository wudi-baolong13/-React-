import { Navigate } from "react-router-dom";

export const RouterAuth = ({children}) => {
    const isLogin = localStorage.getItem('token') ? true : false;
    if (!isLogin) {
        return <Navigate to="/login" replace={true} />
    }
    return children;

}