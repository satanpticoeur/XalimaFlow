import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const PublicRoute: React.FC = () => {
  const { user, isLoadingAuth } = useAuth();

  if (isLoadingAuth) {
    return <div className="flex justify-center items-center h-screen">Loading authentication...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;