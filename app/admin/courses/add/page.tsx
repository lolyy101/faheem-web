"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import {
  BookOpen,
  ChevronDown,
  Image as ImageIcon,
  Layers3,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { addCourse, getCourses } from "@/lib/api";

type CourseLevel = "مبتدئ" | "متوسط" | "متقدم" | "";

type CourseItem = {
  content_id: number;
  user_id?: number;
  title: string;
  type: string;
  created_at?: string;
  description: string;
};

const API_URL = "http://localhost:8080/api/courses";

export default function AddCoursePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [lessonsCount, setLessonsCount] = useState("");
  const [level, setLevel] = useState<CourseLevel>("");
  const [coverImage, setCoverImage] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [savedCourses, setSavedCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCoursesData = async () => {
    try {
      const data = await getCourses();

      if (Array.isArray(data)) {
        setSavedCourses(data);
      } else {
        setSavedCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setSavedCourses([]);
      setStatusMessage("تعذر تحميل الدورات");
    }
  };

  useEffect(() => {
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

  const handleSaveCourse = async () => {
    if (!title.trim()) {
      setStatusMessage("اكتب اسم الدورة");
      return;
    }

    if (!description.trim()) {
      setStatusMessage("اكتب وصف الدورة");
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

      const storedUser = localStorage.getItem("user");
      const parsedUser = storedUser ? JSON.parse(storedUser) : null;

      await addCourse(
        {
          title: title.trim(),
          description: description.trim(),
          type: "COURSE",
          user_id: parsedUser?.user_id,
        },
        token
      );

      setTitle("");
      setDescription("");
      setLessonsCount("");
      setLevel("");
      setCoverImage("");
      setStatusMessage("تم حفظ الدورة بنجاح ✅");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      await fetchCoursesData();
    } catch (error: any) {
      console.error("Error saving course:", error);
      setStatusMessage(error?.message || "تعذر الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async (id: number) => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : {},
      });

      const text = await res.text();

      let data: any = {};
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!res.ok) {
        setStatusMessage(data.message || "تعذر حذف الدورة");
        return;
      }

      setStatusMessage("تم حذف الدورة بنجاح");
      await fetchCoursesData();
    } catch (error) {
      console.error("Error deleting course:", error);
      setStatusMessage("تعذر الاتصال بالخادم");
    }
  };

  return (
    <MobileChrome>
      <div className="epic-form-shell" dir="rtl">
        <div className="epic-form-header">
          <div className="epic-form-badge">
            <Sparkles size={14} />
            إنشاء محتوى جديد
          </div>

          <h1 className="epic-form-title">إضافة دورة جديدة</h1>

          <p className="epic-form-subtitle">
            أنشئ دورة احترافية داخل منصة فهيم، وأضف تفاصيلها بشكل واضح وجذاب
            لتكون جاهزة للعرض والتسجيل والتعلّم.
          </p>
        </div>

        <div className="epic-form-card">
          <div className="epic-section-label">
            <BookOpen size={18} />
            معلومات الدورة
          </div>

          <div className="epic-field">
            <label className="epic-label">اسم الدورة</label>
            <div className="epic-input-wrap">
              <input
                className="epic-input"
                placeholder="مثال: دورة لغة الإشارة"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="epic-field">
            <label className="epic-label">وصف الدورة</label>
            <div className="epic-input-wrap epic-textarea-wrap">
              <textarea
                className="epic-textarea"
                placeholder="اكتب وصفًا شاملًا للدورة، محتواها، أهدافها، والفئة المستهدفة منها"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="epic-grid-2">
            <div className="epic-field">
              <label className="epic-label">عدد الدروس</label>
              <div className="epic-input-wrap">
                <input
                  className="epic-input"
                  placeholder="مثال: 12"
                  value={lessonsCount}
                  onChange={(e) => setLessonsCount(e.target.value)}
                />
              </div>
            </div>

            <div className="epic-field">
              <label className="epic-label">مستوى الدورة</label>
              <div className="epic-select-wrap">
                <select
                  className="epic-select"
                  value={level}
                  onChange={(e) => setLevel(e.target.value as CourseLevel)}
                >
                  <option value="" disabled>
                    اختر المستوى
                  </option>
                  <option value="مبتدئ">مبتدئ</option>
                  <option value="متوسط">متوسط</option>
                  <option value="متقدم">متقدم</option>
                </select>
                <ChevronDown size={18} className="epic-select-icon" />
              </div>
            </div>
          </div>

          <div className="epic-divider" />

          <div className="epic-section-label">
            <Layers3 size={18} />
            غلاف الدورة
          </div>

          <div className="epic-upload-box">
            <div className="epic-upload-icon">
              <UploadCloud size={30} />
            </div>

            <div className="epic-upload-title">إرفاق صورة غلاف الدورة</div>

            <div className="epic-upload-text">
              اسحب الصورة هنا أو اضغط للاختيار
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
              className="epic-upload-btn"
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon size={16} />
              اختيار صورة
            </button>

            {coverImage ? (
              <div className="course-cover-preview-wrap">
                <img
                  src={coverImage}
                  alt="Course Cover Preview"
                  className="course-cover-preview"
                />
              </div>
            ) : null}
          </div>

          {statusMessage ? (
            <div className="epic-course-status-message">{statusMessage}</div>
          ) : null}

          <button
            className="epic-save-btn"
            type="button"
            onClick={handleSaveCourse}
            disabled={loading}
          >
            {loading ? "جارٍ الحفظ..." : "حفظ الدورة"}
          </button>
        </div>

        <div className="saved-courses-shell">
          <div className="saved-courses-title">الدورات المحفوظة</div>

          {savedCourses.length === 0 ? (
            <div className="saved-courses-empty">
              لا يوجد دورات محفوظة حتى الآن
            </div>
          ) : (
            <div className="saved-courses-list">
              {savedCourses.map((course) => (
                <div className="saved-course-card" key={course.content_id}>
                  <div className="saved-course-body">
                    <div className="saved-course-title">{course.title}</div>

                    <div className="saved-course-desc">{course.description}</div>

                    <div className="saved-course-meta">
                      <span>{course.type}</span>
                    </div>

                    <div className="saved-course-date">
                      {course.created_at
                        ? new Date(course.created_at).toLocaleString("ar-SA")
                        : ""}
                    </div>

                    <button
                      type="button"
                      className="saved-course-delete-btn"
                      onClick={() => handleDeleteCourse(course.content_id)}
                    >
                      حذف الدورة
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