import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import {
  KeyRound,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { usePortalAuth } from "./context/PortalAuthContext";

/**
 * Admin Dashboard -> Settings -> Change Password and phone number.
 *
 * The Admin must re-enter their CURRENT password and CURRENT phone
 * number — both are verified server-side (Backend/portal.py,
 * POST /api/auth/admin/change-credentials/) before anything is written
 * to PostgreSQL. The new password is hashed there with the same
 * Werkzeug helper every other password in this app uses; it never
 * reaches storage as plaintext. Once saved, the Admin signs in with the
 * new password / phone number from here on.
 */
const AdminSettings = () => {
  const { user, changeAdminCredentials } = usePortalAuth();

  const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState(
    user?.phone_number ?? "",
  );
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!currentPhoneNumber.trim() || !currentPassword) {
      setError("Enter your current phone number and password to continue.");
      return;
    }

    const changingPassword = newPassword.length > 0;
    const changingPhone =
      newPhoneNumber.trim() !== (user?.phone_number ?? "").trim();

    if (!changingPassword && !changingPhone) {
      setError(
        "Enter a new password and/or a new phone number to update — or leave both unchanged to cancel.",
      );
      return;
    }

    if (changingPassword) {
      if (newPassword.length < 8) {
        setError("New password must be at least 8 characters.");
        return;
      }
      if (newPassword !== confirmNewPassword) {
        setError("New password and confirmation do not match.");
        return;
      }
    }

    if (changingPhone && !newPhoneNumber.trim()) {
      setError("New phone number cannot be empty.");
      return;
    }

    setSubmitting(true);
    try {
      const result = await changeAdminCredentials(
        currentPhoneNumber,
        currentPassword,
        newPhoneNumber,
        newPassword,
      );

      if (result.success) {
        setSuccess(
          "Your credentials were updated. Use the new password/phone number next time you sign in.",
        );
        setCurrentPhoneNumber("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmNewPassword("");
      } else {
        setError(result.message ?? "Unable to update your credentials.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <KeyRound className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Settings</h2>
          <p className="text-sm text-gray-500">
            Change your Admin password and phone number.
          </p>
        </div>
      </div>

      <div className="mt-6 max-w-xl rounded-2xl border border-blue-200 bg-blue-50/40 p-5">
        <h4 className="mb-4 flex items-center gap-1.5 text-sm font-bold text-gray-900">
          <ShieldCheck className="h-4 w-4 text-blue-600" />
          Change Password and Phone Number
        </h4>

        {error && (
          <p className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            {error}
          </p>
        )}
        {success && (
          <p className="mb-4 flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              Verify it's you
            </p>
            <div className="space-y-3">
              <input
                type="text"
                required
                value={currentPhoneNumber}
                onChange={(e) => setCurrentPhoneNumber(e.target.value)}
                placeholder="Current phone number"
                autoComplete="off"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <div className="relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  required
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="Current password"
                  autoComplete="current-password"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                  aria-label={
                    showCurrentPassword ? "Hide password" : "Show password"
                  }
                >
                  {showCurrentPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              New details
            </p>
            <div className="space-y-3">
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                placeholder="New phone number, e.g. +919876543210"
                autoComplete="off"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="New password (min. 8 characters)"
                  autoComplete="new-password"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                  aria-label={
                    showNewPassword ? "Hide password" : "Show password"
                  }
                >
                  {showNewPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirm new password"
                autoComplete="new-password"
                className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <p className="mt-2 text-xs text-gray-400">
              Leave the password fields blank to change only the phone
              number, or leave the phone number as-is to change only the
              password.
            </p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
