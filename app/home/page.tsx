"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { BookOpen, Camera, Mic, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/auth";

export default function HomePage() {
  const [, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const data = await fetchCurrentUser();
      setUser(data);
      console.log("Current User:", data);
    };

    loadUser();
  }, []);

  return (
    <MobileChrome backHref="/login">
      <div className="home-mobile-screen" dir="rtl">
        <div className="home-mobile-hero">
          <div className="home-mobile-badge">
            <Sparkles size={13} />
            مركز التواصل الذكي
          </div>

          <div className="home-mobile-orb-wrap">
            <div className="home-mobile-orb-glow" />
            <div className="home-mobile-orb-ring ring-1" />
            <div className="home-mobile-orb-ring ring-2" />

            <div className="home-mobile-orb logo-mode">
              <img
                src="/logo.png"
                alt="Faheem"
                className="home-mobile-orb-logo"
              />
            </div>
          </div>

          <h1 className="home-mobile-title">اختر طريقة التواصل</h1>

          <p className="home-mobile-subtitle">
            انتقل بين الترجمة، التحويل الصوتي، والتعلّم داخل تجربة ذكية
            مصممة لتسهيل التواصل.
          </p>
        </div>

        <div className="home-mobile-cards">
          <Link href="/translation/camera" className="home-mobile-card">
            <div className="home-mobile-card-top">
              <div className="home-mobile-card-icon">
                <Camera size={20} />
              </div>

              <div className="home-mobile-card-title">
                ترجمة لغة الإشارة
              </div>
            </div>

            <div className="home-mobile-card-desc">
              استخدم الكاميرا لتحليل الإشارات وتحويلها إلى نص وصوت بشكل فوري.
            </div>

            <div className="home-mobile-card-link">
              <span>ابدأ الآن</span>
              <ArrowLeft size={14} />
            </div>
          </Link>

          <Link href="/translation/speech" className="home-mobile-card">
            <div className="home-mobile-card-top">
              <div className="home-mobile-card-icon">
                <Mic size={20} />
              </div>

              <div className="home-mobile-card-title">
                تحويل الكلام إلى لغة الإشارة
              </div>
            </div>

            <div className="home-mobile-card-desc">
              تحدث مباشرة وسيقوم النظام بتحويل الكلام إلى عرض بصري.
            </div>

            <div className="home-mobile-card-link">
              <span>ابدأ الآن</span>
              <ArrowLeft size={14} />
            </div>
          </Link>

          <Link href="/admin/courses" className="home-mobile-card">
            <div className="home-mobile-card-top">
              <div className="home-mobile-card-icon">
                <BookOpen size={20} />
              </div>

              <div className="home-mobile-card-title">
                تعلم لغة الإشارة
              </div>
            </div>

            <div className="home-mobile-card-desc">
              ابدأ رحلتك التعليمية داخل مكتبة دروس احترافية.
            </div>

            <div className="home-mobile-card-link">
              <span>ابدأ الآن</span>
              <ArrowLeft size={14} />
            </div>
          </Link>
        </div>
      </div>
    </MobileChrome>
  );
}