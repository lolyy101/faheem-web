import Link from "next/link";
import { Globe, Headphones, Shield, User } from "lucide-react";
import AuthCard from "@/components/auth/AuthCard";

export default function EnglishHomePage() {
  return (
    <main className="faheem-page">
      <section className="mobile-frame">
        <div className="screen-content home-screen" dir="ltr">
          <div className="top-language top-language-en">
            <div className="lang-circle">
              <Globe size={18} />
            </div>

            <Link href="/" className="lang-label">
              AR
            </Link>
          </div>

          <div className="home-logo-wrap">
            <div className="home-logo-glow" />
            <img src="/logo.png" alt="Faheem Logo" className="home-logo" />
          </div>

          <h1 className="hero-title-en">Welcome to Faheem</h1>

          <p className="hero-text en-text">
            An innovative digital platform designed to simplify communication
            and enhance the user experience.
          </p>

          <p className="hero-subtext en-text">
            Please select your access level
            <br />
            to begin your digital journey.
          </p>

          <div className="cards-stack">
            <Link href="/login?role=user" className="card-link">
              <AuthCard
                title="User"
                description="Provides personalized access to AI-powered tools such as translation, voice assistant, and visual recognition technologies."
                icon={<User size={22} strokeWidth={2.2} />}
                dir="ltr"
              />
            </Link>

            <Link href="/login?role=admin" className="card-link">
              <AuthCard
                title="System Administrator"
                description="Manages access policies within the system, controls user permissions, and monitors usage analytics."
                icon={<Shield size={22} strokeWidth={2.2} />}
                dir="ltr"
              />
            </Link>

            <Link href="/login?role=support" className="card-link">
              <AuthCard
                title="Technical Support"
                description="Provides technical support, system maintenance, and manages backend configurations."
                icon={<Headphones size={22} strokeWidth={2.2} />}
                dir="ltr"
              />
            </Link>
          </div>

          <div className="bottom-auth-link bottom-auth-link-en">
            Don’t have an account?{" "}
            <Link href="/signup">
              <span>Sign up</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}