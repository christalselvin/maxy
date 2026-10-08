import { useState } from "react";
import {
  ArrowUpRight,
  Loader2,
  AlertCircle,
  Pencil,
  Trash2,
  Paperclip,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import type { Project, ProjectFile } from "../types";
import { PROJECT_STATUS_LABELS } from "../types";
import { previewProject, previewProjectFile } from "../utils/preview";
import { useFilePreview } from "../hooks/useFilePreview";
import FilePreviewModal from "./FilePreviewModal";

const statusStyles: Record<Project["status"], string> = {
  completed: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  in_progress: "bg-amber-50 text-amber-700 ring-amber-200",
  planned: "bg-gray-100 text-gray-600 ring-gray-200",
};

function techStackList(techStack: string): string[] {
  return techStack
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

const ProjectCard = ({
  project,
  onDownload,
  onDownloadFile,
  onEdit,
  onDelete,
}: {
  project: Project;
  /** Legacy single-file download — only used as a fallback when `project`
   * has no `files` list entries at all (e.g. pre-migration data). Returns
   * an error message on failure, or null on success. */
  onDownload?: (project: Project) => Promise<string | null>;
  /** Downloads one entry from `project.files`. Returns an error message
   * on failure, or null on success. */
  onDownloadFile?: (file: ProjectFile) => Promise<string | null>;
  /** Admin-only: shows an Edit control when provided. */
  onEdit?: (project: Project) => void;
  /** Admin-only: shows a Remove control when provided. */
  onDelete?: (project: Project) => void;
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
  // Descriptions are clamped to 3 lines by default so cards stay a
  // consistent height in the grid — this lets a student expand any one
  // of them to read the complete text instead of it being cut off with
  // no way to see the rest.
  const [descriptionExpanded, setDescriptionExpanded] = useState(false);

  // Only bother offering "Show more" when the description is actually
  // long enough to be clipped by line-clamp-3 in the first place.
  const isLongDescription = (project.description?.length ?? 0) > 160;

  const hasFiles = project.files && project.files.length > 0;

  const handleLegacyDownload = async () => {
    if (!onDownload) return;
    setDownloadingLegacy(true);
    setError("");
    const message = await onDownload(project);
    setDownloadingLegacy(false);
    if (message) setError(message);
  };

  const handleFileDownload = async (file: ProjectFile) => {
    if (!onDownloadFile) return;
    setDownloadingFileId(file.id);
    setError("");
    const message = await onDownloadFile(file);
    setDownloadingFileId(null);
    if (message) setError(message);
  };

  const handleLegacyPreview = () =>
    openPreview("legacy", () => previewProject(project.id, project.title));

  const handleFilePreview = (file: ProjectFile) =>
    openPreview(String(file.id), () => previewProjectFile(file.id, file.name));

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-sm font-semibold text-gray-900 leading-snug">
          {project.title}
        </h3>
        <span
          className={`flex-shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium ring-1 ${statusStyles[project.status]}`}
        >
          {PROJECT_STATUS_LABELS[project.status]}
        </span>
      </div>

      <p
        className={`mt-2 text-sm text-gray-500 leading-relaxed ${
          descriptionExpanded ? "" : "line-clamp-3"
        }`}
      >
        {project.description}
      </p>
      {isLongDescription && (
        <button
          type="button"
          onClick={() => setDescriptionExpanded((v) => !v)}
          className="mt-1 inline-flex items-center gap-0.5 self-start text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          {descriptionExpanded ? (
            <>
              Show less
              <ChevronUp className="h-3 w-3" />
            </>
          ) : (
            <>
              Show more
              <ChevronDown className="h-3 w-3" />
            </>
          )}
        </button>
      )}

      <div className="mt-4 flex flex-wrap gap-1.5">
        {techStackList(project.tech_stack).map((tech) => (
          <span
            key={tech}
            className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Multiple attachments — clicking one opens it right away; the
       * download option lives inside the viewer, on its side. */}
      {hasFiles && (
        <ul className="mt-3 space-y-1">
          {project.files.map((file) => (
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

      <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
        <span className="text-xs text-gray-400">
          {formatDate(project.uploaded_at)}
        </span>
        <div className="flex items-center gap-3">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              View project
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ) : (
            <span className="text-xs text-gray-300">No link yet</span>
          )}
          {/* Legacy single-file fallback — only shown when there's no
           * entry in `files` at all but the old `file` field is set.
           * Clicking it opens the project file directly; downloading
           * happens from inside the viewer. */}
          {!hasFiles &&
            onDownload &&
            (project.file ? (
              <button
                type="button"
                onClick={handleLegacyPreview}
                disabled={previewingKey === "legacy"}
                className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition disabled:opacity-50"
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
                className="text-xs text-gray-300"
                title="Admin hasn't uploaded a file for this project yet"
              >
                No file yet
              </span>
            ))}
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(project)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-blue-600 transition"
              aria-label={`Edit ${project.title}`}
              title="Edit"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(project)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
              aria-label={`Remove ${project.title}`}
              title="Remove"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {(error || previewError) && (
        <p className="mt-2 flex items-center gap-1 text-xs text-red-600">
          <AlertCircle className="h-3 w-3 flex-shrink-0" />
          {error || previewError}
        </p>
      )}

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
            const file = project.files.find(
              (f) => String(f.id) === previewKey,
            );
            if (file) handleFileDownload(file);
          }}
        />
      )}
    </div>
  );
};

export default ProjectCard;
