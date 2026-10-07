import { Outlet, Navigate, useNavigate, Link } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { usePortalAuth } from "./context/PortalAuthContext";

const AdminPortalLayout = () => {
  const { user, logout } = usePortalAuth();
  const navigate = useNavigate();

  // Defensive fallback only — RequireRole already guarantees an
  // authenticated admin is present before this layout ever mounts.
  if (!user) {
    return <Navigate to="/student-portal" replace />;
  }

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 sm:pt-32 md:pt-36">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="mb-6 flex justify-end"></div>

          <div className="flex items-center gap-3">
            <Link
              to="/student-portal/admin/settings"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 transition hover:bg-gray-50"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        <Outlet />
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-4 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
        MaxoTechs Student Portal &middot; Admin Console
      </footer>
    </div>
  );
};

export default AdminPortalLayout;
