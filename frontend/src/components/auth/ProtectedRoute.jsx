import React from 'react';
import {Route, Navigate} from 'react-router-dom';
import {useAuth} from "./Auth";

const ProtectedRoute = ({component: Component, ...rest}) => {
    const {user} = useAuth();

    return (
        <Route 
            {...rest}
            render={(props)=>{
                user ? <Component {...props} /> : <Navigate to='/login' />
            }}
        />
    )
}

export default ProtectedRoute;