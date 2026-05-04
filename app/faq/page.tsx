"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";
import { useState } from "react";

const faqItems = [
  {
    q: "كيف يمكنني استخدام التطبيق؟",
    a: "يمكنك اختيار طريقة التواصل من الصفحة الرئيسية، إما باستخدام الكاميرا لترجمة لغة الإشارة، أو تحويل الكلام إلى لغة إشارة عبر الصوت، أو تعلم دورة جديدة.",
  },
  {
    q: "هل التطبيق مجاني؟",
    a: "نعم، التطبيق متاح مجانًا مع إمكانية إضافة ميزات متقدمة مستقبلًا.",
  },
  {
    q: "هل يمكنني تعلم لغة الإشارة داخل التطبيق؟",
    a: "نعم، يوفر التطبيق دورات ودروس لتعلم أساسيات لغة الإشارة بطريقة سهلة وتفاعلية.",
  },
  {
    q: "هل يدعم التطبيق أكثر من لغة؟",
    a: "نعم، يمكنك التبديل بين العربية والإنجليزية من إعدادات التطبيق.",
  },
  {
    q: "كيف أحصل على شهادة بعد إتمام الدورة؟",
    a: "بعد إكمال جميع الدروس، يمكنك الحصول على شهادة إتمام مباشرة من التطبيق.",
  },
  {
    q: "كيف تعمل ترجمة لغة الإشارة؟",
    a: "يقوم التطبيق باستخدام الكاميرا للتعرف على الإشارات وتحويلها إلى نص وصوت باستخدام تقنيات الذكاء الاصطناعي.",
  },
  {
    q: "كيف أحول الكلام إلى لغة الإشارة؟",
    a: "تحدث عبر الميكروفون، وسيقوم التطبيق بعرض الإشارة من خلال شخصية افتراضية.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <MobileChrome>
      <div className="faq-mobile-screen" dir="rtl">
        <div className="faq-mobile-header">
          <div className="faq-mobile-badge">
            <Sparkles size={13} />
            مركز المعرفة
          </div>

          <div className="admin-page-logo-wrap">
            <div className="admin-page-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="admin-page-logo" />
          </div>

          <div className="faq-mobile-icon-wrap">
            <div className="faq-mobile-icon-glow" />
            <div className="faq-mobile-icon">
              <HelpCircle size={24} />
            </div>
          </div>

          <h1 className="faq-mobile-title">الأسئلة الشائعة</h1>

          <p className="faq-mobile-subtitle">
            هنا تجد إجابات واضحة وسريعة على أكثر الأسئلة شيوعًا حول منصة فهيم.
          </p>
        </div>

        <div className="faq-mobile-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className={`faq-mobile-card ${isOpen ? "open" : ""}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <div className="faq-mobile-card-top">
                  <div className="faq-mobile-question">{item.q}</div>

                  <div
                    className={`faq-mobile-arrow ${isOpen ? "rotate" : ""}`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </div>

                <div className="faq-mobile-answer-wrap">
                  <div className="faq-mobile-answer">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </MobileChrome>
  );
}