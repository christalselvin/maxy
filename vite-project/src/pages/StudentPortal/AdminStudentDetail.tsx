import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Building2,
  AlertCircle,
  RefreshCw,
  FolderPlus,
  Award as AwardIcon,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { api, apiErrorMessage } from "../../lib/api";
import ProjectCard from "./components/ProjectCard";
import CertificateCard from "./components/CertificateCard";
import EmptyState from "./components/EmptyState";
import AdminProjectUploadForm from "./components/AdminProjectUploadForm";
import AdminCertificateUploadForm from "./components/AdminCertificateUploadForm";
import AdminStudentForm from "./components/AdminStudentForm";
import Avatar from "./components/Avatar";
import { downloadProject, downloadCertificate, downloadProjectFile, downloadCertificateFile } from "./utils/download";
import type { Project, Certificate, StudentProfile, ProjectFile, CertificateFile } from "./types";
import { ENROLLMENT_TYPE_LABELS } from "./types";

const AdminStudentDetail = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();

  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  const [showEditStudentForm, setShowEditStudentForm] = useState(false);
  const [deletingStudent, setDeletingStudent] = useState(false);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(null);

  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [editingCertificate, setEditingCertificate] =
    useState<Certificate | null>(null);
  const [deletingCertificateId, setDeletingCertificateId] = useState<string | null>(null);

  const fetchStudent = useCallback(() => {
    if (!studentId) return;
    setLoading(true);
    setError("");
    api
      .get<StudentProfile>(`/admin/students/${studentId}/`)
      .then((res) => setStudent(res.data))
      .catch((err) =>
        setError(apiErrorMessage(err, "Unable to load this student.")),
      )
      .finally(() => setLoading(false));
  }, [studentId]);

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const handleDeleteStudent = async () => {
    if (!student) return;
    if (
      !window.confirm(
        `Remove ${student.full_name || student.phone_number} entirely? This deletes their account, profile, and all their projects and certificates. This cannot be undone.`,
      )
    ) {
      return;
    }
    setDeletingStudent(true);
    setActionError("");
    try {
      await api.delete(`/admin/students/${student.id}/`);
      navigate("/student-portal/admin");
    } catch (err) {
      setActionError(apiErrorMessage(err, "Unable to remove this student."));
      setDeletingStudent(false);
    }
  };

  const handleDeleteProject = async (project: Project) => {
    if (!window.confirm(`Remove "${project.title}"? This cannot be undone.`))
      return;
    setDeletingProjectId(project.id);
    setActionError("");
    try {
      await api.delete(`/admin/projects/${project.id}/`);
      fetchStudent();
    } catch (err) {
      setActionError(apiErrorMessage(err, "Unable to remove this project."));
    } finally {
      setDeletingProjectId(null);
    }
  };

  const handleDeleteCertificate = async (certificate: Certificate) => {
    if (
      !window.confirm(`Remove "${certificate.title}"? This cannot be undone.`)
    )
      return;
    setDeletingCertificateId(certificate.id);
    setActionError("");
    try {
      await api.delete(`/admin/certificates/${certificate.id}/`);
      fetchStudent();
    } catch (err) {
      setActionError(
        apiErrorMessage(err, "Unable to remove this certificate."),
      );
    } finally {
      setDeletingCertificateId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <div className="h-8 w-8 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center">
        <AlertCircle className="h-8 w-8 text-red-500" />
        <p className="mt-3 text-sm font-medium text-red-700">
          {error || "Student not found."}
        </p>
        <button
          onClick={fetchStudent}
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
        >
          <RefreshCw className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <Link
          to="/student-portal/admin"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to All Students
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowEditStudentForm((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            {showEditStudentForm ? "Cancel" : "Edit Student"}
          </button>
          <button
            onClick={handleDeleteStudent}
            disabled={deletingStudent}
            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {deletingStudent ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Trash2 className="h-3.5 w-3.5" />
            )}
            Remove Student
          </button>
        </div>
      </div>

      {actionError && (
        <p className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          {actionError}
        </p>
      )}

      {showEditStudentForm ? (
        <AdminStudentForm
          mode="edit"
          initial={{
            id: student.id,
            full_name: student.full_name,
            phone_number: student.phone_number,
            college_name: student.college_name,
            course_name: student.course_name,
            branch: student.branch,
            year: student.year,
            enrollment_type: student.enrollment_type,
            photo: student.photo,
          }}
          onClose={() => setShowEditStudentForm(false)}
          onSaved={() => {
            setShowEditStudentForm(false);
            fetchStudent();
          }}
        />
      ) : (
        /* Profile card */
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
              photoUrl={student.photo}
              name={student.full_name}
              className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold ring-1 ring-white/30 backdrop-blur"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-xl font-bold sm:text-2xl">
                  {student.full_name}
                </h2>
                <span className="inline-flex items-center rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-white/30 backdrop-blur">
                  {ENROLLMENT_TYPE_LABELS[student.enrollment_type]}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/80">
                {student.phone_number}
              </p>
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
                  {student.course_name || "—"}
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
                  {student.year || "—"}
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
                  {student.college_name || "—"}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      )}

      {/* Projects */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Projects</h3>
          <button
            onClick={() => {
              setEditingProject(null);
              setShowProjectForm((v) => !v);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-blue-200 px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            <FolderPlus className="h-3.5 w-3.5" />
            {showProjectForm && !editingProject ? "Cancel" : "Add Project"}
          </button>
        </div>

        {showProjectForm && !editingProject && (
          <div className="mt-4">
            <AdminProjectUploadForm
              studentId={student.id}
              onClose={() => setShowProjectForm(false)}
              onUploaded={() => {
                setShowProjectForm(false);
                fetchStudent();
              }}
            />
          </div>
        )}

        {editingProject && (
          <div className="mt-4">
            <AdminProjectUploadForm
              studentId={student.id}
              project={editingProject}
              onClose={() => setEditingProject(null)}
              onUploaded={() => {
                setEditingProject(null);
                fetchStudent();
              }}
            />
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {student.projects.length > 0 ? (
            student.projects.map((project: Project) => (
              <div key={project.id} className="relative">
                <ProjectCard
                  project={project}
                  onDownload={(p) => downloadProject(p.id, p.title)}
                  onDownloadFile={(f: ProjectFile) =>
                    downloadProjectFile(f.id, f.name)
                  }
                  onEdit={(p) => {
                    setShowProjectForm(false);
                    setEditingProject(p);
                  }}
                  onDelete={handleDeleteProject}
                />
                {deletingProjectId === project.id && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
                    <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <EmptyState label="projects" />
          )}
        </div>
      </div>

      {/* Certificates */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-gray-900">Certificates</h3>
          <button
            onClick={() => {
              setEditingCertificate(null);
              setShowCertificateForm((v) => !v);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg border border-cyan-200 px-3 py-1.5 text-xs font-semibold text-cyan-600 transition hover:bg-cyan-50"
          >
            <AwardIcon className="h-3.5 w-3.5" />
            {showCertificateForm && !editingCertificate
              ? "Cancel"
              : "Add Certificate"}
          </button>
        </div>

        {showCertificateForm && !editingCertificate && (
          <div className="mt-4">
            <AdminCertificateUploadForm
              studentId={student.id}
              onClose={() => setShowCertificateForm(false)}
              onUploaded={() => {
                setShowCertificateForm(false);
                fetchStudent();
              }}
            />
          </div>
        )}

        {editingCertificate && (
          <div className="mt-4">
            <AdminCertificateUploadForm
              studentId={student.id}
              certificate={editingCertificate}
              onClose={() => setEditingCertificate(null)}
              onUploaded={() => {
                setEditingCertificate(null);
                fetchStudent();
              }}
            />
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {student.certificates.length > 0 ? (
            student.certificates.map((cert: Certificate) => (
              <div key={cert.id} className="relative">
                <CertificateCard
                  certificate={cert}
                  onDownload={(c) => downloadCertificate(c.id, c.title)}
                  onDownloadFile={(f: CertificateFile) =>
                    downloadCertificateFile(f.id, f.name)
                  }
                  onEdit={(c) => {
                    setShowCertificateForm(false);
                    setEditingCertificate(c);
                  }}
                  onDelete={handleDeleteCertificate}
                />
                {deletingCertificateId === cert.id && (
                  <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/70">
                    <Loader2 className="h-5 w-5 animate-spin text-red-500" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <EmptyState label="certificates" />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminStudentDetail;
