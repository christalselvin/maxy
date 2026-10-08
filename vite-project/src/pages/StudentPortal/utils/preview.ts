import { api, apiErrorMessage } from "../../../lib/api";

/**
 * Result of a successful preview fetch — an in-memory object URL for the
 * file's bytes (never the raw MEDIA_URL) plus enough metadata for the
 * preview modal to decide how to render it and what to call it.
 *
 * `url` is created with `URL.createObjectURL` and must be released with
 * `URL.revokeObjectURL` once the preview modal closes (handled by
 * `useFilePreview`), or it leaks memory for the life of the tab.
 */
export interface FilePreview {
  url: string;
  mimeType: string;
  filename: string;
}

export interface PreviewOutcome {
  preview: FilePreview | null;
  error: string | null;
}

/**
 * Fetches a project/certificate file through the backend's protected
 * `.../preview/` endpoint (mirrors `downloadProtectedFile` in
 * `./download.ts`, but the resulting blob is handed back for on-page
 * rendering — img/iframe/etc — instead of being saved to disk). The
 * request carries the person's auth token, so the server enforces the
 * same "a Student only ever sees their own files" rule as the download
 * endpoints (see portal/views.py *PreviewView).
 */
async function fetchPreview(
  url: string,
  fallbackName: string,
): Promise<PreviewOutcome> {
  try {
    const response = await api.get(url, { responseType: "blob" });
    const blob = response.data as Blob;

    // Prefer the filename the server actually sent (see download.ts for
    // why this beats a client-guessed one).
    const disposition = response.headers["content-disposition"] as
      | string
      | undefined;
    const match = disposition?.match(/filename\*?=(?:UTF-8'')?"?([^";]+)"?/i);
    const filename = match?.[1] ? decodeURIComponent(match[1]) : fallbackName;

    return {
      preview: {
        url: URL.createObjectURL(blob),
        mimeType: blob.type || "application/octet-stream",
        filename,
      },
      error: null,
    };
  } catch (error) {
    return {
      preview: null,
      error: apiErrorMessage(error, "Unable to preview this file."),
    };
  }
}

/** Legacy single-file preview — mirrors downloadProject in download.ts. */
export function previewProject(
  projectId: string,
  title: string,
): Promise<PreviewOutcome> {
  return fetchPreview(`/projects/${projectId}/preview/`, title);
}

/** Legacy single-file preview — mirrors downloadCertificate. */
export function previewCertificate(
  certificateId: string,
  title: string,
): Promise<PreviewOutcome> {
  return fetchPreview(`/certificates/${certificateId}/preview/`, title);
}

/** Previews one attachment from a project's `files` list. */
export function previewProjectFile(
  fileId: string,
  displayName: string,
): Promise<PreviewOutcome> {
  return fetchPreview(`/project-files/${fileId}/preview/`, displayName);
}

/** Previews one attachment from a certificate's `files` list. */
export function previewCertificateFile(
  fileId: string,
  displayName: string,
): Promise<PreviewOutcome> {
  return fetchPreview(`/certificate-files/${fileId}/preview/`, displayName);
}
