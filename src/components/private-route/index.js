import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({redirectPathName, isAuthorized}) => {
  return isAuthorized ? <Outlet /> : <Navigate to={redirectPathName} />;
};

export default PrivateRoute