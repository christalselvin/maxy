import { api, apiErrorMessage } from "../../../lib/api";

/**
 * Downloads a project or certificate file through the backend's protected
 * endpoint (not a plain MEDIA_URL link) — the request carries the
 * person's auth token, so the server can enforce that a Student only
 * ever downloads their own files while an Admin can download any
 * student's (see portal/views.py ProjectDownloadView /
 * CertificateDownloadView / ProjectFileDownloadView /
 * CertificateFileDownloadView, and portal/urls.py for the routes).
 *
 * Returns an error message on failure (e.g. "no file uploaded yet", or a
 * 403 if something tried to fetch a file that isn't theirs), or null on
 * success.
 */
async function downloadProtectedFile(
  url: string,
  fallbackBaseName: string,
): Promise<string | null> {
  try {
    const response = await api.get(url, { responseType: "blob" });
    const blob = response.data as Blob;

    // Prefer the filename the server actually sent (Content-Disposition —
    // now readable cross-origin thanks to CORS_EXPOSE_HEADERS in
    // settings.py). Falling back to a name built from the item's title
    // is fine, but the *extension* on that fallback must match the
    // file's real type, not be hardcoded — a hardcoded ".pdf" slapped on
    // a .docx/.png/.zip download is exactly what caused "Failed to load
    // PDF document": the file's bytes were never a PDF, only its (wrong)
    // extension said so.
    const disposition = response.headers["content-disposition"] as
      | string
      | undefined;
    const match = disposition?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
    const filename = match?.[1]
      ? decodeURIComponent(match[1])
      : `${fallbackBaseName}${extensionFor(blob.type)}`;

    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);

    return null;
  } catch (error) {
    return apiErrorMessage(error, "Unable to download this file.");
  }
}

/** Best-effort file extension (with leading dot) derived from the blob's
 * actual MIME type, only used when the server didn't send a filename via
 * Content-Disposition. Never assumes PDF. */
function extensionFor(mimeType: string): string {
  const map: Record<string, string> = {
    "application/pdf": ".pdf",
    "application/msword": ".doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      ".docx",
    "application/vnd.ms-powerpoint": ".ppt",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation":
      ".pptx",
    "application/zip": ".zip",
    "application/x-zip-compressed": ".zip",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "text/plain": ".txt",
  };
  return map[mimeType] || "";
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "file"
  );
}

/** Legacy single-file download — still used for any project whose only
 * attachment is the original `file` field. */
export function downloadProject(
  projectId: number,
  title: string,
): Promise<string | null> {
  return downloadProtectedFile(`/projects/${projectId}/download/`, slugify(title));
}

/** Legacy single-file download — see downloadProject. */
export function downloadCertificate(
  certificateId: number,
  title: string,
): Promise<string | null> {
  return downloadProtectedFile(
    `/certificates/${certificateId}/download/`,
    slugify(title),
  );
}

/** Downloads one attachment from a project's `files` list. */
export function downloadProjectFile(
  fileId: number,
  displayName: string,
): Promise<string | null> {
  return downloadProtectedFile(
    `/project-files/${fileId}/download/`,
    slugify(displayName),
  );
}

/** Downloads one attachment from a certificate's `files` list. */
export function downloadCertificateFile(
  fileId: number,
  displayName: string,
): Promise<string | null> {
  return downloadProtectedFile(
    `/certificate-files/${fileId}/download/`,
    slugify(displayName),
  );
}
