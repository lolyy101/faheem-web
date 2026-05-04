import MobileChrome from "@/components/layout/MobileChrome";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Sparkles,
} from "lucide-react";
import { notFound } from "next/navigation";
import { coursesData } from "@/app/data/courses";

type Props = {
  params: {
    slug: string;
  };
};

export default function CourseDetailsPage({ params }: Props) {
  const course = coursesData.find((item) => item.slug === params.slug);

  if (!course) return notFound();

  const completedLessons = course.lessons.filter((l) => l.completed).length;
  const progress = Math.round(
    (completedLessons / course.lessons.length) * 100
  );

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
          <div className="epic-course-hero-title">عن الدورة</div>
          <div className="epic-course-hero-text">{course.longDescription}</div>
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
            <div className="epic-course-stat-value">{course.lessonsCount}</div>
          </div>
        </div>

        <div className="epic-course-stats-grid">
          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <Sparkles size={24} />
            </div>
            <div className="epic-course-stat-label">المستوى</div>
            <div className="epic-course-stat-value">{course.level}</div>
          </div>

          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <CheckCircle2 size={24} />
            </div>
            <div className="epic-course-stat-label">المتدربين</div>
            <div className="epic-course-stat-value">{course.students}</div>
          </div>
        </div>

        <div className="epic-progress-card">
          <div className="epic-progress-header">
            <div className="epic-progress-title">التقدم في الدورة</div>
            <div className="epic-progress-percent">{progress}%</div>
          </div>

          <div className="epic-progress-bar">
            <div
              className="epic-progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="epic-lessons-title">محتوى الدورة</div>

        {course.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className={`epic-lesson-card ${lesson.completed ? "completed" : ""}`}
          >
            <div className="epic-lesson-main">
              <div className="epic-lesson-icon">
                <PlayCircle size={22} />
              </div>

              <div>
                <div className="epic-lesson-name">
                  الدرس {lesson.id}: {lesson.title}
                </div>
                <div className="epic-lesson-sub">
                  {lesson.description} — {lesson.duration}
                </div>
              </div>
            </div>

            <div className={`epic-lesson-status ${lesson.completed ? "done" : "pending"}`}>
              {lesson.completed ? <CheckCircle2 size={22} /> : null}
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