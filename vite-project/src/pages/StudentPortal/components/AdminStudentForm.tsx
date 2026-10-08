import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, UploadCloud, X, UserPlus } from "lucide-react";
import { api, apiErrorMessage } from "../../../lib/api";
import type { EnrollmentType, StudentProfile } from "../types";

export interface AdminStudentFormInitial {
  id: string;
  full_name: string;
  phone_number: string;
  college_name: string;
  course_name: string;
  branch: string;
  year: string;
  enrollment_type: EnrollmentType;
  photo: string | null;
}

const AdminStudentForm = ({
  mode,
  initial,
  onClose,
  onSaved,
}: {
  /** "create" posts a new student to /admin/students/; "edit" PATCHes
   * the existing one at /admin/students/:id/. */
  mode: "create" | "edit";
  /** Required (and pre-fills every field) in "edit" mode. */
  initial?: AdminStudentFormInitial;
  onClose: () => void;
  onSaved: (student: StudentProfile) => void;
}) => {
  const [fullName, setFullName] = useState(initial?.full_name ?? "");
  const [phoneNumber, setPhoneNumber] = useState(initial?.phone_number ?? "");
  const [collegeName, setCollegeName] = useState(initial?.college_name ?? "");
  const [courseName, setCourseName] = useState(initial?.course_name ?? "");
  const [branch, setBranch] = useState(initial?.branch ?? "");
  const [year, setYear] = useState(initial?.year ?? "");
  const [enrollmentType, setEnrollmentType] = useState<EnrollmentType>(
    initial?.enrollment_type ?? "course",
  );
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(
    initial?.photo ?? null,
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handlePhotoChange = (fileList: FileList | null) => {
    const file = fileList?.[0] ?? null;
    setPhoto(file);
    setPhotoPreview(file ? URL.createObjectURL(file) : (initial?.photo ?? null));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      setError("Phone number is required.");
      return;
    }

    const form = new FormData();
    form.append("full_name", fullName.trim());
    form.append("phone_number", phoneNumber.trim());
    form.append("college_name", collegeName.trim());
    form.append("course_name", courseName.trim());
    form.append("branch", branch.trim());
    form.append("year", year.trim());
    form.append("enrollment_type", enrollmentType);
    if (photo) form.append("photo", photo);

    setSubmitting(true);
    setError("");
    try {
      const response =
        mode === "create"
          ? await api.post<StudentProfile>("/admin/students/", form, {
            })
          : await api.patch<StudentProfile>(
              `/admin/students/${initial!.id}/`,
              form,
            
            );
      onSaved(response.data);
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          mode === "create"
            ? "Unable to add this student."
            : "Unable to save these changes.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="flex items-center gap-1.5 text-sm font-bold text-gray-900">
          <UserPlus className="h-4 w-4 text-blue-600" />
          {mode === "create" ? "Add a New Student" : "Edit Student Details"}
        </h4>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white ring-1 ring-gray-200">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="h-full w-full object-cover"
                loading="lazy"

              />
            ) : (
              <UploadCloud className="h-5 w-5 text-gray-300" />
            )}
          </div>
          <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-500 hover:border-blue-300 hover:text-blue-600">
            <UploadCloud className="h-4 w-4 flex-shrink-0" />
            {photo ? photo.name : "Upload photo (optional)"}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handlePhotoChange(e.target.files)}
            />
          </label>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full name"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="text"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Phone number, e.g. +919876543210"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <input
          type="text"
          value={collegeName}
          onChange={(e) => setCollegeName(e.target.value)}
          placeholder="College name"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
        />

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Course name"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="text"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            placeholder="Branch"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input
            type="text"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder="Year"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 sm:w-32"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium text-gray-500">
            Enrollment Type
          </label>
          <div className="flex gap-3">
            {(["course", "internship"] as EnrollmentType[]).map((type) => (
              <label
                key={type}
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                  enrollmentType === type
                    ? "border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500"
                    : "border-gray-300 bg-white text-gray-600 hover:border-blue-300"
                }`}
              >
                <input
                  type="radio"
                  name="enrollmentType"
                  value={type}
                  checked={enrollmentType === type}
                  onChange={() => setEnrollmentType(type)}
                  className="sr-only"
                />
                {type === "course" ? "Course" : "Internship"}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting
            ? "Saving..."
            : mode === "create"
              ? "Add Student"
              : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default AdminStudentForm;
