import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";

/** Use the local backend during development and same-origin routing in production. */
export const API_BASE_URL =
  import.meta.env.DEV
    ? (import.meta.env.VITE_API_BASE_URL || "http://localhost:8000")
    : "";

const ACCESS_TOKEN_KEY = "maxotechs_portal_access_token";
const REFRESH_TOKEN_KEY = "maxotechs_portal_refresh_token";

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY) || sessionStorage.getItem(ACCESS_TOKEN_KEY);
}

function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_TOKEN_KEY) || sessionStorage.getItem(REFRESH_TOKEN_KEY);
}

export function storeTokens(access: string, refresh: string, persist: boolean) {
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

function updateAccessToken(access: string) {
  if (localStorage.getItem(REFRESH_TOKEN_KEY)) localStorage.setItem(ACCESS_TOKEN_KEY, access);
  else if (sessionStorage.getItem(REFRESH_TOKEN_KEY)) sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
}

export const api = axios.create({ baseURL: `${API_BASE_URL}/api` });

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let refreshPromise: Promise<string | null> | null = null;

async function refreshAccessToken(): Promise<string | null> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;
  try {
    const response = await axios.post(`${API_BASE_URL}/api/auth/refresh/`, { refresh: refreshToken });
    const newAccess = response.data.access as string;
    updateAccessToken(newAccess);
    return newAccess;
  } catch {
    clearTokens();
    return null;
  }
}

api.interceptors.response.use((response) => response, async (error: AxiosError) => {
  const original = error.config as (InternalAxiosRequestConfig & { _retried?: boolean }) | undefined;
  if (error.response?.status === 401 && original && !original._retried) {
    original._retried = true;
    if (!refreshPromise) refreshPromise = refreshAccessToken().finally(() => { refreshPromise = null; });
    const newAccess = await refreshPromise;
    if (newAccess) {
      original.headers = original.headers ?? {};
      original.headers.Authorization = `Bearer ${newAccess}`;
      return api(original);
    }
  }
  return Promise.reject(error);
});

export function apiErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (typeof data?.detail === "string") return data.detail;
    if (data && typeof data === "object") {
      const firstKey = Object.keys(data)[0];
      const firstValue = firstKey ? data[firstKey] : null;
      if (Array.isArray(firstValue) && typeof firstValue[0] === "string") return firstValue[0];
    }
    if (error.code === "ERR_NETWORK") return "Cannot reach the server. Please check your connection and try again.";
  }
  return fallback;
}
