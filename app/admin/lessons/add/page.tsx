"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import {
  Camera,
  ChevronDown,
  Clapperboard,
  FileImage,
  FileVideo,
  Layers3,
  Sparkles,
  Timer,
  Type,
  UploadCloud,
} from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  addLesson,
  deleteLesson,
  getCourses,
  getLessons,
} from "@/lib/api";

type MediaType = "صورة" | "فيديو" | "كاميرا";
type LessonType = "فيديو" | "صورة" | "ملف" | "";

type LessonItem = {
  lesson_id: number;
  title: string;
  description: string;
  lesson_type: string;
  duration: number;
  media_type: string;
  course_id: number;
  course_title: string;
  cover_image: string;
  created_at?: string;
};

type CourseItem = {
  content_id: number;
  title: string;
  type?: string;
};

export default function AddLessonPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessonType, setLessonType] = useState<LessonType>("");
  const [duration, setDuration] = useState("");
  const [mediaType, setMediaType] = useState<MediaType>("صورة");
  const [courseId, setCourseId] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [savedLessons, setSavedLessons] = useState<LessonItem[]>([]);
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const fetchLessonsData = async () => {
    try {
      const data = await getLessons();
      setSavedLessons(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching lessons:", error);
      setSavedLessons([]);
      setStatusMessage("تعذر تحميل الدروس");
    }
  };

  const fetchCoursesData = async () => {
    try {
      const data = await getCourses();
      setCourses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setCourses([]);
      setStatusMessage("تعذر تحميل الدورات");
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchLessonsData();
    fetchCoursesData();
  }, []);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatusMessage("الملف المختار ليس صورة");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatusMessage("حجم الصورة أكبر من 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImage(String(reader.result || ""));
      setStatusMessage("");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveLesson = async () => {
    if (!title.trim()) {
      setStatusMessage("اكتب عنوان الدرس");
      return;
    }

    if (!description.trim()) {
      setStatusMessage("اكتب وصف الدرس");
      return;
    }

    if (!lessonType) {
      setStatusMessage("اختر نوع الدرس");
      return;
    }

    if (!duration.trim()) {
      setStatusMessage("اكتب مدة الدرس");
      return;
    }

    if (!courseId) {
      setStatusMessage("اختر الدورة المرتبطة");
      return;
    }

    if (!coverImage) {
      setStatusMessage("أرفق صورة غلاف الدرس");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setStatusMessage("يجب تسجيل الدخول أولًا");
      return;
    }

    try {
      setLoading(true);
      setStatusMessage("");

      await addLesson(
        {
          title: title.trim(),
          description: description.trim(),
          lesson_type: lessonType,
          duration: Number(duration),
          media_type: mediaType,
          course_id: Number(courseId),
          cover_image: coverImage,
        },
        token
      );

      setTitle("");
      setDescription("");
      setLessonType("");
      setDuration("");
      setMediaType("صورة");
      setCourseId("");
      setCoverImage("");
      setStatusMessage("تم حفظ الدرس بنجاح ✅");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchLessonsData();
    } catch (error: any) {
      console.error("Error saving lesson:", error);
      setStatusMessage(error?.message || "تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLesson = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setStatusMessage("يجب تسجيل الدخول أولًا");
        return;
      }

      await deleteLesson(id, token);
      setStatusMessage("تم حذف الدرس بنجاح");
      await fetchLessonsData();
    } catch (error: any) {
      console.error("Error deleting lesson:", error);
      setStatusMessage(error?.message || "تعذر الاتصال بالخادم");
    }
  };

  return (
    <MobileChrome>
      <div className="epic-lesson-form-shell" dir="rtl">
        <div className="epic-lesson-form-header">
          <div className="epic-lesson-form-badge">
            <Sparkles size={14} />
            إنشاء محتوى تعليمي
          </div>

          <h1 className="epic-lesson-form-title">إضافة درس جديد</h1>

          <p className="epic-lesson-form-subtitle">
            أنشئ درسًا احترافيًا داخل المنصة، وحدد نوع المحتوى، واربطه بالدورة
            المناسبة ليظهر ضمن رحلة تعلم متكاملة.
          </p>
        </div>

        <div className="epic-lesson-form-card">
          <div className="epic-lesson-section-label">
            <Type size={18} />
            معلومات الدرس
          </div>

          <div className="epic-lesson-field">
            <label className="epic-lesson-label">عنوان الدرس</label>
            <div className="epic-lesson-input-wrap">
              <input
                className="epic-lesson-input"
                placeholder="مثال: حروف لغة الإشارة"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="epic-lesson-field">
            <label className="epic-lesson-label">وصف الدرس</label>
            <div className="epic-lesson-input-wrap epic-lesson-textarea-wrap">
              <textarea
                className="epic-lesson-textarea"
                placeholder="اكتب وصفًا مختصرًا لمحتوى الدرس، الهدف منه، وما الذي سيتعلمه المستخدم"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="epic-lesson-grid-2">
            <div className="epic-lesson-field">
              <label className="epic-lesson-label">نوع الدرس</label>
              <div className="epic-lesson-select-wrap">
                <select
                  className="epic-lesson-select"
                  value={lessonType}
                  onChange={(e) => setLessonType(e.target.value as LessonType)}
                >
                  <option value="" disabled>
                    اختر النوع
                  </option>
                  <option value="فيديو">فيديو</option>
                  <option value="صورة">صورة</option>
                  <option value="ملف">ملف</option>
                </select>
                <ChevronDown size={18} className="epic-lesson-select-icon" />
              </div>
            </div>

            <div className="epic-lesson-field">
              <label className="epic-lesson-label">مدة الدرس (دقيقة)</label>
              <div className="epic-lesson-input-wrap">
                <input
                  className="epic-lesson-input"
                  placeholder="مثال: 9"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="epic-lesson-divider" />

          <div className="epic-lesson-section-label">
            <Clapperboard size={18} />
            نوع الوسائط
          </div>

          <div className="epic-media-cards">
            <button
              type="button"
              className={`epic-media-card ${mediaType === "صورة" ? "active" : ""}`}
              onClick={() => setMediaType("صورة")}
            >
              <div className="epic-media-icon">
                <FileImage size={22} />
              </div>
              <div className="epic-media-title">صورة</div>
              <div className="epic-media-sub">محتوى بصري ثابت</div>
            </button>

            <button
              type="button"
              className={`epic-media-card ${mediaType === "فيديو" ? "active" : ""}`}
              onClick={() => setMediaType("فيديو")}
            >
              <div className="epic-media-icon">
                <FileVideo size={22} />
              </div>
              <div className="epic-media-title">فيديو</div>
              <div className="epic-media-sub">شرح متحرك وتفاعلي</div>
            </button>

            <button
              type="button"
              className={`epic-media-card ${mediaType === "كاميرا" ? "active" : ""}`}
              onClick={() => setMediaType("كاميرا")}
            >
              <div className="epic-media-icon">
                <Camera size={22} />
              </div>
              <div className="epic-media-title">كاميرا</div>
              <div className="epic-media-sub">التقاط مباشر</div>
            </button>
          </div>

          <div className="epic-lesson-divider" />

          <div className="epic-lesson-grid-2">
            <div className="epic-lesson-field">
              <label className="epic-lesson-label">اختيار الدورة المرتبطة</label>
              <div className="epic-lesson-select-wrap">
                <select
                  className="epic-lesson-select"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                >
                  <option value="" disabled>
                    اختر الدورة المرتبطة
                  </option>

                  {courses.map((course) => (
                    <option key={course.content_id} value={course.content_id}>
                      {course.title}
                    </option>
                  ))}
                </select>
                <ChevronDown size={18} className="epic-lesson-select-icon" />
              </div>
            </div>

            <div className="epic-lesson-side-card">
              <div className="epic-lesson-side-icon">
                <Timer size={18} />
              </div>
              <div>
                <div className="epic-lesson-side-title">مدة مقترحة</div>
                <div className="epic-lesson-side-sub">8 - 12 دقيقة</div>
              </div>
            </div>
          </div>

          <div className="epic-lesson-divider" />

          <div className="epic-lesson-section-label">
            <Layers3 size={18} />
            غلاف الدرس
          </div>

          <div className="epic-lesson-upload-box">
            <div className="epic-lesson-upload-icon">
              <UploadCloud size={30} />
            </div>

            <div className="epic-lesson-upload-title">إرفاق صورة غلاف الدرس</div>

            <div className="epic-lesson-upload-text">
              اسحب الملف هنا أو اضغط للاختيار
              <br />
              يدعم: JPG, PNG — الحد الأقصى 5MB
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />

            <button
              className="epic-lesson-upload-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage size={16} />
              اختيار صورة
            </button>

            {coverImage ? (
              <div className="lesson-cover-preview-wrap">
                <img
                  src={coverImage}
                  alt="Preview"
                  className="lesson-cover-preview"
                />
              </div>
            ) : null}
          </div>

          {statusMessage ? (
            <div className="epic-lesson-status-message">{statusMessage}</div>
          ) : null}

          <button
            className="epic-lesson-save-btn"
            type="button"
            onClick={handleSaveLesson}
            disabled={loading}
          >
            {loading ? "جارٍ الحفظ..." : "حفظ الدرس"}
          </button>
        </div>

        <div className="saved-lessons-shell">
          <div className="saved-lessons-title">الدروس المحفوظة</div>

          {savedLessons.length === 0 ? (
            <div className="saved-lessons-empty">
              لا يوجد دروس محفوظة حتى الآن
            </div>
          ) : (
            <div className="saved-lessons-list">
              {savedLessons.map((lesson) => (
                <div className="saved-lesson-card" key={lesson.lesson_id}>
                  <img
                    src={lesson.cover_image}
                    alt={lesson.title}
                    className="saved-lesson-image"
                  />

                  <div className="saved-lesson-body">
                    <div className="saved-lesson-title">{lesson.title}</div>

                    <div className="saved-lesson-desc">{lesson.description}</div>

                    <div className="saved-lesson-meta">
                      <span>{lesson.lesson_type}</span>
                      <span>{lesson.media_type}</span>
                      <span>{lesson.duration} دقيقة</span>
                    </div>

                    <div className="saved-lesson-course">
                      الدورة: {lesson.course_title}
                    </div>

                    <div className="saved-lesson-date">
                      {mounted && lesson.created_at
                        ? new Date(lesson.created_at).toLocaleDateString("ar-SA")
                        : ""}
                    </div>

                    <button
                      type="button"
                      className="saved-lesson-delete-btn"
                      onClick={() => handleDeleteLesson(lesson.lesson_id)}
                    >
                      حذف الدرس
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </MobileChrome>
  );
}