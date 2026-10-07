import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import type { ReactNode } from "react";
import {
  api,
  storeTokens,
  clearTokens,
  getAccessToken,
  apiErrorMessage,
} from "../../../lib/api";

export type PortalRole = "student" | "admin";

export interface PortalUser {
  id: number;
  phone_number: string;
  full_name: string;
  role: PortalRole;
}

interface LoginResult {
  success: boolean;
  message?: string;
  redirect?: string;
}

interface PortalAuthContextValue {
  user: PortalUser | null;
  role: PortalRole | null;
  isAuthenticated: boolean;
  /** True until the initial session-restore check (on page load /
   * refresh) has finished — lets protected routes avoid a flash-redirect
   * to the login page before we've had a chance to check for a stored
   * token. */
  isInitializing: boolean;
  /** Student login — phone number + captcha, no password. */
  login: (
    phoneNumber: string,
    captchaKey: string,
    captchaValue: string,
    rememberMe: boolean,
  ) => Promise<LoginResult>;
  /** Admin login step 1 — confirms the phone number belongs to an Admin
   * account before the password field is shown. Does not sign anyone
   * in. */
  checkAdminPhone: (phoneNumber: string) => Promise<LoginResult>;
  /** Admin login step 2 — phone number (already confirmed) + password. */
  adminLogin: (
    phoneNumber: string,
    password: string,
    rememberMe: boolean,
  ) => Promise<LoginResult>;
  /** Admin Dashboard -> Settings -> Change Password (and/or phone
   * number). Verifies the CURRENT phone number + password server-side
   * before writing anything; leave `newPassword` blank to change only
   * the phone number, or leave `newPhoneNumber` equal to the current one
   * to change only the password. */
  changeAdminCredentials: (
    currentPhoneNumber: string,
    currentPassword: string,
    newPhoneNumber: string,
    newPassword: string,
  ) => Promise<LoginResult>;
  logout: () => void;
}

const PortalAuthContext = createContext<PortalAuthContextValue | undefined>(
  undefined,
);

/**
 * Single auth context for BOTH Students and Admins — there is only one
 * login form and one account model on the backend (PortalUser, role =
 * "student" | "admin"). The role is never chosen on the frontend; it
 * comes back from the server on login (and on session restore via
 * /auth/me/) and drives which dashboard the person is sent to and which
 * protected routes (see RequireRole.tsx) they can reach.
 */
export const PortalAuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<PortalUser | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);

  // On first load (including a hard refresh), if a token was saved from a
  // previous visit, verify it's still valid and restore the session —
  // otherwise the person would be bounced to the login page on every
  // reload even though they're still logged in.
  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      if (!getAccessToken()) {
        setIsInitializing(false);
        return;
      }
      try {
        const res = await api.get<PortalUser>("/auth/me/");
        if (!cancelled) setUser(res.data);
      } catch {
        clearTokens();
      } finally {
        if (!cancelled) setIsInitializing(false);
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(
    async (
      phoneNumber: string,
      captchaKey: string,
      captchaValue: string,
      rememberMe: boolean,
    ): Promise<LoginResult> => {
      try {
        const res = await api.post("/auth/login/", {
          phone_number: phoneNumber,
          captcha_key: captchaKey,
          captcha_value: captchaValue,
        });
        const { access, refresh, redirect } = res.data;
        storeTokens(access, refresh, rememberMe);
        const me = await api.get<PortalUser>("/auth/me/");
        setUser(me.data);

        return { success: true, redirect };
      } catch (error) {
        return {
          success: false,
          message: apiErrorMessage(error, "Unable to sign in. Please try again."),
        };
      }
    },
    [],
  );

  const logout = useCallback(() => {
    clearTokens();
    setUser(null);
  }, []);

  const checkAdminPhone = useCallback(
    async (phoneNumber: string): Promise<LoginResult> => {
      try {
        await api.post("/auth/admin/check-phone/", {
          phone_number: phoneNumber,
        });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: apiErrorMessage(
            error,
            "No Admin account found with that phone number.",
          ),
        };
      }
    },
    [],
  );

  const adminLogin = useCallback(
    async (
      phoneNumber: string,
      password: string,
      rememberMe: boolean,
    ): Promise<LoginResult> => {
      try {
        const res = await api.post("/auth/admin/login/", {
          phone_number: phoneNumber,
          password,
        });
        const { access, refresh, redirect } = res.data;
        storeTokens(access, refresh, rememberMe);

        const me = await api.get<PortalUser>("/auth/me/");
        setUser(me.data);

        return { success: true, redirect };
      } catch (error) {
        return {
          success: false,
          message: apiErrorMessage(
            error,
            "Incorrect phone number or password.",
          ),
        };
      }
    },
    [],
  );

  const changeAdminCredentials = useCallback(
    async (
      currentPhoneNumber: string,
      currentPassword: string,
      newPhoneNumber: string,
      newPassword: string,
    ): Promise<LoginResult> => {
      try {
        const res = await api.post<PortalUser>(
          "/auth/admin/change-credentials/",
          {
            current_phone_number: currentPhoneNumber,
            current_password: currentPassword,
            new_phone_number: newPhoneNumber,
            new_password: newPassword,
          },
        );
        // The server returns the updated account — keep the in-memory
        // session (e.g. the phone number shown elsewhere in the UI) in
        // sync without forcing a re-login. The JWT itself doesn't
        // encode the password, so the existing access token stays valid.
        setUser(res.data);
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: apiErrorMessage(
            error,
            "Unable to update your credentials.",
          ),
        };
      }
    },
    [],
  );

  return (
    <PortalAuthContext.Provider
      value={{
        user,
        role: user?.role ?? null,
        isAuthenticated: !!user,
        isInitializing,
        login,
        checkAdminPhone,
        adminLogin,
        changeAdminCredentials,
        logout,
      }}
    >
      {children}
    </PortalAuthContext.Provider>
  );
};

export function usePortalAuth(): PortalAuthContextValue {
  const ctx = useContext(PortalAuthContext);
  if (!ctx) {
    throw new Error("usePortalAuth must be used within a PortalAuthProvider");
  }
  return ctx;
}
