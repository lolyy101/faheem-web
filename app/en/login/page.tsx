"use client";

import Link from "next/link";
import {
  ArrowRight,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api";
import { UserRole } from "@/lib/mockAuth";

export default function EnglishLoginPage() {
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
        title: "Administrator Login",
        subtitle: "Sign in as System Administrator to manage the platform.",
      };
    }

    if (role === "support") {
      return {
        title: "Technical Support Login",
        subtitle: "Sign in as Technical Support to manage support tickets.",
      };
    }

    return {
      title: "User Login",
      subtitle: "Sign in as User to access your smart tools and features.",
    };
  }, [role]);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await login({
        email: email.trim().toLowerCase(),
        password,
      });

      if (!res?.token) {
        throw new Error(res?.message || "Login failed");
      }

      localStorage.setItem("token", res.token);

      if (role === "admin") {
        router.push("/admin/dashboard");
      } else if (role === "support") {
        router.push("/admin/support");
      } else {
        router.push("/home");
      }
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="epic-login-page">
      <section className="epic-login-phone">
        <div className="epic-login-content" dir="ltr">
          <div className="epic-login-topbar">
            <Link href="/en" className="epic-login-back">
              <ArrowRight size={18} />
            </Link>

            <div className="epic-login-mini-badge">
              <ShieldCheck size={13} />
              Secure Access
            </div>
          </div>

          <div className="epic-login-header">
            <div className="epic-login-badge">
              <Sparkles size={14} />
              {roleConfig.title}
            </div>

            <h1 className="epic-login-title">Welcome Back</h1>

            <p className="epic-login-subtitle">{roleConfig.subtitle}</p>
          </div>

          <div className="epic-login-card">
            <div className="epic-login-card-glow" />

            <div className="epic-login-field">
              <label className="epic-login-label">Email</label>

              <div className="epic-login-input-wrap">
                <Mail size={18} className="epic-login-input-icon left" />
                <input
                  type="email"
                  className="epic-login-input ltr"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="epic-login-field">
              <label className="epic-login-label">Password</label>

              <div className="epic-login-input-wrap">
                <Lock size={18} className="epic-login-input-icon left" />
                <input
                  type="password"
                  className="epic-login-input ltr"
                  placeholder="****************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="epic-login-forgot en">
              <Link href="/forgot-password">Forgot Your Password?</Link>
            </div>

            {error && <div className="epic-login-error">{error}</div>}

            <button
              className="epic-login-submit"
              onClick={handleLogin}
              disabled={loading}
              type="button"
            >
              {loading ? "Signing in..." : "Log In"}
            </button>

            <div className="epic-login-divider">
              <div className="epic-login-divider-line" />
              <div className="epic-login-divider-badge">
                OR CONTINUE WITH
              </div>
              <div className="epic-login-divider-line" />
            </div>

            <div className="epic-login-socials">
              <button className="epic-login-social-btn" type="button">
                Google
              </button>
              <button className="epic-login-social-btn" type="button">
                Apple
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}