//import React from 'react'
//import { useSelector } from 'react-redux'
//import { Navigate } from 'react-router-dom';

//const PrivateRoute = ({children}) => {

//    const {token} = useSelector((state) => state.auth);

//    if(token !== null)
//        return children
//    else
//        return <Navigate to="/login" />

//}

//export default PrivateRoute

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const { token } = useSelector((state) => state.auth);
    const { loading } = useSelector((state) => state.profile);

    if (loading) {
        return <div className="text-white text-center p-4">Loading...</div>;
    }

    if (token !== null) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;
