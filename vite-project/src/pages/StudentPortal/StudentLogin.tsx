import { useState, useEffect, useCallback, useRef } from "react";
import type { FormEvent } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Lock,
  RefreshCw,
  AlertCircle,
  GraduationCap,
  FolderKanban,
  Award,
  ShieldCheck,
} from "lucide-react";
import logo from "../../assets/Home_Images/Logo/maxotech_logo.webp";
import { usePortalAuth } from "./context/PortalAuthContext";
import { api, apiErrorMessage } from "../../lib/api";

interface CaptchaChallenge {
  captcha_key: string;
  image_url: string;
}

const MIN_PHONE_DIGITS_TO_CHECK = 10;

const ROLE_CHECK_DEBOUNCE_MS = 450;

const StudentLogin = () => {
  const { login, checkAdminPhone, adminLogin, isAuthenticated, role } =
    usePortalAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [captcha, setCaptcha] = useState<CaptchaChallenge | null>(null);
  const [captchaLoading, setCaptchaLoading] = useState(true);
  const [captchaError, setCaptchaError] = useState("");
  const [captchaValue, setCaptchaValue] = useState("");
  const [phone, setPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [roleChecking, setRoleChecking] = useState(false);

  // --- Admin-only field, shown once the phone number above is
  // detected as an Admin account ---
  const [password, setPassword] = useState("");

  // --- Shared submit state ---
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const [rememberMe] = useState(true);

  const fetchCaptcha = useCallback(async () => {
    setCaptchaLoading(true);
    setCaptchaError("");
    setCaptchaValue("");
    try {
      const res = await api.get<CaptchaChallenge>("/auth/captcha/");
      setCaptcha(res.data);
    } catch (err) {
      setCaptchaError(
        apiErrorMessage(err, "Couldn't load the captcha. Please retry."),
      );
    } finally {
      setCaptchaLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  // Tracks the in-flight/most-recent role check so a slow response that
  // arrives after the person has kept typing can't clobber newer state.
  const roleCheckToken = useRef(0);

  // Auto-detect Admin vs Student from the phone number as it's typed.
  // Silent — a "no match" here just means "this is a Student", it's not
  // an error, so it never touches formError.
  useEffect(() => {
    const trimmedPhone = phone.trim();
    const digitCount = trimmedPhone.replace(/\D/g, "").length;

    // A new/changed number invalidates any password already entered for
    // whichever account was previously detected.
    setPassword("");

    if (digitCount < MIN_PHONE_DIGITS_TO_CHECK) {
      setIsAdmin(false);
      setRoleChecking(false);
      return;
    }

    setRoleChecking(true);
    const thisToken = ++roleCheckToken.current;

    const timer = setTimeout(async () => {
      const result = await checkAdminPhone(trimmedPhone);
      if (roleCheckToken.current === thisToken) {
        setIsAdmin(result.success);
        setRoleChecking(false);
      }
    }, ROLE_CHECK_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [phone, checkAdminPhone]);

  // Already signed in → skip the login form entirely and go straight to
  // the dashboard that matches this session's role.
  if (isAuthenticated && role) {
    const fallback =
      role === "admin" ? "/student-portal/admin" : "/student-portal/dashboard";
    const redirectTo =
      (location.state as { from?: { pathname?: string } })?.from?.pathname ||
      fallback;
    return <Navigate to={redirectTo} replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError("");

    const trimmedPhone = phone.trim();
    if (!trimmedPhone) {
      setFormError("Please enter your phone number.");
      return;
    }

    if (isAdmin) {
      if (!password) {
        setFormError("Please enter your password.");
        return;
      }

      setSubmitting(true);
      const result = await adminLogin(trimmedPhone, password, rememberMe);
      setSubmitting(false);

      if (result.success) {
        navigate(result.redirect || "/student-portal/admin", {
          replace: true,
        });
      } else {
        setFormError(result.message || "Incorrect phone number or password.");
      }
      return;
    }

    if (!captcha) {
      setFormError("Please wait for the captcha to load, or refresh it.");
      return;
    }
    if (!captchaValue.trim()) {
      setFormError("Please enter the code shown in the image.");
      return;
    }

    setSubmitting(true);
    const result = await login(
      trimmedPhone,
      captcha.captcha_key,
      captchaValue.trim(),
      rememberMe,
    );
    setSubmitting(false);

    if (result.success) {
      navigate(result.redirect || "/student-portal/dashboard", {
        replace: true,
      });
    } else {
      setFormError(result.message || "Unable to sign in. Please try again.");
      // The captcha is single-use server-side once a correct answer is
      // submitted (and may also have simply expired), so always fetch a
      // fresh one after any failed attempt rather than guessing whether
      // the old key is still valid.
      fetchCaptcha();
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 pb-12 pt-32 sm:pt-36 md:pt-40">
      {/* Decorative background blobs, consistent with site style */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="bubble xl absolute -top-16 -left-16 opacity-60 animate-floatSlow" />
        <div className="bubble md absolute bottom-10 right-10 opacity-50 animate-floatSlower" />
        <div className="bubble sm absolute top-1/3 right-1/4 opacity-40 animate-float" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-5xl grid overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5 lg:grid-cols-2"
      >
        {/* Left brand panel */}
        <div className="relative hidden flex-col justify-between bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 p-12 text-white lg:flex">
          <div
            className="pointer-events-none absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, #fff 0, transparent 40%)",
            }}
          />
          <div className="relative">
            <div className="flex items-center gap-3">
           <span className="text-2xl font-semibold tracking-tight">
                Student Portal
          </span>
           </div>

            <h1 className="mt-14 text-4xl font-bold leading-tight tracking-tight">
              Your academic journey,
              <br /> all in one place.
            </h1>
            <p className="mt-5 max-w-sm text-white/80 leading-relaxed">
              Track your course details, showcase your projects, and manage
              your certificates  securely and effortlessly.
            </p>
          </div>

          <div className="relative space-y-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/30">
                <GraduationCap className="h-4 w-4" />
              </div>
              <span className="text-sm text-white/85">
                View your college &amp; course details at a glance
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/30">
                <FolderKanban className="h-4 w-4" />
              </div>
              <span className="text-sm text-white/85">
                Showcase and manage your project portfolio
              </span>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/15 ring-1 ring-white/30">
                <Award className="h-4 w-4" />
              </div>
              <span className="text-sm text-white/85">
                Store and search all your certificates
              </span>
            </div>
          </div>
        </div>

        {/* Right form panel */}
        <div className="flex flex-col justify-center bg-white p-8 sm:p-12">
          <div className="mx-auto w-full max-w-sm">
            <div className="mb-8 flex items-center justify-center gap-3 lg:hidden">
              <img src={logo} alt="MaxoTechs" className="h-9 w-auto object-contain" />
              <span className="text-lg font-semibold text-gray-900">
                Student Portal
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p className="mt-2 text-sm text-gray-500">
              {isAdmin
                ? "Admin account detected. Enter your password to continue."
                : "Enter your phone number and the code below to continue."}
            </p>

            {formError && (
              <div className="mt-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                <AlertCircle className="mt-0.5 h-4.5 w-4.5 flex-shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-1.5 block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                    <Phone className="h-4.5 w-4.5" />
                  </span>
                  <input
                    id="phoneNumber"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    autoFocus
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-3 pl-11 pr-10 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
                  />
                  {roleChecking && (
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5">
                      <span className="h-3.5 w-3.5 rounded-full border-2 border-gray-200 border-t-blue-500 animate-spin" />
                    </span>
                  )}
                </div>

                {isAdmin && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium text-blue-600"
                  >
                    <ShieldCheck className="h-3.5 w-3.5 flex-shrink-0" />
                    Admin account detected
                  </motion.div>
                )}
              </div>

              <AnimatePresence mode="wait">
                {isAdmin ? (
                  <motion.div
                    key="password-field"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label
                      htmlFor="password"
                      className="mb-1.5 block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-gray-400">
                        <Lock className="h-4.5 w-4.5" />
                      </span>
                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        autoFocus
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full rounded-xl border border-gray-300 bg-gray-50/50 py-3 pl-11 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="captcha-field"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <label className="mb-1.5 block text-sm font-medium text-gray-700">
                      Enter the code shown below
                    </label>

                    <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-gray-50/50 p-2">
                      {captchaLoading ? (
                        <div className="flex h-[60px] w-[160px] flex-shrink-0 items-center justify-center rounded-lg bg-gray-100">
                          <div className="h-5 w-5 rounded-full border-2 border-blue-200 border-t-blue-600 animate-spin" />
                        </div>
                      ) : captcha ? (
                        <img
                          src={captcha.image_url}
                          alt="Captcha challenge"
                          className="h-[60px] w-[160px] flex-shrink-0 rounded-lg border border-gray-200 bg-white object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-[60px] w-[160px] flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-center text-[11px] text-gray-400">
                          {captchaError || "Captcha unavailable"}
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={fetchCaptcha}
                        disabled={captchaLoading}
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-blue-600 disabled:opacity-50"
                        aria-label="Refresh captcha"
                        title="Refresh captcha"
                      >
                        <RefreshCw
                          className={`h-4 w-4 ${captchaLoading ? "animate-spin" : ""}`}
                        />
                      </button>
                    </div>

                    <input
                      id="captchaValue"
                      type="text"
                      autoComplete="off"
                      value={captchaValue}
                      onChange={(e) => setCaptchaValue(e.target.value)}
                      placeholder="Type the characters above"
                      className="mt-3 w-full rounded-xl border border-gray-300 bg-gray-50/50 py-3 px-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                type="submit"
                disabled={
                  submitting || (!isAdmin && (captchaLoading || !captcha))
                }
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:shadow-blue-600/35 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100"
              >
                {submitting && (
                  <span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                )}
                {submitting ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-gray-500">
              Need help logging in?{" "}
              <a
                href="/contact"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Contact your admin office
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentLogin;
