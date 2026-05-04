"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Lock, ArrowLeft } from "lucide-react";

export default function ResetPasswordPage() {
  const params = useSearchParams();
  const router = useRouter();

  const token = params.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");

  const handleReset = async () => {
    try {
      setStatus("جاري التحديث...");

      if (!password || !confirmPassword) {
        setStatus("الرجاء تعبئة جميع الحقول");
        return;
      }

      if (password.length < 6) {
        setStatus("كلمة المرور لازم تكون 6 أحرف على الأقل");
        return;
      }

      if (password !== confirmPassword) {
        setStatus("كلمات المرور غير متطابقة");
        return;
      }

      const res = await fetch("http://localhost:8080/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword: password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setStatus("تم تغيير كلمة المرور بنجاح 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err: any) {
      setStatus(err.message || "حدث خطأ");
    }
  };

  return (
    <MobileChrome>
      <div className="forgot-mobile-screen" dir="rtl">
        <div className="forgot-mobile-header">
          <h1 className="forgot-mobile-title">تعيين كلمة مرور جديدة</h1>
          <p className="forgot-mobile-subtitle">
            أدخل كلمة مرور جديدة لحسابك
          </p>
        </div>

        <div className="forgot-mobile-card">
          <div className="forgot-mobile-field">
            <label className="forgot-mobile-label">كلمة المرور الجديدة</label>
            <div className="forgot-mobile-input-wrap">
              <Lock size={18} />
              <input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="forgot-mobile-field">
            <label className="forgot-mobile-label">تأكيد كلمة المرور</label>
            <div className="forgot-mobile-input-wrap">
              <Lock size={18} />
              <input
                type="password"
                placeholder="********"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {status && (
            <div className="forgot-mobile-status">{status}</div>
          )}

          <button className="forgot-mobile-btn" onClick={handleReset}>
            <span className="forgot-mobile-btn-inner">
              <ArrowLeft size={16} />
              حفظ كلمة المرور
            </span>
          </button>
        </div>
      </div>
    </MobileChrome>
  );
}