import { useCallback, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { AlertCircle, RefreshCw } from "lucide-react";
import { api, apiErrorMessage } from "../../lib/api";
import type { StudentProfile } from "./types";

export interface StudentOutletContext {
  profile: StudentProfile;
  refetch: () => void;
}

/**
 * Fetches the logged-in student's own profile (with nested projects and
 * certificates) exactly once here, then shares it with the nested
 * dashboard/projects/certificates routes via React Router's Outlet
 * context — avoiding a separate fetch (and separate loading/error state)
 * on every child page.
 *
 * GET /students/me/ never takes a student ID — the backend derives "which
 * student" entirely from the authenticated token, so there is no ID a
 * student could tamper with to see someone else's data.
 */
const StudentPortalLayout = () => {
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchProfile = useCallback(() => {
    setLoading(true);
    setError("");
    api
      .get<StudentProfile>("/students/me/")
      .then((res) => setProfile(res.data))
      .catch((err) =>
        setError(apiErrorMessage(err, "Unable to load your profile.")),
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="min-h-screen bg-gray-50 pt-28 sm:pt-32 md:pt-36">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-8 w-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
          </div>
        )}

        {!loading && error && (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="mt-3 text-sm font-medium text-red-700">{error}</p>
            <button
              onClick={fetchProfile}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </button>
          </div>
        )}

        {!loading && !error && profile && (
          <Outlet context={{ profile, refetch: fetchProfile } satisfies StudentOutletContext} />
        )}
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-4 text-center text-xs text-gray-400 sm:px-6 lg:px-8">
        MaxoTechs Student Portal
      </footer>
    </div>
  );
};

export default StudentPortalLayout;
