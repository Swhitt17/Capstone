import React, {useContext} from "react";
import {UserContext} from "./UserContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({exact,path,children}) => {
    const {currentUser} = useContext(UserContext);

    console.debug(
        "PrivateRoute",
        "exact=", exact,
        "path=", path,
        "currentUser=", currentUser,
    );

    return (
        currentUser ? <Outlet /> : <Navigate to="/" replace/>
    );
}

export default PrivateRoute;