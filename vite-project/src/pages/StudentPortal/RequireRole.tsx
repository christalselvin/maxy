import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { usePortalAuth } from "./context/PortalAuthContext";
import type { PortalRole } from "./context/PortalAuthContext";

/**
 * Guards a route to a specific role. Used as:
 *   <RequireRole role="student">...</RequireRole>
 *   <RequireRole role="admin">...</RequireRole>
 *
 * Checks the SAME unified session for both — a Student's valid session
 * does not satisfy role="admin" (and vice versa), so
 * /student-portal/admin is unreachable for a logged-in student even by
 * navigating to the URL directly, and there is nothing in the UI that
 * links there for a student to find in the first place.
 */
const RequireRole = ({
  role,
  children,
}: {
  role: PortalRole;
  children: ReactNode;
}) => {
  const { isAuthenticated, isInitializing, role: currentRole } = usePortalAuth();
  const location = useLocation();

  if (isInitializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="h-10 w-10 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated || currentRole !== role) {
    return <Navigate to="/student-portal" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default RequireRole;
