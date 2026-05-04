"use client";

import {
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { UserRole } from "@/lib/mockAuth";

export default function ArabicLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const role = (searchParams.get("role") || "user") as UserRole;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roleConfig = useMemo(() => {
    if (role === "admin") {
      return {
        title: "تسجيل دخول الأدمن",
        subtitle: "سجل الدخول كمدير نظام للوصول إلى لوحة الإدارة.",
      };
    }

    if (role === "support") {
      return {
        title: "تسجيل دخول الدعم الفني",
        subtitle: "سجل الدخول كدعم فني للوصول إلى تذاكر الدعم.",
      };
    }

    return {
      title: "تسجيل دخول المستخدم",
      subtitle: "سجل الدخول كمستخدم للوصول إلى أدواتك الذكية.",
    };
  }, [role]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const normalizedEmail = email.trim().toLowerCase();
      const normalizedPassword = password.trim();

      if (!normalizedEmail || !normalizedPassword) {
        throw new Error("يرجى إدخال البريد الإلكتروني وكلمة المرور");
      }

      if (!normalizedEmail.includes("@")) {
        throw new Error("يجب أن يحتوي البريد الالكتروني على @");
      }

      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password: normalizedPassword
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("البريد الالكتروني أو كلمة المرور غير صحيحة");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      const normalizedRole =
        data.user.role === "ADMIN"
          ? "admin"
          : data.user.role === "SUPPORT"
          ? "support"
          : "user";

      if (normalizedRole !== role) {
        throw new Error("هذا الحساب غير مصرح له بالدخول من هذه البوابة");
      }

      if (normalizedRole === "admin") {
        router.push("/admin/dashboard");
      } else if (normalizedRole === "support") {
        router.push("/admin/support");
      } else {
        router.push("/home");
      }
    } catch (err: any) {
      setError(err?.message || "فشل تسجيل الدخول");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleLogin();
    }
  };

  return (
    <main className="faheem-page">
      <section className="mobile-frame">
        <div className="screen-content login-mobile-screen" dir="rtl">
          <div className="login-mobile-header">
            <div className="login-mobile-badge">
              <Sparkles size={13} />
              {roleConfig.title}
            </div>

            <div className="login-logo-wrap">
              <div className="login-logo-glow" />
              <img src="/logo.png" alt="Faheem" className="login-logo" />
            </div>

            <div className="login-mobile-icon-wrap">
              <div className="login-mobile-icon-glow" />
              <div className="login-mobile-icon">
                <ShieldCheck size={24} />
              </div>
            </div>

            <h1 className="login-mobile-title">تسجيل الدخول</h1>

            <p className="login-mobile-subtitle">{roleConfig.subtitle}</p>
          </div>

          <div className="login-mobile-card">
            <div className="login-mobile-field">
              <label className="login-mobile-label">البريد الإلكتروني</label>

              <div className="login-mobile-input-wrap">
                <div className="login-mobile-input-icon">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>

            <div className="login-mobile-field">
              <label className="login-mobile-label">كلمة المرور</label>

              <div className="login-mobile-input-wrap">
                <div className="login-mobile-input-icon">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  placeholder="***************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
            </div>
             <button
              type="button"
              className="forgot-password-link"
              onClick={() => router.push("/forgot-password")}
                >
                  نسيت كلمة المرور؟
              </button>
            </div>

            {error ? <div className="login-mobile-error">{error}</div> : null}

            <button
              className="login-mobile-btn"
              onClick={handleLogin}
              disabled={loading}
              type="button"
            >
              {loading ? "جاري الدخول..." : "تسجيل الدخول"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}