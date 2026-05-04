import Link from "next/link";
import { Globe, Headphones, Shield, User } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";

export default function HomePage() {
  return (
    <main className="faheem-page">
      <section className="mobile-frame">
        <div className="screen-content home-screen" dir="rtl">
          <div className="top-language">
            <div className="lang-circle">
              <Globe size={18} />
            </div>

            <Link href="/en" className="lang-label">
              EN
            </Link>
          </div>

          <div className="home-logo-wrap">
            <div className="home-logo-glow" />
            <img src="/logo.png" alt="Faheem Logo" className="home-logo" />
          </div>

          <h1 className="hero-title-ar">مرحبًا بك في فهيم</h1>

          <p className="hero-text">
            منصة رقمية مبتكرة تهدف إلى تسهيل التواصل وتعزيز تجربة المستخدم.
          </p>

          <p className="hero-subtext">
            يرجى اختيار مستوى الوصول للبدء
            <br />
            في رحلتك الرقمية.
          </p>

          <div className="cards-stack">
            <Link href="/login?role=user" className="card-link">
              <AuthCard
                title="المستخدم"
                description="يوفر وصولًا شخصيًا إلى أدوات مدعومة بالذكاء الاصطناعي، مثل الترجمة، المساعد الصوتي، وتقنيات التعرف البصري"
                icon={<User size={22} strokeWidth={2.2} />}
                dir="rtl"
              />
            </Link>

            <Link href="/login?role=admin" className="card-link">
              <AuthCard
                title="مدير النظام"
                description="إدارة سياسات الوصول داخل النظام، التحكم في صلاحيات المستخدمين، ومتابعة تحليلات الاستخدام"
                icon={<Shield size={22} strokeWidth={2.2} />}
                dir="rtl"
              />
            </Link>

            <Link href="/login?role=support" className="card-link">
              <AuthCard
                title="الدعم الفني"
                description="تقديم الدعم التقني، صيانة النظام، وإدارة إعدادات البنية التحتية"
                icon={<Headphones size={22} strokeWidth={2.2} />}
                dir="rtl"
              />
            </Link>
          </div>

          <div className="bottom-auth-link">
            ليس لديك حساب؟{" "}
            <Link href="/signup">
              <span>إنشاء حساب</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}