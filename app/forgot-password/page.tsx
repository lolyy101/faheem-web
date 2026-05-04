
"use client";
import MobileChrome from "@/components/layout/MobileChrome";
import {
  ArrowLeft,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { forgotPassword } from "@/lib/api";
export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const handleSubmit = async () => {
    try {
      setStatus("جاري الإرسال...");
      if (!email.trim()) {
        setStatus("يرجى إدخال البريد الإلكتروني");
        return;
      }
      if (!email.includes("@")) {
        setStatus("يرجى إدخال بريد إلكتروني صحيح");
        return;
      }
      const res = await forgotPassword({
        email: email.trim().toLowerCase(),
      });
      setStatus("تم إرسال رابط الاسترجاع بنجاح يرجى فحص بريدك الالكتروني ");
      
     }
     catch (err: any) {
      setStatus(err?.response?.data?.message || "تعذر إرسال الرابط");
    }
  };
  return (
    <MobileChrome>
      <div className="forgot-mobile-screen" dir="rtl">
        <div className="forgot-mobile-header">
          <div className="forgot-mobile-badge">
            <Sparkles size={13} />
            استعادة الوصول
          </div>
          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>
          <div className="forgot-mobile-icon-wrap">
            <div className="forgot-mobile-icon-glow" />
            <div className="forgot-mobile-icon">
              <KeyRound size={24} />
            </div>
          </div>
          <h1 className="forgot-mobile-title">استرجاع كلمة المرور</h1>
          <p className="forgot-mobile-subtitle">
            أدخل بريدك الإلكتروني، وسنرسل لك رابطًا آمنًا لإعادة تعيين كلمة
            المرور.
          </p>
        </div>
        <div className="forgot-mobile-card">
          <div className="forgot-mobile-card-glow" />
          <div className="forgot-mobile-security-chip">
            <ShieldCheck size={13} />
            حماية آمنة
          </div>
          <div className="forgot-mobile-field">
            <label className="forgot-mobile-label">البريد الإلكتروني</label>
            <div className="forgot-mobile-input-wrap">
              <Mail size={18} />
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          {status ? (
            <div className="forgot-mobile-status">{status}</div>
          ) : null}
          <button className="forgot-mobile-btn" onClick={handleSubmit}>
            <span className="forgot-mobile-btn-inner">
              <ArrowLeft size={16} />
              إرسال الرابط
            </span>
          </button>
        </div>
      </div>
    </MobileChrome>
  );
}