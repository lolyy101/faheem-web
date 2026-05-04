"use client";

import { Suspense } from "react";
import ResetContent from "./ResetContent";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <ResetContent />
    </Suspense>
  );
}