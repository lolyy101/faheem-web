"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { BookOpen, Search, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type CourseItem = {
  content_id: number;
  title: string;
  description?: string;
  type?: string;
  created_at?: string;
  image?: string;
  lessons?: number;
  students?: number;
};

const mockCourses: CourseItem[] = [
  {
    content_id: 1,
    title: "دورة لغة الإشارة",
    description: "ابدأ رحلتك في تعلم لغة الإشارة من الأساسيات حتى التطبيق العملي.",
    type: "مبتدئ",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    lessons: 6,
    students: 28,
  },
  {
    content_id: 2,
    title: "دورة أساسيات لغة الإشارة",
    description: "تعلم الإشارات الأساسية المستخدمة في الحياة اليومية.",
    type: "مبتدئ",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    lessons: 8,
    students: 34,
  },
  {
    content_id: 3,
    title: "دورة التواصل بلغة الإشارة",
    description: "طور مهارات التواصل مع الصم وضعاف السمع بطريقة عملية.",
    type: "متوسط",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
    lessons: 5,
    students: 19,
  },
];

export default function CoursesPage() {
  const [search, setSearch] = useState("");

  const filteredCourses = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return mockCourses;

    return mockCourses.filter((course) =>
      String(course.title || "").toLowerCase().includes(keyword)
    );
  }, [search]);

  return (
    <MobileChrome>
      <div className="epic-courses-shell" dir="rtl">
        <div className="epic-courses-header">
          <div className="epic-courses-badge">
            <Sparkles size={14} />
            مكتبة التعلم الذكية
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <h1 className="epic-courses-page-title">الدورات</h1>

          <p className="epic-courses-page-subtitle">
            استعرض الدورات التعليمية المتاحة داخل منصة فهيم، واختر التجربة المناسبة
            لتطوير مهارات التواصل والتعلّم.
          </p>
        </div>

        <div className="epic-courses-search">
          <Search size={18} className="epic-courses-search-icon" />
          <input
            type="text"
            placeholder="ابحث عن دورة..."
            className="epic-courses-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="epic-courses-grid">
          {filteredCourses.map((course) => (
            <div className="epic-course-mini-card" key={course.content_id}>
              <div className="epic-course-mini-image-wrap">
                <img
                  src={course.image}
                  alt={course.title}
                  className="epic-course-mini-image"
                />
                <div className="epic-course-mini-overlay" />
                <div className="epic-course-mini-badge">Premium</div>
              </div>

              <div className="epic-course-mini-body">
                <div className="epic-course-mini-title">{course.title}</div>

                <div className="epic-course-mini-meta">
                  <div className="epic-course-mini-chip">
                    <BookOpen size={13} />
                    <span>{course.lessons}</span>
                  </div>

                  <div className="epic-course-mini-chip">
                    <Users size={13} />
                    <span>{course.students}</span>
                  </div>
                </div>

                <Link
                  href={`/admin/courses/${course.content_id}`}
                  className="epic-course-mini-btn"
                >
                  عرض التفاصيل
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MobileChrome>
  );
}