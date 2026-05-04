"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { Award, Download, Share2, Sparkles } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
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

export default function CertificatePage() {
  const searchParams = useSearchParams();
  const certificateRef = useRef<HTMLDivElement | null>(null);

  const [statusMessage, setStatusMessage] = useState("");
  const [certificates, setCertificates] = useState<CertificateItem[]>([]);
  const [loading, setLoading] = useState(true);

  const currentUser = getCurrentMockUser();
  const certificateId = searchParams.get("id");

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:8080/api/certificates");
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
  }, []);

  const certificate = useMemo(() => {
    if (certificates.length === 0) return null;

    if (certificateId) {
      const found = certificates.find(
        (item) => String(item.certificate_id) === String(certificateId)
      );
      if (found) return found;
    }

    if (currentUser?.email) {
      const userCertificate = certificates.find(
        (item) => item.owner_email === currentUser.email
      );
      if (userCertificate) return userCertificate;
    }

    return certificates[0];
  }, [certificates, certificateId, currentUser?.email]);

  const captureCertificateCanvas = async () => {
    if (!certificateRef.current) return null;

    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#111217",
    });

    return canvas;
  };

  const handleDownloadPdf = async () => {
    try {
      setStatusMessage("جاري تجهيز ملف الشهادة...");

      const canvas = await captureCertificateCanvas();
      if (!canvas || !certificate) return;

      const imageData = canvas.toDataURL("image/png");

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      const finalWidth = imgWidth * ratio;
      const finalHeight = imgHeight * ratio;

      const x = (pageWidth - finalWidth) / 2;
      const y = 20;

      pdf.addImage(imageData, "PNG", x, y, finalWidth, finalHeight);

      pdf.save(`${certificate.certificate_number}.pdf`);
      setStatusMessage("تم تحميل الشهادة بنجاح ✅");
    } catch {
      setStatusMessage("تعذر تحميل الشهادة");
    }
  };

  const handleShare = async () => {
    try {
      if (!certificate) return;

      setStatusMessage("جاري تجهيز المشاركة...");

      const canvas = await captureCertificateCanvas();
      if (!canvas) return;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      if (!blob) {
        setStatusMessage("تعذر تجهيز ملف المشاركة");
        return;
      }

      const file = new File(
        [blob],
        `${certificate.certificate_number}.png`,
        { type: "image/png" }
      );

      if (
        navigator.share &&
        typeof navigator.canShare === "function" &&
        navigator.canShare({ files: [file] })
      ) {
        await navigator.share({
          title: "شهادة إنجاز - Faheem",
          text: `أشارك معك شهادتي في ${certificate.course_name}`,
          files: [file],
        });

        setStatusMessage("تمت المشاركة بنجاح ✅");
        return;
      }

      const subject = encodeURIComponent("شهادة إنجاز من منصة فهيم");
      const body = encodeURIComponent(
        `السلام عليكم،

أشارك معكم شهادة الإنجاز الخاصة بي.

الاسم: ${certificate.owner_name}
الدورة: ${certificate.course_name}
رقم الشهادة: ${certificate.certificate_number}
تاريخ الإصدار: ${certificate.issue_date}

تم إنشاء الشهادة عبر منصة فهيم.`
      );

      window.location.href = `mailto:?subject=${subject}&body=${body}`;
      setStatusMessage("تم فتح البريد للمشاركة ✉️");
    } catch {
      setStatusMessage("تعذر تنفيذ المشاركة");
    }
  };

  if (loading) {
    return (
      <MobileChrome>
        <div className="epic-certificate-page" dir="rtl">
          <div className="epic-certificate-card">
            <div className="epic-certificate-frame">
              <div className="epic-certificate-title">جاري تحميل الشهادة...</div>
            </div>
          </div>
        </div>
      </MobileChrome>
    );
  }

  if (!certificate) {
    return (
      <MobileChrome>
        <div className="epic-certificate-page" dir="rtl">
          <div className="epic-certificate-card">
            <div className="epic-certificate-frame">
              <div className="epic-certificate-title">لا توجد شهادة متاحة</div>
            </div>
          </div>
        </div>
      </MobileChrome>
    );
  }

  return (
    <MobileChrome>
      <div className="epic-certificate-page" dir="rtl">
        <div className="epic-certificate-card">
          <div className="epic-certificate-glow epic-certificate-glow-top" />
          <div className="epic-certificate-glow epic-certificate-glow-bottom" />

          <div className="epic-certificate-top-badge">
            <Sparkles size={14} />
            شهادة موثقة
          </div>

          <div className="epic-certificate-frame" ref={certificateRef}>
            <div className="certificate-logo-wrap">
              <img src="/logo.png" alt="Faheem" className="certificate-logo" />
            </div>

            <div className="epic-certificate-title">شهادة إنجاز</div>

            <div className="epic-certificate-divider" />

            <div className="epic-certificate-line">نشهد بأن</div>

            <div className="epic-certificate-name">{certificate.owner_name}</div>

            <div className="epic-certificate-line strong">قد أتمت بنجاح</div>

            <div className="epic-certificate-course">{certificate.course_name}</div>

            <div className="epic-certificate-description">
              {certificate.description}
            </div>

            <div className="epic-certificate-seal">
              <div className="epic-certificate-seal-ring">
                <Award size={30} />
              </div>
              <div className="epic-certificate-seal-text">FAHEEM</div>
            </div>

            <div className="epic-certificate-meta">
              <div className="epic-certificate-meta-box">
                <div className="epic-certificate-meta-label">تاريخ الإصدار</div>
                <div className="epic-certificate-meta-value">
                  {certificate.issue_date}
                </div>
              </div>

              <div className="epic-certificate-meta-box left">
                <div className="epic-certificate-meta-label">رقم الشهادة</div>
                <div className="epic-certificate-meta-value">
                  {certificate.certificate_number}
                </div>
              </div>
            </div>
          </div>
        </div>

        {statusMessage ? (
          <div className="epic-certificate-status">{statusMessage}</div>
        ) : null}

        <div className="epic-certificate-actions">
          <button
            className="epic-certificate-btn primary"
            onClick={handleDownloadPdf}
            type="button"
          >
            <span className="epic-certificate-btn-inner">
              <Download size={18} />
              تحميل الشهادة
            </span>
          </button>

          <button
            className="epic-certificate-btn secondary"
            onClick={handleShare}
            type="button"
          >
            <span className="epic-certificate-btn-inner">
              <Share2 size={18} />
              مشاركة
            </span>
          </button>
        </div>
      </div>
    </MobileChrome>
  );
}