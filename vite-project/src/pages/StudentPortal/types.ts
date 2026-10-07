export type ProjectStatus = "completed" | "in_progress" | "planned";

/** Whether a student is doing an Internship or a Course — set by the
 * Admin on the student's profile (matches the backend's
 * `StudentProfile.enrollment_type` CharField). */
export type EnrollmentType = "internship" | "course";

export const ENROLLMENT_TYPE_LABELS: Record<EnrollmentType, string> = {
  internship: "Internship",
  course: "Course",
};

/** One attachment on a Project — see ProjectFileSerializer in the
 * backend. Always downloaded via the protected
 * /project-files/:id/download/ endpoint, never this `file` URL
 * directly. */
export interface ProjectFile {
  id: string;
  file: string | null;
  /** Just the filename (no folder path), for display. */
  name: string;
  uploaded_at: string;
}

/** One attachment on a Certificate — mirrors ProjectFile. */
export interface CertificateFile {
  id: string;
  file: string | null;
  name: string;
  uploaded_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  /** Comma-separated, e.g. "React, Node.js, MongoDB" — matches the
   * backend's `tech_stack` CharField. */
  tech_stack: string;
  status: ProjectStatus;
  link: string;
  /** Legacy single-file field, kept for backward compatibility. Prefer
   * `files` below — it also contains this same file (backfilled by
   * migration) alongside any additional attachments. */
  file: string | null;
  /** Every file/image attached to this project (0 or more). Prefer
   * downloading via the protected /project-files/:id/download/ endpoint
   * rather than each item's `file` URL directly. */
  files: ProjectFile[];
  uploaded_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_id: string;
  /** Legacy single-file field, kept for backward compatibility — see
   * Project.file. */
  file: string | null;
  files: CertificateFile[];
  uploaded_at: string;
}

/** Full detail — a student's own profile (Student) or any student
 * (Admin), as returned by /students/me/ and /admin/students/:id/. */
export interface StudentProfile {
  id: string;
  phone_number: string;
  full_name: string;
  college_name: string;
  course_name: string;
  branch: string;
  year: string;
  /** Internship or Course — set by the Admin. */
  enrollment_type: EnrollmentType;
  /** URL to the student's uploaded profile photo, or null if none has
   * been set yet. */
  photo: string | null;
  projects: Project[];
  certificates: Certificate[];
}

/** Lightweight row for the Admin console's student directory, as
 * returned by /admin/students/. */
export interface StudentListItem {
  id: string;
  phone_number: string;
  full_name: string;
  course_name: string;
  college_name: string;
  /** Internship or Course — set by the Admin. */
  enrollment_type: EnrollmentType;
  photo: string | null;
  project_count: number;
  certificate_count: number;
}

export const PROJECT_STATUS_LABELS: Record<ProjectStatus, string> = {
  completed: "Completed",
  in_progress: "In Progress",
  planned: "Planned",
};
