"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import {
  Globe,
  Lock,
  Moon,
  Pencil,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { getCurrentMockUser, logoutMockUser } from "@/lib/mockAuth";

export default function ProfilePage() {
  const router = useRouter();
  const currentUser = getCurrentMockUser();

  const handleLogout = () => {
    logoutMockUser();
    router.push("/");
  };

  return (
    <MobileChrome>
      <div className="profile-mobile-screen" dir="rtl">
        <div className="profile-mobile-header">
          <div className="profile-mobile-badge">
            <Sparkles size={13} />
            الملف الشخصي
          </div>

          <div className="profile-mobile-avatar-wrap">
            <div className="profile-mobile-avatar-glow" />
            <div className="profile-mobile-avatar">
              <User size={50} strokeWidth={1.8} />
            </div>
          </div>

          <div className="profile-mobile-name">
            {currentUser?.name || "اسم المستخدم"}
          </div>

          <div className="profile-mobile-email">
            {currentUser?.email || "email@example.com"}
          </div>

          <div className="profile-mobile-edit-chip">
            <Pencil size={15} />
            تعديل الملف
          </div>
        </div>

        <div className="profile-mobile-card">
          <div className="profile-mobile-section">
            <div className="profile-mobile-section-title">
              <Lock size={17} />
              تغيير كلمة المرور
            </div>

            <div className="profile-mobile-input-placeholder">
              ***************
            </div>
          </div>

          <div className="profile-mobile-divider" />

          <div className="profile-mobile-section">
            <div className="profile-mobile-section-title">
              <Globe size={17} />
              اللغة
            </div>

            <div className="profile-mobile-language-grid">
              <div className="profile-mobile-language-card active">عربي</div>
              <div className="profile-mobile-language-card">English</div>
            </div>
          </div>

          <div className="profile-mobile-divider" />

          <div className="profile-mobile-section">
            <div className="profile-mobile-toggle-row">
              <div className="profile-mobile-section-title no-margin">
                <ShieldCheck size={17} />
                الإشعارات
              </div>

              <div className="profile-mobile-toggle active">
                <div className="profile-mobile-toggle-knob" />
              </div>
            </div>
          </div>

          <div className="profile-mobile-divider" />

          <div className="profile-mobile-section">
            <div className="profile-mobile-section-title">اختيار الواجهة</div>

            <div className="profile-mobile-theme-grid">
              <div className="profile-mobile-theme-card">
                <Sun size={22} />
                <div>الوضع العادي</div>
              </div>

              <div className="profile-mobile-theme-card active">
                <Moon size={22} />
                <div>الوضع الداكن</div>
              </div>
            </div>
          </div>
        </div>

        <button className="profile-mobile-logout" onClick={handleLogout}>
          <LogOut size={18} />
          تسجيل الخروج
        </button>
      </div>
    </MobileChrome>
  );
}