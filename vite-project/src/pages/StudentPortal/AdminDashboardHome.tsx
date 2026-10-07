import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search, Users, AlertCircle, RefreshCw, UserPlus } from "lucide-react";
import { api, apiErrorMessage } from "../../lib/api";
import AdminStudentCard from "./components/AdminStudentCard";
import AdminStudentForm from "./components/AdminStudentForm";
import EmptyState from "./components/EmptyState";
import type { StudentListItem } from "./types";

/** DRF's DEFAULT_PAGINATION_CLASS wraps list responses as
 * { count, next, previous, results }. */
interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

const AdminDashboardHome = () => {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState<StudentListItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchStudents = () => {
    setLoading(true);
    setError("");
    api
      .get<PaginatedResponse<StudentListItem> | StudentListItem[]>(
        "/admin/students/",
      )
      .then((res) => {
        const data = res.data;
        setStudents(Array.isArray(data) ? data : data.results);
      })
      .catch((err) =>
        setError(apiErrorMessage(err, "Unable to load the student list.")),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filtered = useMemo(() => {
    if (!students) return [];
    const q = query.trim().toLowerCase();
    if (!q) return students;
    return students.filter(
      (s) =>
        s.full_name.toLowerCase().includes(q) ||
        s.phone_number.toLowerCase().includes(q) ||
        s.course_name.toLowerCase().includes(q) ||
        s.college_name.toLowerCase().includes(q),
    );
  }, [students, query]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">All Students</h2>
            <p className="text-sm text-gray-500">
              {students ? students.length : "—"} student
              {students?.length === 1 ? "" : "s"} on record. Select one to
              view their full profile.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <UserPlus className="h-4 w-4" />
          {showAddForm ? "Cancel" : "Add Student"}
        </button>
      </div>

      {showAddForm && (
        <div className="mt-6">
          <AdminStudentForm
            mode="create"
            onClose={() => setShowAddForm(false)}
            onSaved={() => {
              setShowAddForm(false);
              fetchStudents();
            }}
          />
        </div>
      )}

      <div className="relative mt-6 max-w-md">
        <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
          <Search className="h-4 w-4" />
        </span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, phone, course, college..."
          className="w-full rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
        />
      </div>

      {loading && (
        <div className="mt-10 flex justify-center">
          <div className="h-8 w-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
        </div>
      )}

      {!loading && error && (
        <div className="mx-auto mt-10 flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
          <AlertCircle className="h-8 w-8 text-red-500" />
          <p className="mt-3 text-sm font-medium text-red-700">{error}</p>
          <button
            onClick={fetchStudents}
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      )}

      {!loading && !error && (
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {filtered.length > 0 ? (
            filtered.map((student) => (
              <AdminStudentCard key={student.id} student={student} />
            ))
          ) : (
            <EmptyState label="students matching that search" />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default AdminDashboardHome;
