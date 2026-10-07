import { Link } from "react-router-dom";
import { ChevronRight, FolderKanban, Award } from "lucide-react";
import { ENROLLMENT_TYPE_LABELS } from "../types";
import type { StudentListItem } from "../types";
import Avatar from "./Avatar";

const AdminStudentCard = ({ student }: { student: StudentListItem }) => {
  return (
    <Link
      to={`/student-portal/admin/students/${student.id}`}
      className="group flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
    >
      <div className="flex items-center gap-4 min-w-0">
        <Avatar
          photoUrl={student.photo}
          name={student.full_name}
          className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <p className="truncate text-sm font-semibold text-gray-900">
              {student.full_name}
            </p>
            <span
              className={`inline-flex flex-shrink-0 items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                student.enrollment_type === "internship"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-blue-50 text-blue-700"
              }`}
            >
              {ENROLLMENT_TYPE_LABELS[student.enrollment_type]}
            </span>
          </div>
          <p className="truncate text-xs text-gray-500">
            {student.phone_number}
          </p>
          <p className="mt-1 truncate text-xs text-gray-400">
            {student.course_name}
            {student.college_name ? ` \u00b7 ${student.college_name}` : ""}
          </p>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-4">
        <div className="hidden items-center gap-3 text-xs text-gray-400 sm:flex">
          <span className="inline-flex items-center gap-1">
            <FolderKanban className="h-3.5 w-3.5" />
            {student.project_count}
          </span>
          <span className="inline-flex items-center gap-1">
            <Award className="h-3.5 w-3.5" />
            {student.certificate_count}
          </span>
        </div>
        <ChevronRight className="h-4 w-4 text-gray-300 transition group-hover:translate-x-0.5 group-hover:text-blue-600" />
      </div>
    </Link>
  );
};

export default AdminStudentCard;
