import { useRef, useState } from "react";
import {
  File as FileIcon,
  Loader2,
  Trash2,
  UploadCloud,
  AlertCircle,
} from "lucide-react";
import { api, apiErrorMessage } from "../../../lib/api";

export interface ManagedFile {
  id: number;
  file: string | null;
  name: string;
  uploaded_at: string;
}

/**
 * Lets an Admin add or remove any number of files/images on an existing
 * Project or Certificate, independently of the rest of that item's form —
 * each add/remove is its own immediate request, so nothing here is lost
 * or needs to wait for a separate "Save" click.
 *
 * `uploadUrl` — e.g. `/admin/projects/42/files/` (POST, field `files`,
 * repeatable for multiple at once).
 * `deleteUrlBase` — e.g. `/admin/project-files/` (DELETE `${base}${id}/`).
 */
const AdminFileManager = ({
  files,
  uploadUrl,
  deleteUrlBase,
  onChange,
  accentColor = "blue",
}: {
  files: ManagedFile[];
  uploadUrl: string;
  deleteUrlBase: string;
  onChange: (files: ManagedFile[]) => void;
  accentColor?: "blue" | "cyan";
}) => {
  const [uploading, setUploading] = useState(false);
  const [removingId, setRemovingId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const dropzoneClasses =
    accentColor === "cyan"
      ? "flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-xs text-gray-500 hover:border-cyan-300 hover:text-cyan-600"
      : "flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 bg-white px-3 py-2 text-xs text-gray-500 hover:border-blue-300 hover:text-blue-600";

  const handleAdd = async (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;
    const form = new FormData();
    Array.from(fileList).forEach((f) => form.append("files", f));

    setUploading(true);
    setError("");
    try {
      const response = await api.post<ManagedFile[]>(uploadUrl, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onChange([...response.data, ...files]);
    } catch (err) {
      setError(apiErrorMessage(err, "Unable to add these files."));
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = async (fileId: number) => {
    setRemovingId(fileId);
    setError("");
    try {
      await api.delete(`${deleteUrlBase}${fileId}/`);
      onChange(files.filter((f) => f.id !== fileId));
    } catch (err) {
      setError(apiErrorMessage(err, "Unable to remove this file."));
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3">
      <p className="mb-2 text-xs font-semibold text-gray-600">
        Files &amp; images ({files.length})
      </p>

      {error && (
        <p className="mb-2 flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-2.5 py-1.5 text-xs text-red-700">
          <AlertCircle className="h-3.5 w-3.5 flex-shrink-0" />
          {error}
        </p>
      )}

      {files.length > 0 && (
        <ul className="mb-2 space-y-1.5">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center justify-between gap-2 rounded-lg bg-gray-50 px-2.5 py-1.5 text-xs text-gray-700"
            >
              <span className="flex min-w-0 items-center gap-1.5">
                <FileIcon className="h-3.5 w-3.5 flex-shrink-0 text-gray-400" />
                <span className="truncate">{f.name}</span>
              </span>
              <button
                type="button"
                onClick={() => handleRemove(f.id)}
                disabled={removingId === f.id}
                className="flex-shrink-0 rounded p-1 text-gray-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                aria-label={`Remove ${f.name}`}
                title="Remove"
              >
                {removingId === f.id ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            </li>
          ))}
        </ul>
      )}

      <label className={dropzoneClasses}>
        {uploading ? (
          <Loader2 className="h-3.5 w-3.5 flex-shrink-0 animate-spin" />
        ) : (
          <UploadCloud className="h-3.5 w-3.5 flex-shrink-0" />
        )}
        {uploading ? "Uploading..." : "Add files or images"}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.ppt,.pptx,.zip"
          className="hidden"
          disabled={uploading}
          onChange={(e) => handleAdd(e.target.files)}
        />
      </label>
    </div>
  );
};

export default AdminFileManager;
