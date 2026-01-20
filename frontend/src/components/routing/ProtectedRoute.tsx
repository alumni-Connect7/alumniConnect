import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { UserRole } from '../../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
  allowedRoles?: UserRole[];
  requiredApproval?: boolean;
}

/**
 * ProtectedRoute: Enforces authentication and role-based access control.
 *
 * @param element - Component to render if authorized
 * @param allowedRoles - Array of roles permitted to access (undefined = all authenticated users)
 * @param requiredApproval - If true, alumni users must be approved
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  allowedRoles,
  requiredApproval = false,
}) => {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user!.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (requiredApproval && user!.role === 'alumni' && !user!.isApproved) {
    return <Navigate to="/pending-approval" replace />;
  }

  return element;
};
