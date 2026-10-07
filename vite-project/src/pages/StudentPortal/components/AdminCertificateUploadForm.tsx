import { useState } from "react";
import type { FormEvent } from "react";
import { Loader2, UploadCloud, X } from "lucide-react";
import { api, apiErrorMessage } from "../../../lib/api";
import type { Certificate } from "../types";
import AdminFileManager, { type ManagedFile } from "./AdminFileManager";

const AdminCertificateUploadForm = ({
  studentId,
  certificate,
  onClose,
  onUploaded,
}: {
  studentId: number;
  /** Pass an existing certificate to switch this form into edit mode
   * (PATCH instead of POST, pre-filled fields). Adding/removing
   * individual files/images happens immediately below the form,
   * independent of the Save button — see AdminFileManager. */
  certificate?: Certificate;
  onClose: () => void;
  onUploaded: () => void;
}) => {
  const isEdit = !!certificate;
  const [title, setTitle] = useState(certificate?.title ?? "");
  const [issuer, setIssuer] = useState(certificate?.issuer ?? "");
  const [issueDate, setIssueDate] = useState(certificate?.issue_date ?? "");
  const [credentialId, setCredentialId] = useState(
    certificate?.credential_id ?? "",
  );
  const [files, setFiles] = useState<File[]>([]);
  const [attachedFiles, setAttachedFiles] = useState<ManagedFile[]>(
    certificate?.files ?? [],
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFilesChange = (fileList: FileList | null) => {
    setFiles(fileList ? Array.from(fileList) : []);
  };

  const removeSelectedFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    const form = new FormData();
    form.append("title", title.trim());
    form.append("issuer", issuer.trim());
    if (issueDate) form.append("issue_date", issueDate);
    form.append("credential_id", credentialId.trim());
    files.forEach((f) => form.append("files", f));

    setSubmitting(true);
    setError("");
    try {
      if (isEdit) {
        await api.patch(`/admin/certificates/${certificate!.id}/`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post(`/admin/students/${studentId}/certificates/`, form, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      onUploaded();
    } catch (err) {
      setError(
        apiErrorMessage(
          err,
          isEdit
            ? "Unable to save changes to this certificate."
            : "Unable to upload this certificate.",
        ),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-cyan-200 bg-cyan-50/40 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-bold text-gray-900">
          {isEdit ? "Edit Certificate" : "Add a Certificate"}
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

      {isEdit && (
        <div className="mb-4">
          <AdminFileManager
            files={attachedFiles}
            uploadUrl={`/admin/certificates/${certificate!.id}/files/`}
            deleteUrlBase="/admin/certificate-files/"
            onChange={setAttachedFiles}
            accentColor="cyan"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Certificate title"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
        />
        <input
          type="text"
          value={issuer}
          onChange={(e) => setIssuer(e.target.value)}
          placeholder="Issued by (e.g. Amazon Web Services)"
          className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
        />
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="date"
            value={issueDate}
            onChange={(e) => setIssueDate(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100 sm:w-48"
          />
          <input
            type="text"
            value={credentialId}
            onChange={(e) => setCredentialId(e.target.value)}
            placeholder="Credential ID (optional)"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-100"
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-500 hover:border-cyan-300 hover:text-cyan-600">
          <UploadCloud className="h-4 w-4 flex-shrink-0" />
          {files.length > 0
            ? `${files.length} file${files.length === 1 ? "" : "s"} selected`
            : isEdit
              ? "Attach more files (optional)"
              : "Attach images or files (optional)"}
          <input
            type="file"
            multiple
            accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.zip"
            className="hidden"
            onChange={(e) => handleFilesChange(e.target.files)}
          />
        </label>
        {files.length > 0 && (
          <ul className="-mt-1 space-y-1">
            {files.map((f, i) => (
              <li
                key={`${f.name}-${i}`}
                className="flex items-center justify-between rounded-lg bg-white px-2.5 py-1 text-xs text-gray-500 ring-1 ring-gray-200"
              >
                <span className="truncate">{f.name}</span>
                <button
                  type="button"
                  onClick={() => removeSelectedFile(i)}
                  className="ml-2 flex-shrink-0 text-gray-400 hover:text-red-600"
                  aria-label={`Remove ${f.name} from selection`}
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </li>
            ))}
          </ul>
        )}
        <p className="-mt-1 text-[11px] text-gray-400">
          A scanned image or PDF of the certificate — you can attach more
          than one.
        </p>

        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-cyan-600 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitting
            ? "Saving..."
            : isEdit
              ? "Save Changes"
              : "Add Certificate"}
        </button>
      </form>
    </div>
  );
};

export default AdminCertificateUploadForm;
