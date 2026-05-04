"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { KeyRound, Mail, Phone, Sparkles, User, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setMessage("");

      const full_name = form.name.trim();
      const email = form.email.trim().toLowerCase();
      const password = form.password.trim();

      if (!full_name || !email || !password) {
        setMessage("يرجى تعبئة الاسم والبريد وكلمة المرور");
        return;
      }

      if (!email.includes("@")) {
        setMessage("يرجى إدخال بريد إلكتروني صحيح");
        return;
      }

      await registerUser({
        full_name,
        email,
        password,
      });

      setMessage("تم إنشاء الحساب بنجاح 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err: any) {
      setMessage(err?.message || "فشل إنشاء الحساب");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileChrome showTop={false} backHref="/">
      <div className="signup-mobile-screen" dir="rtl">
        <div className="signup-mobile-header">
          <div className="signup-mobile-badge">
            <Sparkles size={13} />
            إنشاء حساب جديد
          </div>

          <div className="signup-logo-wrap">
            <div className="signup-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="signup-logo" />
          </div>

          <div className="signup-mobile-icon">
            <UserPlus size={26} />
          </div>

          <h1 className="signup-mobile-title">انضم إلى فهيم</h1>

          <p className="signup-mobile-subtitle">
            أنشئ حسابك الآن للوصول إلى أدوات التواصل الذكية، والدورات
            التعليمية، وتجربة استخدام متكاملة.
          </p>
        </div>

        <div className="signup-mobile-card">
          <div className="signup-mobile-glow" />

          <div className="signup-mobile-field">
            <label className="signup-mobile-label">الاسم</label>
            <div className="signup-mobile-input-wrap">
              <User size={18} />
              <input
                placeholder="اكتب اسمك الكامل"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
          </div>

          <div className="signup-mobile-field">
            <label className="signup-mobile-label">البريد الإلكتروني</label>
            <div className="signup-mobile-input-wrap">
              <Mail size={18} />
              <input
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
          </div>

          <div className="signup-mobile-field">
            <label className="signup-mobile-label">كلمة المرور</label>
            <div className="signup-mobile-input-wrap">
              <KeyRound size={18} />
              <input
                type="password"
                placeholder="*************"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
            </div>
          </div>

          <div className="signup-mobile-field">
            <label className="signup-mobile-label">رقم الهاتف</label>
            <div className="signup-mobile-input-wrap">
              <Phone size={18} />
              <input
                placeholder="05xxxxxxxx"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
              />
            </div>
          </div>

          {message ? <div className="signup-mobile-status">{message}</div> : null}

          <button
            className="signup-mobile-btn"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "جاري التسجيل..." : "إنشاء الحساب"}
          </button>
        </div>
      </div>
    </MobileChrome>
  );
}