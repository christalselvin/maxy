import { useCallback, useRef, useState } from "react";
import type { FilePreview, PreviewOutcome } from "../utils/preview";

/**
 * Shared "open a file in the preview modal" state/behaviour, used by both
 * ProjectCard and CertificateCard so loading, error handling, and object
 * URL cleanup behave identically everywhere a preview can be opened.
 *
 * `key` identifies *which* attachment is currently loading (a file id,
 * or the parent project/certificate id for the legacy single-file case)
 * so a card with several attachments can show a spinner on just the one
 * button that was clicked.
 */
export function useFilePreview() {
  const [preview, setPreview] = useState<FilePreview | null>(null);
  // The key passed to `open()` for the preview currently loading OR
  // shown — lets a card (a) put a spinner on just the one button that
  // was clicked, and (b) know afterward which attachment the open modal
  // belongs to (e.g. to wire up its Download button).
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Guards against a slow, since-abandoned fetch overwriting the modal
  // after a newer preview (or a close) has already happened.
  const requestId = useRef(0);

  const open = useCallback(
    async (key: string, loader: () => Promise<PreviewOutcome>) => {
      const thisRequest = ++requestId.current;
      setActiveKey(key);
      setLoading(true);
      setError("");
      const { preview: result, error: err } = await loader();
      if (thisRequest !== requestId.current) {
        // Superseded — discard this result (and the blob URL it made, if
        // any) rather than showing a stale preview.
        if (result) URL.revokeObjectURL(result.url);
        return;
      }
      setLoading(false);
      if (result) {
        setPreview(result);
      } else if (err) {
        setActiveKey(null);
        setError(err);
      }
    },
    [],
  );

  const close = useCallback(() => {
    requestId.current += 1;
    setActiveKey(null);
    setPreview((current) => {
      if (current) URL.revokeObjectURL(current.url);
      return null;
    });
  }, []);

  return {
    preview,
    activeKey,
    // A button should show its own spinner only while its key is both
    // active and still loading (i.e. before `preview` arrives).
    loadingKey: loading ? activeKey : null,
    error,
    open,
    close,
  };
}
