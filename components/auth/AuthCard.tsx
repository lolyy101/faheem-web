import { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  icon: ReactNode;
  dir?: "rtl" | "ltr";
};

export default function AuthCard({
  title,
  description,
  icon,
  dir = "rtl",
}: AuthCardProps) {
  const isEnglish = dir === "ltr";

  return (
    <div className={`auth-card ${isEnglish ? "en" : "ar"}`} dir={dir}>
      <div className={`auth-card-header ${isEnglish ? "en" : "ar"}`}>
        {isEnglish ? (
          <>
            <div className="auth-card-icon">{icon}</div>
            <div className="auth-card-title">{title}</div>
          </>
        ) : (
          <>
            <div className="auth-card-title">{title}</div>
            <div className="auth-card-icon">{icon}</div>
          </>
        )}
      </div>

      <div className="auth-card-desc">{description}</div>
    </div>
  );
}