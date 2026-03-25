const COOKIE_NAME = "museum_admin_session";
const COOKIE_VALUE = "authorized";

export function getAdminCookieName() {
  return COOKIE_NAME;
}

export function createAdminSessionValue() {
  return COOKIE_VALUE;
}

export function verifyAdminSessionValue(value: string | undefined) {
  return value === COOKIE_VALUE;
}

export function checkAdminCredentials(login: string, password: string) {
  return (
    login === (process.env.ADMIN_LOGIN || "admin") &&
    password === (process.env.ADMIN_PASSWORD || "12345678")
  );
}