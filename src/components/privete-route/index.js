import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({redirectPathName, tokenName}) => {
  const token = localStorage.getItem(tokenName);
  return token ? <Outlet /> : <Navigate to={redirectPathName} />;
};

export default PrivateRoute