import { useState } from "react";
import {
  Award,
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
  Paperclip,
} from "lucide-react";
import type { Certificate, CertificateFile } from "../types";
import { previewCertificate, previewCertificateFile } from "../utils/preview";
import { useFilePreview } from "../hooks/useFilePreview";
import FilePreviewModal from "./FilePreviewModal";

const CertificateCard = ({
  certificate,
  onDownload,
  onDownloadFile,
  onEdit,
  onDelete,
}: {
  certificate: Certificate;
  /** Legacy single-file download — only used as a fallback when
   * `certificate` has no `files` list entries at all (e.g. pre-migration
   * data). Returns an error message on failure, or null on success. */
  onDownload?: (certificate: Certificate) => Promise<string | null>;
  /** Downloads one entry from `certificate.files`. Returns an error
   * message on failure, or null on success. */
  onDownloadFile?: (file: CertificateFile) => Promise<string | null>;
  /** Admin-only: shows an Edit control when provided. */
  onEdit?: (certificate: Certificate) => void;
  /** Admin-only: shows a Remove control when provided. */
  onDelete?: (certificate: Certificate) => void;
}) => {
  const [downloadingLegacy, setDownloadingLegacy] = useState(false);
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const {
    preview,
    activeKey: previewKey,
    loadingKey: previewingKey,
    error: previewError,
    open: openPreview,
    close: closePreview,
  } = useFilePreview();

  const hasFiles = certificate.files && certificate.files.length > 0;

  const handleLegacyDownload = async () => {
    if (!onDownload) return;
    setDownloadingLegacy(true);
    setError("");
    const message = await onDownload(certificate);
    setDownloadingLegacy(false);
    if (message) setError(message);
  };

  const handleFileDownload = async (file: CertificateFile) => {
    if (!onDownloadFile) return;
    setDownloadingFileId(file.id);
    setError("");
    const message = await onDownloadFile(file);
    setDownloadingFileId(null);
    if (message) setError(message);
  };

  const handleLegacyPreview = () =>
    openPreview("legacy", () =>
      previewCertificate(certificate.id, certificate.title),
    );

  const handleFilePreview = (file: CertificateFile) =>
    openPreview(String(file.id), () =>
      previewCertificateFile(file.id, file.name),
    );

  return (
    <div className="group flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
        <Award className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
          {certificate.title}
        </h3>
        <p className="mt-0.5 text-xs text-gray-500">{certificate.issuer}</p>

        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-400">
          {certificate.issue_date && <span>Issued {certificate.issue_date}</span>}
          {certificate.credential_id && (
            <span className="truncate">ID: {certificate.credential_id}</span>
          )}
        </div>

        {/* Multiple attachments — clicking one opens it right away; the
         * download option lives inside the viewer, on its side. */}
        {hasFiles && (
          <ul className="mt-3 space-y-1">
            {certificate.files.map((file) => (
              <li key={file.id}>
                <button
                  type="button"
                  onClick={() => handleFilePreview(file)}
                  disabled={previewingKey === String(file.id)}
                  className="flex w-full items-center gap-1.5 rounded-lg bg-gray-50 px-2.5 py-1.5 text-left text-xs text-gray-600 transition hover:bg-blue-50 hover:text-blue-700 disabled:opacity-60"
                  aria-label={`Open ${file.name}`}
                  title="Open"
                >
                  {previewingKey === String(file.id) ? (
                    <Loader2 className="h-3 w-3 flex-shrink-0 animate-spin text-blue-500" />
                  ) : (
                    <Paperclip className="h-3 w-3 flex-shrink-0 text-gray-400" />
                  )}
                  <span className="truncate">{file.name}</span>
                </button>
              </li>
            ))}
          </ul>
        )}

        {(error || previewError) && (
          <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
            <AlertCircle className="h-3 w-3 flex-shrink-0" />
            {error || previewError}
          </p>
        )}
      </div>

      <div className="flex flex-shrink-0 items-center gap-1">
        {/* Legacy single-file fallback — only shown when there's no
         * entry in `files` at all but the old `file` field is set.
         * Clicking it opens the certificate directly; downloading
         * happens from inside the viewer. */}
        {!hasFiles &&
          onDownload &&
          (certificate.file ? (
            <button
              type="button"
              onClick={handleLegacyPreview}
              disabled={previewingKey === "legacy"}
              className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition disabled:opacity-50"
            >
              {previewingKey === "legacy" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Opening…
                </>
              ) : (
                "View file"
              )}
            </button>
          ) : (
            <span
              className="px-1 text-[11px] text-gray-300"
              title="Admin hasn't uploaded a file for this certificate yet"
            >
              No file
            </span>
          ))}
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(certificate)}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition"
            aria-label={`Edit ${certificate.title}`}
            title="Edit"
          >
            <Pencil className="h-4 w-4" />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={() => onDelete(certificate)}
            className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
            aria-label={`Remove ${certificate.title}`}
            title="Remove"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {preview && (
        <FilePreviewModal
          preview={preview}
          onClose={closePreview}
          downloading={
            previewKey === "legacy"
              ? downloadingLegacy
              : downloadingFileId !== null
          }
          onDownload={() => {
            if (previewKey === "legacy") {
              handleLegacyDownload();
              return;
            }
            const file = certificate.files.find(
              (f) => String(f.id) === previewKey,
            );
            if (file) handleFileDownload(file);
          }}
        />
      )}
    </div>
  );
};

export default CertificateCard;
