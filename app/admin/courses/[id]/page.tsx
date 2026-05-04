"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { BookOpen, Clock3, PlayCircle, Sparkles, Users } from "lucide-react";
import { useParams } from "next/navigation";

const coursesMap: Record<string, any> = {
  "1": {
    title: "دورة لغة الإشارة",
    description:
      "ابدأ رحلتك في تعلم لغة الإشارة من الأساسيات حتى التطبيق العملي داخل مواقف حياتية حقيقية.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    lessons: 6,
    students: 28,
    level: "مبتدئ",
    duration: "4 ساعات",
    lessonsList: [
      "مقدمة في لغة الإشارة",
      "التحيات والتعارف",
      "الكلمات اليومية الأساسية",
      "التواصل داخل الأماكن العامة",
      "التطبيق العملي",
      "مراجعة واختبار نهائي",
    ],
  },
  "2": {
    title: "دورة أساسيات لغة الإشارة",
    description:
      "تعلم الإشارات الأساسية المستخدمة في الحياة اليومية بطريقة سهلة ومنظمة.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    lessons: 8,
    students: 34,
    level: "مبتدئ",
    duration: "5 ساعات",
    lessonsList: [
      "الحروف والإشارات الأولى",
      "الأرقام",
      "التحيات",
      "الأسئلة الشائعة",
      "الطلبات الأساسية",
      "مفردات الطعام والشراب",
      "التطبيق العملي",
      "الاختبار النهائي",
    ],
  },
  "3": {
    title: "دورة التواصل بلغة الإشارة",
    description:
      "طور مهارات التواصل مع الصم وضعاف السمع بطريقة عملية واحترافية.",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
    lessons: 5,
    students: 19,
    level: "متوسط",
    duration: "3 ساعات",
    lessonsList: [
      "أساسيات الحوار",
      "فهم الاحتياجات اليومية",
      "التواصل في المواقف الصحية",
      "الاستجابة والتفاعل",
      "تقييم نهائي وشهادة",
    ],
  },
};

export default function CourseDetailsPage() {
  const params = useParams();
  const course = coursesMap[String(params.id)];

  if (!course) {
    return (
      <MobileChrome backHref="/admin/courses">
        <div style={{ padding: "40px", color: "white", direction: "rtl" }}>
          الدورة غير موجودة
        </div>
      </MobileChrome>
    );
  }

  return (
    <MobileChrome backHref="/admin/courses">
      <div className="epic-course-shell" dir="rtl">
        <div className="epic-course-header">
          <div className="epic-course-badge">
            <Sparkles size={14} />
            تجربة تعلم ذكية
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <h1 className="epic-course-page-title">{course.title}</h1>

          <p className="epic-course-page-subtitle">{course.description}</p>
        </div>

        <div className="epic-course-hero-card">
          <div className="epic-course-hero-glow" />

          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              marginBottom: "20px",
            }}
          >
            <img
              src={course.image}
              alt={course.title}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>

          <div className="epic-course-hero-title">عن الدورة</div>

          <div className="epic-course-hero-text">{course.description}</div>
        </div>

        <div className="epic-course-stats-grid">
          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <Clock3 size={24} />
            </div>
            <div className="epic-course-stat-label">مدة الدورة</div>
            <div className="epic-course-stat-value">{course.duration}</div>
          </div>

          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="epic-course-stat-label">عدد الدروس</div>
            <div className="epic-course-stat-value">{course.lessons}</div>
          </div>
        </div>

        <div className="epic-course-stats-grid">
          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <Users size={24} />
            </div>
            <div className="epic-course-stat-label">عدد المتدربين</div>
            <div className="epic-course-stat-value">{course.students}</div>
          </div>

          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <Sparkles size={24} />
            </div>
            <div className="epic-course-stat-label">المستوى</div>
            <div className="epic-course-stat-value">{course.level}</div>
          </div>
        </div>

        <div className="epic-progress-card">
          <div className="epic-progress-header">
            <div className="epic-progress-title">محتوى الدورة</div>
            <div className="epic-progress-percent">100%</div>
          </div>

          <div className="epic-progress-bar">
            <div className="epic-progress-bar-fill" style={{ width: "100%" }} />
          </div>
        </div>

        <div className="epic-lessons-title">الدروس المتاحة</div>

        {course.lessonsList.map((lesson: string, index: number) => (
          <div className="epic-lesson-card" key={index}>
            <div className="epic-lesson-main">
              <div className="epic-lesson-icon">
                <PlayCircle size={22} />
              </div>
              <div>
                <div className="epic-lesson-name">
                  الدرس {index + 1}: {lesson}
                </div>
                <div className="epic-lesson-sub">
                  محتوى تفاعلي يساعد المستخدم على التعلم التدريجي.
                </div>
              </div>
            </div>
          </div>
        ))}

        <button className="epic-save-btn" type="button">
          ابدأ التعلم
        </button>
      </div>
    </MobileChrome>
  );
}