import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = true;
      setIsAuthenticated(authStatus);
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="flex flex-col items-center space-y-16">
          <div className="w-64 h-64 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground caption">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/patient-login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;