"use client";

import {
  Bell,
  ChevronLeft,
  Menu,
  User,
  Headphones,
  Mail,
  LogOut,
  Award,
} from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logoutMockUser } from "@/lib/mockAuth";

type Props = {
  children: ReactNode;
  showTop?: boolean;
  notificationsHref?: string;
  backHref?: string;
};

type CurrentUser = {
  name?: string;
  full_name?: string;
  email?: string;
  phone?: string;
  role?: string;
};

export default function MobileChrome({
  children,
  showTop = true,
  notificationsHref = "/notifications",
  backHref,
}: Props) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

  useEffect(() => {
    const storedUser =
      localStorage.getItem("user") ||
      localStorage.getItem("currentUser") ||
      localStorage.getItem("faheem_user");

    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch {
        setCurrentUser(null);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("faheem_user");
    localStorage.removeItem("token");
    logoutMockUser();
    router.push("/");
  };

  const role = currentUser?.role?.toUpperCase();

  const isUser = role === "NORMAL_USER" || role === "DEAF_USER";

  return (
    <main className="faheem-page">
      <section className="mobile-frame">
        <div className="screen-content" dir="rtl">
          {showTop && (
            <div className="topbar-new">
              <div className="topbar-actions">
                <button
                  onClick={() => {
                    if (backHref) router.push(backHref);
                    else router.back();
                  }}
                  className="top-icon-btn"
                  type="button"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={() => router.push(notificationsHref)}
                  className="top-icon-btn"
                  type="button"
                >
                  <Bell size={20} />
                </button>
              </div>

              <button
                className="top-icon-btn"
                onClick={() => setMenuOpen(true)}
                type="button"
              >
                <Menu size={22} />
              </button>
            </div>
          )}

          {children}
        </div>

        {menuOpen && (
          <>
            <div className="menu-overlay" onClick={() => setMenuOpen(false)} />

            <div className="side-menu">
              <div className="menu-header">القائمة</div>

              <div className="menu-items">
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/profile");
                  }}
                  type="button"
                >
                  <User size={18} />
                  الملف الشخصي
                </button>

                {isUser && (
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      router.push("/achievements");
                    }}
                    type="button"
                  >
                    <Award size={18} />
                    الإنجازات
                  </button>
                )}

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    if (role === "SUPPORT") {
                      router.push("/admin/support");
                    } else {
                      router.push("/contact");
                    }
                  }}
                  type="button"
                >
                  <Headphones size={18} />
                  الدعم الفني
                </button>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    router.push("/contact");
                  }}
                  type="button"
                >
                  <Mail size={18} />
                  تواصل معنا
                </button>

                <button onClick={handleLogout} type="button">
                  <LogOut size={18} />
                  تسجيل الخروج
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}