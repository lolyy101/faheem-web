"use client";

import { Suspense } from "react";
import ArabicLoginPage from "@/app/login/page"; // أو المسار الصحيح لصفحتك

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ArabicLoginPage />
    </Suspense>
  );
}