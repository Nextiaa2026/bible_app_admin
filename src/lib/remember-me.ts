const REMEMBER_ME_KEY = "admin_remember_me";
const REMEMBER_EMAIL_KEY = "admin_remember_email";

export function getRememberedEmail(): string {
  if (typeof window === "undefined") return "";
  if (localStorage.getItem(REMEMBER_ME_KEY) !== "true") return "";
  return localStorage.getItem(REMEMBER_EMAIL_KEY) ?? "";
}

export function getRememberMe(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(REMEMBER_ME_KEY) === "true";
}

export function saveRememberMe(email: string, remember: boolean) {
  if (remember) {
    localStorage.setItem(REMEMBER_ME_KEY, "true");
    localStorage.setItem(REMEMBER_EMAIL_KEY, email);
  } else {
    clearRememberMe();
  }
}

export function clearRememberMe() {
  localStorage.removeItem(REMEMBER_ME_KEY);
  localStorage.removeItem(REMEMBER_EMAIL_KEY);
}
