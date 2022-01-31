import { Route, Redirect } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import React from 'react';

interface IProps {
  component: any;
  [x: string]: any;
}

const PrivateRoute: React.FC<IProps> = ({ component: Component, ...rest }) => {
  const { currentUser, isLoading } = useAuth();
  if (isLoading) return <div>loading...</div>;

  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
};

export default PrivateRoute;
