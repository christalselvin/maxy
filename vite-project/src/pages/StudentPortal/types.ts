export type ProjectStatus = "completed" | "in_progress" | "planned";

export type EnrollmentType = "internship" | "course";

export const ENROLLMENT_TYPE_LABELS: Record<EnrollmentType, string> = {
  internship: "Internship",
  course: "Course",
};

export interface ProjectFile {
  id: string;
  file: string | null;
  name: string;
  uploaded_at: string;
}

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
  tech_stack: string;
  status: ProjectStatus;
  link: string;
  file: string | null;
  files: ProjectFile[];
  uploaded_at: string;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_id: string;
  file: string | null;
  files: CertificateFile[];
  uploaded_at: string;
}

export interface StudentProfile {
  id: string;
  phone_number: string;
  full_name: string;
  college_name: string;
  course_name: string;
  branch: string;
  year: string;
  enrollment_type: EnrollmentType;
  photo: string | null;
  projects: Project[];
  certificates: Certificate[];
}

export interface StudentListItem {
  id: string;
  phone_number: string;
  full_name: string;
  course_name: string;
  college_name: string;
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