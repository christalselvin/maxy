import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

/**
 * API base URL for the Student Portal backend (Flask — see
 * Backend/portal.py). Set VITE_PORTAL_API_BASE_URL in vite-project/.env
 * to point at a different host (defaults to the local dev server started
 * by `python app.py` — see Backend/README or the repo root README for
 * setup).
 *
 * Deliberately a different variable from VITE_API_BASE_URL, which the
 * site's Blog feature also uses (src/pages/api/api.ts). Both point at the
 * same Flask server today (it serves the Blog routes at the root and the
 * Student Portal routes under /api), but are kept as separate env vars in
 * case they ever need to point elsewhere.
 */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8000";

const ACCESS_TOKEN_KEY = "maxotechs_portal_access_token";
const REFRESH_TOKEN_KEY = "maxotechs_portal_refresh_token";

export function getAccessToken(): string | null {
  return (
    localStorage.getItem(ACCESS_TOKEN_KEY) ||
    sessionStorage.getItem(ACCESS_TOKEN_KEY)
  );
}

function getRefreshToken(): string | null {
  return (
    localStorage.getItem(REFRESH_TOKEN_KEY) ||
    sessionStorage.getItem(REFRESH_TOKEN_KEY)
  );
}

/** Persists a fresh token pair. `persist` picks localStorage (survives
 * browser restarts) vs sessionStorage (cleared when the tab closes) —
 * mirrors the login form's "Keep me signed in" checkbox. */
export function storeTokens(
  access: string,
  refresh: string,
  persist: boolean,
) {
  const store = persist ? localStorage : sessionStorage;
  const other = persist ? sessionStorage : localStorage;
  store.setItem(ACCESS_TOKEN_KEY, access);
  store.setItem(REFRESH_TOKEN_KEY, refresh);
  other.removeItem(ACCESS_TOKEN_KEY);
  other.removeItem(REFRESH_TOKEN_KEY);
}

export function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  sessionStorage.removeItem(REFRESH_TOKEN_KEY);
}

/** Updates just the access token in whichever storage currently holds the
 * session, after a successful silent refresh. */
function updateAccessToken(access: string) {
  if (localStorage.getItem(REFRESH_TOKEN_KEY)) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
  } else if (sessionStorage.getItem(REFRESH_TOKEN_KEY)) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
  }
}

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// On a 401 (expired access token), try exactly once to refresh it using
// the stored refresh token, then replay the original request. If the
// refresh itself fails, the tokens are cleared so ProtectedRoute-style
// guards correctly treat the person as logged out.
let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/refresh/`, {
      refresh: refreshToken,
    });
    const newAccess = response.data.access as string;
    updateAccessToken(newAccess);
    return newAccess;
  } catch {
    clearTokens();
    return null;
  }
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as
      | (InternalAxiosRequestConfig & { _retried?: boolean })
      | undefined;

    if (error.response?.status === 401 && original && !original._retried) {
      original._retried = true;

      if (!refreshPromise) {
        refreshPromise = refreshAccessToken().finally(() => {
          refreshPromise = null;
        });
      }

      const newAccess = await refreshPromise;
      if (newAccess) {
        original.headers = original.headers ?? {};
        original.headers.Authorization = `Bearer ${newAccess}`;
        return api(original);
      }
    }

    return Promise.reject(error);
  },
);

/** Extracts a human-readable message from the backend's error response
 * (`{"detail": "..."}` — see Backend/portal.py's `_err` helper — or
 * field-level validation errors). */
export function apiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data?.detail === "string") return data.detail;
    if (data && typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      const firstValue = firstKey ? data[firstKey] : null;
      if (Array.isArray(firstValue) && typeof firstValue[0] === "string") {
        return firstValue[0];
      }
    }
    if (error.code === "ERR_NETWORK") {
      return "Can't reach the server. Please check your connection and try again.";
    }
  }
  return fallback;
}
