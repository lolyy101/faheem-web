"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import {
  BookOpen,
  CheckCircle2,
  Pencil,
  Sparkles,
  Trash2,
  UserRoundPlus,
  Users,
  XSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CourseItem = {
  content_id: number;
  user_id?: number;
  title: string;
  type: string;
  created_at?: string;
  description: string;
};

const API_URL = "http://localhost:8080/api/courses";

export default function CourseManagePage() {
  const router = useRouter();
  const [course, setCourse] = useState<CourseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchCourses = async () => {
    try {
      setLoading(true);
      setStatusMessage("");

      const res = await fetch(API_URL);
      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        setCourse(data[0]);
      } else {
        setCourse(null);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourse(null);
      setStatusMessage("تعذر تحميل بيانات الدورة");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDeleteCourse = async () => {
    if (!course) return;

    const confirmed = window.confirm("هل أنت متأكد من حذف الدورة؟");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/${course.content_id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        setStatusMessage(data.message || "تعذر حذف الدورة");
        return;
      }

      setStatusMessage("تم حذف الدورة بنجاح");
      setCourse(null);
      await fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
      setStatusMessage("تعذر الاتصال بالخادم");
    }
  };

  if (loading) {
    return (
      <MobileChrome>
        <div className="epic-manage-shell" dir="rtl">
          <div className="epic-manage-header">
            <div className="epic-manage-badge">
              <Sparkles size={14} />
              إدارة الدورة
            </div>

            <h1 className="epic-manage-page-title">تفاصيل الدورة</h1>

            <p className="epic-manage-page-subtitle">
              جاري تحميل بيانات الدورة...
            </p>
          </div>
        </div>
      </MobileChrome>
    );
  }

  if (!course) {
    return (
      <MobileChrome>
        <div className="epic-manage-shell" dir="rtl">
          <div className="epic-manage-header">
            <div className="epic-manage-badge">
              <Sparkles size={14} />
              إدارة الدورة
            </div>

            <h1 className="epic-manage-page-title">تفاصيل الدورة</h1>

            <p className="epic-manage-page-subtitle">
              لا توجد دورة محفوظة حاليًا
            </p>
          </div>

          {statusMessage ? (
            <div className="epic-certificate-status">{statusMessage}</div>
          ) : null}
        </div>
      </MobileChrome>
    );
  }

  return (
    <MobileChrome>
      <div className="epic-manage-shell" dir="rtl">
        <div className="epic-manage-header">
          <div className="epic-manage-badge">
            <Sparkles size={14} />
            إدارة الدورة
          </div>

          <h1 className="epic-manage-page-title">تفاصيل الدورة</h1>

          <p className="epic-manage-page-subtitle">
            راقب تقدم الطلاب، استعرض حالة الإكمال، وتحكم بمحتوى الدورة من لوحة
            إدارة حديثة واحترافية.
          </p>
        </div>

        <div className="epic-manage-hero-card">
          <div className="epic-manage-hero-glow" />

          <div className="epic-manage-hero-top">
            <div className="epic-manage-course-icon">
              <BookOpen size={24} />
            </div>
            <div className="epic-manage-course-title">{course.title}</div>
          </div>

          <div
            style={{
              marginTop: "12px",
              marginBottom: "12px",
              color: "#dbeafe",
              lineHeight: 1.8,
            }}
          >
            {course.description}
          </div>

          <div className="epic-manage-stats-grid">
            <div className="epic-manage-stat-box">
              <div className="epic-manage-stat-label">عدد الطلاب</div>
              <div className="epic-manage-stat-value">٨</div>
            </div>

            <div className="epic-manage-stat-divider" />

            <div className="epic-manage-stat-box">
              <div className="epic-manage-stat-label">عدد الدروس</div>
              <div className="epic-manage-stat-value">١٤</div>
            </div>
          </div>

          <div
            style={{
              marginTop: "14px",
              color: "#94a3b8",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            {course.created_at
              ? `تاريخ الإنشاء: ${new Date(course.created_at).toLocaleString("ar-SA")}`
              : ""}
          </div>
        </div>

        {statusMessage ? (
          <div className="epic-certificate-status">{statusMessage}</div>
        ) : null}

        <div className="epic-manage-section-title">
          <Users size={20} />
          الطلاب
        </div>

        <div className="epic-student-card incomplete">
          <div className="epic-student-main">
            <div className="epic-student-status-badge incomplete">
              غير مكتمل
            </div>

            <div className="epic-student-name-wrap">
              <div className="epic-student-name">عبدالوهاب محمد</div>
              <div className="epic-student-subtext">
                لم يُكمل جميع متطلبات الدورة
              </div>
            </div>
          </div>

          <div className="epic-student-icon incomplete">
            <XSquare size={22} />
          </div>
        </div>

        <div className="epic-student-card complete">
          <div className="epic-student-main">
            <div className="epic-student-status-badge complete">مكتمل</div>

            <div className="epic-student-name-wrap">
              <div className="epic-student-name">نهى خالد</div>
              <div className="epic-student-subtext">
                أكملت جميع المتطلبات بنجاح
              </div>
            </div>
          </div>

          <div className="epic-student-icon complete">
            <CheckCircle2 size={22} />
          </div>

          <button
            className="epic-student-certificate-btn"
            type="button"
            onClick={() => router.push("/achievements")}
          >
            عرض الشهادة
          </button>
        </div>

        <div className="epic-student-card incomplete">
          <div className="epic-student-main">
            <div className="epic-student-status-badge incomplete">
              غير مكتمل
            </div>

            <div className="epic-student-name-wrap">
              <div className="epic-student-name">خالد أحمد</div>
              <div className="epic-student-subtext">
                ما زال في منتصف مسار التعلم
              </div>
            </div>
          </div>

          <div className="epic-student-icon incomplete">
            <XSquare size={22} />
          </div>
        </div>

        <div className="epic-manage-actions-grid">
          <button
            className="epic-manage-action danger"
            type="button"
            onClick={handleDeleteCourse}
          >
            <Trash2 size={20} />
            حذف الدورة
          </button>

          <button className="epic-manage-action" type="button">
            <Pencil size={20} />
            تعديل الدورة
          </button>

          <button className="epic-manage-action primary" type="button">
            <UserRoundPlus size={20} />
            إضافة درس
          </button>
        </div>
      </div>
    </MobileChrome>
  );
}