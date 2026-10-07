import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Download, FileWarning, Loader2, X } from "lucide-react";
import type { FilePreview } from "../utils/preview";

/**
 * Full-page "view before you download" modal for a project/certificate
 * attachment. Renders images and PDFs large and centered; anything else
 * (docx, pptx, zip, ...) falls back to a "no in-browser preview for this
 * file type" notice, since the browser itself can't display those formats.
 *
 * The only action here is Download, shown above the file on the right
 * side (rather than a small icon buried in a list).
 *
 * Rendered through a portal straight into `document.body`. This matters:
 * the card this opens from lives inside a Framer Motion `motion.div`,
 * which keeps a `transform` style on itself for its enter animation. Any
 * ancestor with a `transform` becomes the containing block for its
 * `position: fixed` descendants, so without the portal this modal would
 * be "fixed" to that small animated box instead of the actual viewport —
 * which is why it was rendering small and pinned to a corner instead of
 * centered over the whole page.
 */
const FilePreviewModal = ({
  preview,
  onClose,
  onDownload,
  downloading,
}: {
  preview: FilePreview;
  onClose: () => void;
  onDownload: () => void;
  downloading: boolean;
}) => {
  // Escape closes the modal, and background scroll is paused while it's
  // open — standard modal behaviour, and the rest of the page (including
  // its design) is left completely untouched underneath.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const isImage = preview.mimeType.startsWith("image/");
  const isPdf = preview.mimeType === "application/pdf";

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/70 p-2 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${preview.filename}`}
    >
      <div
        className="flex h-[96vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl sm:h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-gray-100 px-5 py-3.5">
          <p className="min-w-0 truncate text-sm font-semibold text-gray-900">
            {preview.filename}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex-shrink-0 rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close preview"
            title="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body: the file is centered and takes almost all of the
         * available space. On the right, a slim column holds the
         * Download action above the file rather than beside its middle. */}
        <div className="flex min-h-0 flex-1 flex-col-reverse sm:flex-row">
          <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto bg-gray-50 p-3 sm:p-4">
            {isImage && (
              <img
                src={preview.url}
                alt={preview.filename}
                className="max-h-full max-w-full rounded-lg object-contain shadow-sm"
                loading="lazy"
              />
            )}

            {isPdf && (
              <iframe
                src={preview.url}
                title={preview.filename}
                className="h-full w-full rounded-lg border border-gray-200 bg-white"
              />
            )}

            {!isImage && !isPdf && (
              <div className="flex flex-col items-center px-6 py-10 text-center">
                <FileWarning className="h-8 w-8 text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-600">
                  No in-browser preview for this file type.
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Download it to view it on your device.
                </p>
              </div>
            )}
          </div>

          {/* Right side rail — Download sits at the top, above the file
           * viewer, instead of as a small icon in a file list. */}
          <div className="flex flex-shrink-0 items-center justify-center gap-3 border-b border-gray-100 bg-white px-4 py-3 sm:w-28 sm:flex-col sm:items-stretch sm:justify-start sm:border-b-0 sm:border-l sm:px-3 sm:py-5">
            <button
              type="button"
              onClick={onDownload}
              disabled={downloading}
              className="flex flex-shrink-0 flex-col items-center gap-1.5 rounded-xl border border-gray-200 px-4 py-3 text-xs font-semibold text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50"
              aria-label={`Download ${preview.filename}`}
              title="Download"
            >
              {downloading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Download className="h-5 w-5" />
              )}
              Download
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default FilePreviewModal;
