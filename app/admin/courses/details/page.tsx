import MobileChrome from "@/components/layout/MobileChrome";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  PlayCircle,
  Sparkles,
} from "lucide-react";

export default function CourseDetailsPage() {
  return (
    <MobileChrome>
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

          <h1 className="epic-course-page-title">تفاصيل الدورة</h1>

          <p className="epic-course-page-subtitle">
            استعرض محتوى الدورة، تفاصيلها، ومستوى تقدمك داخل رحلة تعلم مصممة
            بأسلوب تفاعلي واحترافي.
          </p>
        </div>

        <div className="epic-course-hero-card">
          <div className="epic-course-hero-glow" />

          <div className="epic-course-hero-title">دورة لغة الإشارة</div>

          <div className="epic-course-hero-text">
            دورة تهدف إلى تعليم أساسيات لغة الإشارة للتواصل مع الأشخاص من ذوي
            الإعاقة السمعية. يتعلم المتدرب الحروف، الكلمات الشائعة، وكيفية تكوين
            جمل بسيطة بطريقة سهلة وتفاعلية، مما يساعد على تعزيز التواصل وفهم
            الآخر بشكل أفضل.
          </div>
        </div>

        <div className="epic-course-stats-grid">
          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <Clock3 size={24} />
            </div>
            <div className="epic-course-stat-label">مدة الدورة</div>
            <div className="epic-course-stat-value">٣ أيام</div>
          </div>

          <div className="epic-course-stat-card">
            <div className="epic-course-stat-icon">
              <BookOpen size={24} />
            </div>
            <div className="epic-course-stat-label">عدد الدروس</div>
            <div className="epic-course-stat-value">١٤</div>
          </div>
        </div>

        <div className="epic-progress-card">
          <div className="epic-progress-header">
            <div className="epic-progress-title">تقدمك في الدورة</div>
            <div className="epic-progress-percent">67%</div>
          </div>

          <div className="epic-progress-bar">
            <div className="epic-progress-bar-fill" />
          </div>
        </div>

        <div className="epic-lessons-title">الدروس</div>

        <div className="epic-lesson-card completed">
          <div className="epic-lesson-main">
            <div className="epic-lesson-icon">
              <PlayCircle size={22} />
            </div>
            <div>
              <div className="epic-lesson-name">الدرس ١: الحروف الأبجدية</div>
              <div className="epic-lesson-sub">تم إكمال هذا الدرس بنجاح</div>
            </div>
          </div>

          <div className="epic-lesson-status done">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="epic-lesson-card completed">
          <div className="epic-lesson-main">
            <div className="epic-lesson-icon">
              <PlayCircle size={22} />
            </div>
            <div>
              <div className="epic-lesson-name">الدرس ٢: كلمات أساسية</div>
              <div className="epic-lesson-sub">تم إكمال هذا الدرس بنجاح</div>
            </div>
          </div>

          <div className="epic-lesson-status done">
            <CheckCircle2 size={22} />
          </div>
        </div>

        <div className="epic-lesson-card">
          <div className="epic-lesson-main">
            <div className="epic-lesson-icon">
              <PlayCircle size={22} />
            </div>
            <div>
              <div className="epic-lesson-name">الدرس ٣: تكوين الجمل</div>
              <div className="epic-lesson-sub">جاهز للبدء</div>
            </div>
          </div>

          <div className="epic-lesson-status pending" />
        </div>
      </div>
    </MobileChrome>
  );
}