const TOKEN_KEY = "porta_token";
const USER_EMAIL_KEY = "porta_user_email";

export function getToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export function getUserEmail(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(USER_EMAIL_KEY);
}

export function setUserEmail(email: string): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(USER_EMAIL_KEY, email);
}

export function removeUserEmail(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(USER_EMAIL_KEY);
}

export function clearAuth(): void {
  removeToken();
  removeUserEmail();
}
