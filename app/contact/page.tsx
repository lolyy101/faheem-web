"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import {
  Headphones,
  Mail,
  MessageSquareText,
  Send,
  Sparkles,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getCurrentMockUser } from "@/lib/mockAuth";

type ContactForm = {
  name: string;
  email: string;
  requestType: string;
  message: string;
};

const SUPPORT_API_URL = "http://localhost:8080/api/support-tickets";

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>({
    name: "",
    email: "",
    requestType: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    try {
      const currentUser = getCurrentMockUser();

      if (!currentUser) return;

      setForm((prev) => ({
        ...prev,
        name: currentUser?.name || prev.name,
        email: currentUser?.email || prev.email,
      }));

      if (currentUser?.user_id) {
        setCurrentUserId(currentUser.user_id);
      }
    } catch (error) {
      console.error("Error loading current user:", error);
    }
  }, []);

  const handleChange = (key: keyof ContactForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("يرجى تعبئة الاسم والبريد والرسالة");
      return;
    }

    if (!currentUserId) {
      setStatus("تعذر تحديد المستخدم الحالي، يرجى تسجيل الدخول مرة أخرى");
      return;
    }

    try {
      setLoading(true);
      setStatus("");

      const res = await fetch(SUPPORT_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: currentUserId,
          issue_type: form.requestType.trim() || "دعم فني",
          description: form.message.trim(),
          status: "OPEN",
        }),
      });

      const text = await res.text();
      let data: any = {};

      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        setStatus(data.message || "تعذر إرسال التذكرة");
        return;
      }

      setStatus("تم إرسال التذكرة بنجاح ✅");

      setForm((prev) => ({
        ...prev,
        requestType: "",
        message: "",
      }));
    } catch (error) {
      console.error("Error submitting ticket:", error);
      setStatus("تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MobileChrome>
      <div className="contact-mobile-screen" dir="rtl">
        <div className="contact-mobile-header">
          <div className="contact-mobile-badge">
            <Sparkles size={13} />
            دعم وتواصل مباشر
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <div className="contact-mobile-icon-wrap">
            <div className="contact-mobile-icon-glow" />
            <div className="contact-mobile-icon">
              <Headphones size={24} />
            </div>
          </div>

          <h1 className="contact-mobile-title">تواصل معنا</h1>

          <p className="contact-mobile-subtitle">
            نحن هنا لمساعدتك. أرسل استفسارك أو مشكلتك وسيتولى فريق الدعم متابعة
            طلبك بأسرع وقت ممكن.
          </p>
        </div>

        <div className="contact-mobile-card">
          <div className="contact-mobile-card-glow" />

          <div className="contact-mobile-field">
            <label className="contact-mobile-label">الاسم</label>

            <div className="contact-mobile-input-wrap">
              <div className="contact-mobile-input-icon">
                <User size={18} />
              </div>

              <input
                className="contact-mobile-input"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="اكتب اسمك الكامل"
              />
            </div>
          </div>

          <div className="contact-mobile-field">
            <label className="contact-mobile-label">البريد الإلكتروني</label>

            <div className="contact-mobile-input-wrap">
              <div className="contact-mobile-input-icon">
                <Mail size={18} />
              </div>

              <input
                className="contact-mobile-input"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="contact-mobile-field">
            <label className="contact-mobile-label">نوع الطلب</label>

            <div className="contact-mobile-input-wrap">
              <div className="contact-mobile-input-icon">
                <MessageSquareText size={18} />
              </div>

              <input
                className="contact-mobile-input"
                value={form.requestType}
                onChange={(e) => handleChange("requestType", e.target.value)}
                placeholder="مثال: دعم فني / استفسار / مشكلة"
              />
            </div>
          </div>

          <div className="contact-mobile-field">
            <label className="contact-mobile-label">الرسالة</label>

            <div className="contact-mobile-textarea-wrap">
              <textarea
                className="contact-mobile-textarea"
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="اكتب رسالتك هنا بشكل واضح ومختصر"
              />
            </div>
          </div>

          {status ? <div className="contact-mobile-status">{status}</div> : null}

          <button
            className="contact-mobile-btn"
            onClick={handleSubmit}
            disabled={loading}
            type="button"
          >
            <span className="contact-mobile-btn-inner">
              <Send size={17} />
              {loading ? "جارٍ الإرسال..." : "إرسال الرسالة"}
            </span>
          </button>
        </div>
      </div>
    </MobileChrome>
  );
}