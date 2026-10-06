import { API_BASE_URL } from "@/lib/config";
import { clearAuth, getToken } from "@/lib/auth";

export async function apiFetch(
  path: string,
  init: RequestInit = {},
): Promise<Response> {
  const url = path.startsWith("http") ? path : `${API_BASE_URL}${path}`;
  const headers = new Headers(init.headers ?? {});

  if (
    !(init.body instanceof FormData) &&
    !headers.has("Content-Type") &&
    init.body !== undefined &&
    !(init.body instanceof URLSearchParams)
  ) {
    headers.set("Content-Type", "application/json");
  }

  const token = getToken();

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...init,
    headers,
  });

  if (response.status === 401) {
    clearAuth();

    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  }

  return response;
}

export async function apiJson<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const response = await apiFetch(path, init);

  const payload = (await response.json().catch(() => ({}))) as Partial<T> & {
    message?: string;
  };

  if (!response.ok) {
    const message =
      typeof payload.message === "string"
        ? payload.message
        : "Request failed";

    throw new Error(message);
  }

  return payload as T;
}
