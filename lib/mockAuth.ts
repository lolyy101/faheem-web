import { login as loginAPI, register as registerAPI, getMe } from "./api";

export type UserRole = "user" | "admin" | "support";

export type MockUser = {
  name: string;
  email: string;
  password: string;
  phone?: string;
  role: UserRole;
};

type SessionUser = {
  user_id: number;
  name: string;
  email: string;
  phone?: string;
  role: string;
};

const TOKEN_KEY = "faheem_token";
const SESSION_KEY = "faheem_current_user";

function saveSession(user: SessionUser) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}

export async function registerMockUser(user: MockUser) {
  const body = {
    full_name: user.name,
    email: user.email.trim().toLowerCase(),
    password: user.password,
    role:
      user.role === "admin"
        ? "ADMIN"
        : user.role === "support"
        ? "SUPPORT"
        : "DEAF_USER",
  };

  const data = await registerAPI(body);

  if (data?.message && data.message !== "User registered successfully") {
    throw new Error(data.message);
  }

  return data;
}

export async function loginMockUser(email: string, password: string) {
  const data = await loginAPI({
    email: email.trim().toLowerCase(),
    password,
  });

  if (!data?.token) {
    throw new Error(data?.message || "البريد الإلكتروني أو كلمة المرور غير صحيحة");
  }

  localStorage.setItem(TOKEN_KEY, data.token);

  const me = await getMe(data.token);

  if (!me || !me.email || !me.user_id) {
    throw new Error("تعذر جلب بيانات المستخدم");
  }

  const sessionUser: SessionUser = {
    user_id: me.user_id,
    name: me.full_name,
    email: me.email,
    role: me.role,
    phone: "",
  };

  saveSession(sessionUser);

  return sessionUser;
}

export function logoutMockUser() {
  clearSession();
}

export function getCurrentMockUser() {
  if (typeof window === "undefined") return null;

  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
}

export function userExistsByEmail(email: string) {
  const currentUser = getCurrentMockUser();

  if (!currentUser) return false;

  return currentUser.email?.trim().toLowerCase() === email.trim().toLowerCase();
}