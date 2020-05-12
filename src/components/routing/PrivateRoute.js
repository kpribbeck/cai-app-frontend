import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { authUserService } from '../../requests/UserRequests';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authUserService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/log-in' }} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)