import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import React from 'react';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    ></Route>
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

export default PrivateRoute;
