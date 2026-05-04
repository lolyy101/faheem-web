"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { Bell, Clock3, Sparkles, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type NotificationItem = {
  title: string;
  subtitle: string;
  time: string;
  isNew: boolean;
};

type UserRole = "ADMIN" | "SUPPORT" | "USER";

export default function NotificationsPage() {
  const [role, setRole] = useState<UserRole>("USER");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const rawUser = localStorage.getItem("user");

    if (!rawUser) {
      setRole("USER");
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUser);
      const currentRole = String(parsedUser?.role || "USER").toUpperCase();

      if (currentRole === "ADMIN") {
        setRole("ADMIN");
      } else if (currentRole === "SUPPORT") {
        setRole("SUPPORT");
      } else {
        setRole("USER");
      }
    } catch {
      setRole("USER");
    }
  }, []);

  useEffect(() => {
    if (role === "ADMIN") {
      setNotifications([
        {
          title: "تمت إضافة دورة جديدة",
          subtitle: "تم تحديث مكتبة التعلم داخل المنصة",
          time: "منذ 20 دقيقة",
          isNew: true,
        },
        {
          title: "تم رفع ملف PDF جديد",
          subtitle: "محتوى جديد جاهز للتحويل إلى درس",
          time: "منذ ساعة",
          isNew: true,
        },
        {
          title: "تم تحديث المحتوى التعليمي",
          subtitle: "تم حفظ دروس جديدة داخل النظام",
          time: "منذ يوم",
          isNew: false,
        },
      ]);
      return;
    }

    if (role === "SUPPORT") {
      setNotifications([
        {
          title: "تم إنشاء تذكرة جديدة",
          subtitle: "يوجد بلاغ جديد يحتاج إلى المتابعة",
          time: "منذ 10 دقائق",
          isNew: true,
        },
        {
          title: "تذكرة قيد المعالجة",
          subtitle: "تم تحديث حالة أحد البلاغات إلى قيد المعالجة",
          time: "منذ ساعة",
          isNew: true,
        },
        {
          title: "تم حل بلاغ",
          subtitle: "تم إغلاق تذكرة دعم بنجاح",
          time: "منذ يوم",
          isNew: false,
        },
      ]);
      return;
    }

    setNotifications([
      {
        title: "تم إضافة درس جديد",
        subtitle: "أساسيات لغة الإشارة",
        time: "منذ ساعتين",
        isNew: true,
      },
      {
        title: "تم إصدار شهادتك",
        subtitle: "تهانينا! تم إكمال الدورة بنجاح",
        time: "منذ يوم",
        isNew: false,
      },
      {
        title: "تم تحسين الترجمة",
        subtitle: "أصبح عرض لغة الإشارة أكثر دقة الآن",
        time: "منذ أسبوع",
        isNew: false,
      },
    ]);
  }, [role]);

  const roleTitle = useMemo(() => {
    if (role === "ADMIN") return "تنبيهات الأدمن";
    if (role === "SUPPORT") return "تنبيهات الدعم الفني";
    return "تنبيهات المستخدم";
  }, [role]);

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <MobileChrome>
      <div className="notifications-mobile-screen" dir="rtl">
        <div className="notifications-mobile-header">
          <div className="notifications-mobile-badge">
            <Sparkles size={13} />
            مركز الإشعارات
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <div className="notifications-mobile-icon-wrap">
            <div className="notifications-mobile-icon-glow" />
            <div className="notifications-mobile-icon">
              <Bell size={24} />
            </div>
          </div>

          <h1 className="notifications-mobile-title">الإشعارات</h1>

          <p className="notifications-mobile-subtitle">
            {roleTitle} — تابع آخر التحديثات والتنبيهات داخل منصة فهيم بشكل لحظي.
          </p>
        </div>

        <div className="notifications-mobile-summary">
          لديك {notifications.length} إشعار
        </div>

        <div className="notifications-mobile-list">
          {notifications.length > 0 ? (
            notifications.map((item, index) => (
              <div className="notifications-mobile-card" key={index}>
                <div className="notifications-mobile-card-top">
                  <div className="notifications-mobile-bell">
                    <Bell size={17} />
                  </div>

                  <div className="notifications-mobile-content">
                    <div className="notifications-mobile-card-title">
                      {item.title}
                    </div>

                    <div className="notifications-mobile-card-sub">
                      {item.subtitle}
                    </div>
                  </div>

                  {item.isNew ? (
                    <div className="notifications-mobile-new-badge">جديد</div>
                  ) : null}
                </div>

                <div className="notifications-mobile-divider" />

                <div className="notifications-mobile-footer">
                  <div className="notifications-mobile-time">{item.time}</div>

                  <div className="notifications-mobile-time-icon">
                    <Clock3 size={16} />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="notifications-mobile-card">
              <div className="notifications-mobile-card-top">
                <div className="notifications-mobile-bell">
                  <Bell size={17} />
                </div>

                <div className="notifications-mobile-content">
                  <div className="notifications-mobile-card-title">
                    لا توجد إشعارات حالياً
                  </div>

                  <div className="notifications-mobile-card-sub">
                    ستظهر هنا آخر التنبيهات الخاصة بحسابك تلقائيًا.
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <button
          className="notifications-mobile-clear-btn"
          onClick={handleClearNotifications}
          type="button"
        >
          <Trash2 size={17} />
          حذف جميع الإشعارات
        </button>
      </div>
    </MobileChrome>
  );
}