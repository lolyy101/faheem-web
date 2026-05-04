"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { Download, Eye, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentMockUser } from "@/lib/mockAuth";

type CertificateItem = {
  certificate_id: number;
  user_id?: number;
  owner_name: string;
  owner_email?: string;
  course_name: string;
  issue_date: string;
  certificate_number: string;
  description: string;
  created_at?: string;
};

export default function AchievementsPage() {
  const router = useRouter();
  const currentUser = getCurrentMockUser();
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);

        const url = currentUser?.email
          ? `http://localhost:8080/api/certificates/user/${encodeURIComponent(currentUser.email)}`
          : "http://localhost:8080/api/certificates";

        const res = await fetch(url);
        const data = await res.json();

        if (Array.isArray(data)) {
          setCertificates(data);
        } else {
          setCertificates([]);
        }
      } catch (error) {
        console.error("Error fetching certificates:", error);
        setCertificates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [currentUser?.email]);

  return (
    <MobileChrome>
      <div className="epic-courses-shell" dir="rtl">
        <div className="epic-courses-header">
          <div className="epic-courses-badge">
            <Sparkles size={14} />
            سجل الإنجازات
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <h1 className="epic-courses-page-title">الإنجازات</h1>

          <p className="epic-courses-page-subtitle">
            هنا تظهر الشهادات التي حصلت عليها داخل منصة فهيم، ويمكنك فتحها
            وتحميلها ومشاركتها.
          </p>
        </div>

        {loading ? (
          <div className="saved-courses-empty">
            جاري تحميل الشهادات...
          </div>
        ) : certificates.length === 0 ? (
          <div className="saved-courses-empty">
            لا توجد شهادات محفوظة حتى الآن
          </div>
        ) : (
          <div className="saved-courses-list">
            {certificates.map((certificate) => (
              <div className="saved-course-card" key={certificate.certificate_id}>
                <div className="saved-course-body">
                  <div className="saved-course-title">
                    {certificate.course_name}
                  </div>

                  <div className="saved-course-desc">
                    شهادة إنجاز موثقة باسم {certificate.owner_name}
                  </div>

                  <div className="saved-course-meta">
                    <span>{certificate.issue_date}</span>
                    <span>{certificate.certificate_number}</span>
                  </div>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "10px",
                      marginTop: "12px",
                    }}
                  >
                    <button
                      type="button"
                      className="epic-course-details-btn"
                      onClick={() =>
                        router.push(`/certificate?id=${certificate.certificate_id}`)
                      }
                    >
                      <Eye size={16} />
                      عرض الشهادة
                    </button>

                    <button
                      type="button"
                      className="epic-dashboard-action secondary"
                      onClick={() =>
                        router.push(`/certificate?id=${certificate.certificate_id}`)
                      }
                    >
                      <Download size={16} />
                      فتح للتحميل
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MobileChrome>
  );
}