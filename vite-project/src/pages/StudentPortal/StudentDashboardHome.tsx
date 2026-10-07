import { motion } from "framer-motion";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import {
  FolderKanban,
  Award,
  LogOut,
  ChevronRight,
  GraduationCap,
  BookOpen,
  CalendarDays,
  Building2,
} from "lucide-react";
import { usePortalAuth } from "./context/PortalAuthContext";
import type { StudentOutletContext } from "./StudentPortalLayout";
import Avatar from "./components/Avatar";
import { ENROLLMENT_TYPE_LABELS } from "./types";

const StudentDashboardHome = () => {
  const { profile } = useOutletContext<StudentOutletContext>();
  const { logout } = usePortalAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="grid grid-cols-1 gap-6 lg:grid-cols-2"
    >
      {/* Box 1 — Student details */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-blue-600 to-cyan-600 p-6 text-white shadow-xl sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, #fff 0, transparent 45%)",
          }}
        />
        <div className="relative flex items-center gap-4">
          <Avatar
            photoUrl={profile.photo}
            name={profile.full_name}
            className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold ring-1 ring-white/30 backdrop-blur"
          />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold sm:text-2xl">
                {profile.full_name}
              </h2>
              <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-white/30 backdrop-blur">
                {ENROLLMENT_TYPE_LABELS[profile.enrollment_type]}
              </span>
            </div>
            <p className="mt-1 text-sm text-white/80">{profile.phone_number}</p>
          </div>
        </div>

        <dl className="relative mt-8 grid grid-cols-1 gap-5 border-t border-white/15 pt-6 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/70" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">
                Course
              </dt>
              <dd className="mt-0.5 text-sm font-semibold">
                {profile.course_name || "—"}
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CalendarDays className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/70" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">
                Year
              </dt>
              <dd className="mt-0.5 text-sm font-semibold">
                {profile.year || "—"}
              </dd>
            </div>
          </div>

          <div className="flex items-start gap-3 sm:col-span-2">
            <Building2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-white/70" />
            <div>
              <dt className="text-xs font-medium uppercase tracking-wide text-white/60">
                College
              </dt>
              <dd className="mt-0.5 text-sm font-semibold">
                {profile.college_name || "—"}
              </dd>
            </div>
          </div>
        </dl>
      </div>

      {/* Box 2 — Actions: Projects, Certificates, Sign Out */}
      <div className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-gray-100 text-gray-500">
            <GraduationCap className="h-5 w-5" />
          </div>
          <h2 className="text-base font-bold text-gray-900">Portal Menu</h2>
        </div>

        <div className="mt-6 flex flex-1 flex-col gap-3">
          <Link
            to="/student-portal/dashboard/projects"
            className="group flex items-center justify-between rounded-xl border border-gray-200 px-4 py-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50/50 hover:shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Projects
                </p>
                <p className="text-xs text-gray-500">
                  {profile.projects.length} project
                  {profile.projects.length === 1 ? "" : "s"} on file
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
          </Link>

          <Link
            to="/student-portal/dashboard/certificates"
            className="group flex items-center justify-between rounded-xl border border-gray-200 px-4 py-4 transition hover:-translate-y-0.5 hover:border-cyan-200 hover:bg-cyan-50/50 hover:shadow-sm"
          >
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
                <Award className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Certificates
                </p>
                <p className="text-xs text-gray-500">
                  {profile.certificates.length} certificate
                  {profile.certificates.length === 1 ? "" : "s"} earned
                </p>
              </div>
            </div>
            <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-cyan-600" />
          </Link>

          <button
            onClick={handleSignOut}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3.5 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentDashboardHome;
