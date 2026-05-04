"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  NotebookPen,
  Sparkles,
  SquareUserRound,
  TrendingUp,
  ShieldCheck,
  BellRing,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type TicketStatus = "active" | "resolved" | "processing" | "new" | "OPEN";

type TicketItem = {
  ticket_id?: number;
  id?: number | string;
  ticketNumber?: string;
  ticket_number?: string;
  issueType?: string;
  issue_type?: string;
  description: string;
  userName?: string;
  user_name?: string;
  email?: string;
  date?: string;
  created_at?: string;
  status: TicketStatus | string;
};

type LessonItem = {
  lesson_id: number;
  title: string;
  description: string;
  lesson_type: string;
  duration: number;
  media_type: string;
  course_id: number;
  course_title: string;
  created_at?: string;
};

type CourseItem = {
  content_id: number;
  title: string;
  description: string;
  type?: string;
  created_at?: string;
};

const SUPPORT_API_URL = "http://localhost:8080/api/support-tickets";
const LESSONS_API_URL = "http://localhost:8080/api/lessons/summary";
const COURSES_API_URL = "http://localhost:8080/api/courses";

export default function AdminDashboardPage() {
  const router = useRouter();

  const [tickets, setTickets] = useState<TicketItem[]>([]);
  const [lessons, setLessons] = useState<LessonItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const parseJsonSafely = async (res: Response) => {
    const text = await res.text();
    try {
      return JSON.parse(text);
    } catch {
      throw new Error(text || "Invalid server response");
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [ticketsRes, lessonsRes, coursesRes] = await Promise.all([
          fetch(SUPPORT_API_URL),
          fetch(LESSONS_API_URL),
          fetch(COURSES_API_URL),
        ]);

        const [ticketsData, lessonsData, coursesData] = await Promise.all([
          parseJsonSafely(ticketsRes),
          parseJsonSafely(lessonsRes),
          parseJsonSafely(coursesRes),
        ]);

        setTickets(Array.isArray(ticketsData) ? ticketsData : []);
        setLessons(Array.isArray(lessonsData) ? lessonsData : []);
        setCourses(Array.isArray(coursesData) ? coursesData : []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setTickets([]);
        setLessons([]);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const resolvedTickets = tickets.filter((ticket) => {
    const status = String(ticket.status || "").toLowerCase();
    return status === "resolved";
  }).length;

  const activeTickets = tickets.filter((ticket) => {
    const status = String(ticket.status || "").toLowerCase();
    return (
      status === "active" ||
      status === "processing" ||
      status === "new" ||
      status === "open"
    );
  }).length;

  const usersCount = useMemo(() => {
    const uniqueUsers = new Set(
      tickets
        .map((ticket) => ticket.userName || ticket.user_name || ticket.email)
        .filter(Boolean)
    );

    return Math.max(uniqueUsers.size, 100);
  }, [tickets]);

  const recentActivities = useMemo(() => {
    const activities: {
      type: "success" | "primary" | "warning";
      title: string;
      subtitle: string;
    }[] = [];

    if (resolvedTickets > 0) {
      activities.push({
        type: "success",
        title: "تم حل بلاغ",
        subtitle: "تم إغلاق تذكرة دعم فني بنجاح",
      });
    }

    if (lessons.length > 0) {
      activities.push({
        type: "primary",
        title: "تم تحديث المحتوى التعليمي",
        subtitle: `يوجد الآن ${lessons.length} درس محفوظ داخل المنصة`,
      });
    }

    if (courses.length > 0) {
      activities.push({
        type: "warning",
        title: "تمت إضافة دورة جديدة",
        subtitle: `يوجد الآن ${courses.length} دورة متاحة للتعلم داخل النظام`,
      });
    }

    if (activities.length === 0) {
      activities.push(
        {
          type: "success",
          title: "النظام جاهز",
          subtitle: "لوحة التحكم تعمل بشكل طبيعي",
        },
        {
          type: "primary",
          title: "ابدأ بإضافة المحتوى",
          subtitle: "يمكنك رفع ملف PDF وتحويله إلى درس تعليمي",
        },
        {
          type: "warning",
          title: "لا يوجد نشاط حديث",
          subtitle: "سيظهر آخر النشاط هنا تلقائيًا",
        }
      );
    }

    return activities.slice(0, 3);
  }, [resolvedTickets, lessons.length, courses.length]);

  return (
    <MobileChrome>
      <div className="epic-dashboard-shell" dir="rtl">
        <div className="epic-dashboard-header">
          <div className="epic-dashboard-badge">
            <Sparkles size={14} />
            مركز الإدارة الذكي
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <h1 className="epic-dashboard-title">لوحة التحكم</h1>

          <p className="epic-dashboard-subtitle">
            تحكم شامل بالنظام، راقب الأداء، استعرض البيانات الأساسية، واتخذ
            قرارات أسرع عبر لوحة مصممة بأسلوب احترافي حديث.
          </p>
        </div>

        <div className="epic-dashboard-hero-card">
          <div className="epic-dashboard-hero-glow" />

          <div className="epic-dashboard-hero-top">
            <div className="epic-dashboard-hero-icon">
              <ShieldCheck size={26} />
            </div>

            <div>
              <div className="epic-dashboard-hero-heading">نظرة عامة فورية</div>
              <div className="epic-dashboard-hero-text">
                {loading
                  ? "جاري تحميل مؤشرات النظام..."
                  : "مؤشرات النظام الأساسية محدثة وجاهزة للمتابعة"}
              </div>
            </div>
          </div>

          <div className="epic-dashboard-highlight-row">
            <div className="epic-dashboard-highlight-box">
              <TrendingUp size={18} />
              <span>أداء مستقر</span>
            </div>

            <div className="epic-dashboard-highlight-box">
              <BellRing size={18} />
              <span>{activeTickets > 0 ? "تنبيهات نشطة" : "لا توجد تنبيهات"}</span>
            </div>
          </div>
        </div>

        <div className="epic-dashboard-stats-grid">
          <div className="epic-dashboard-stat-card">
            <div className="epic-dashboard-stat-top">
              <div className="epic-dashboard-stat-icon">
                <SquareUserRound size={22} />
              </div>
              <div className="epic-dashboard-stat-label">المستخدمين</div>
            </div>
            <div className="epic-dashboard-stat-value">{usersCount}</div>
          </div>

          <div className="epic-dashboard-stat-card">
            <div className="epic-dashboard-stat-top">
              <div className="epic-dashboard-stat-icon">
                <ClipboardList size={22} />
              </div>
              <div className="epic-dashboard-stat-label">البلاغات</div>
            </div>
            <div className="epic-dashboard-stat-value">{tickets.length}</div>
          </div>

          <div className="epic-dashboard-stat-card">
            <div className="epic-dashboard-stat-top">
              <div className="epic-dashboard-stat-icon">
                <NotebookPen size={22} />
              </div>
              <div className="epic-dashboard-stat-label">الدروس</div>
            </div>
            <div className="epic-dashboard-stat-value">{lessons.length}</div>
          </div>

          <div className="epic-dashboard-stat-card">
            <div className="epic-dashboard-stat-top">
              <div className="epic-dashboard-stat-icon">
                <BookOpen size={22} />
              </div>
              <div className="epic-dashboard-stat-label">الدورات</div>
            </div>
            <div className="epic-dashboard-stat-value">{courses.length}</div>
          </div>
        </div>

        <div className="epic-dashboard-actions">
          <button
            className="epic-dashboard-action primary"
            onClick={() => router.push("/admin/courses/add")}
            type="button"
          >
            إضافة دورة
          </button>

          <button
            className="epic-dashboard-action secondary"
            onClick={() => router.push("/admin/pdf-to-sign")}
            type="button"
          >
            رفع PDF وتحويله
          </button>
        </div>

        <div className="epic-dashboard-activity-card">
          <div className="epic-dashboard-activity-header">
            <div className="epic-dashboard-activity-title">آخر النشاط</div>
            <div className="epic-dashboard-activity-check">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="epic-dashboard-timeline">
            {recentActivities.map((activity, index) => (
              <div className="epic-dashboard-timeline-item" key={index}>
                <div className={`epic-dashboard-timeline-dot ${activity.type}`} />
                <div className="epic-dashboard-timeline-content">
                  <div className="epic-dashboard-timeline-main">{activity.title}</div>
                  <div className="epic-dashboard-timeline-sub">{activity.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MobileChrome>
  );
}