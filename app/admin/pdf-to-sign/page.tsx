"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { Upload, FileText, Sparkles, Languages } from "lucide-react";
import { useState } from "react";

export default function PdfToSignPage() {

const [uploaded,setUploaded]=useState(false);
const [translated,setTranslated]=useState(false);

return(
<MobileChrome backHref="/admin/dashboard">
<div className="epic-dashboard-shell" dir="rtl">

<div className="epic-dashboard-header">

<div className="epic-dashboard-badge">
<Sparkles size={14}/>
تحويل المحتوى الذكي
</div>

<div className="admin-page-logo-wrap">
<div className="admin-page-logo-glow"/>
<img src="/logo.png" className="admin-page-logo"/>
</div>

<h1 className="epic-dashboard-title">
تحويل PDF إلى درس بلغة الإشارة
</h1>

<p className="epic-dashboard-subtitle">
ارفع محتوى PDF وسيقوم النظام بتحويله إلى درس تعليمي مترجم بلغة الإشارة.
</p>

</div>


<div className="epic-dashboard-hero-card">

<div className="epic-dashboard-hero-top">
<div className="epic-dashboard-hero-icon">
<FileText size={26}/>
</div>

<div>
<div className="epic-dashboard-hero-heading">
رفع المحتوى التعليمي
</div>

<div className="epic-dashboard-hero-text">
تحميل ملف وتحويله تلقائياً لدروس قابلة للتعلم
</div>
</div>
</div>


<button
className="epic-dashboard-action primary"
onClick={()=>setUploaded(true)}
>
<Upload size={18}/>
رفع ملف PDF
</button>

{uploaded && (
<>
<br/>

<div className="epic-dashboard-highlight-box">
تم رفع الملف:
Introduction_to_Sign_Language.pdf
</div>

<br/>

<button
className="epic-dashboard-action secondary"
onClick={()=>setTranslated(true)}
>
<Languages size={18}/>
تحويل إلى لغة الإشارة
</button>
</>
)}

</div>


{translated && (
<div className="epic-dashboard-activity-card">

<div className="epic-dashboard-activity-title">
الدرس الناتج
</div>

<div className="epic-dashboard-timeline">

<div className="epic-dashboard-timeline-item">
<div className="epic-dashboard-timeline-dot success"/>
<div className="epic-dashboard-timeline-content">
<div className="epic-dashboard-timeline-main">
Lesson 1 مقدمة لغة الإشارة
</div>
<div className="epic-dashboard-timeline-sub">
تم استخراج الدرس من ملف PDF
</div>
</div>
</div>


<div className="epic-dashboard-timeline-item">
<div className="epic-dashboard-timeline-dot primary"/>
<div className="epic-dashboard-timeline-content">
<div className="epic-dashboard-timeline-main">
ترجمة الإشارات جاهزة
</div>
<div className="epic-dashboard-timeline-sub">
Avatar Sign Language Ready
</div>
</div>
</div>


<div className="epic-dashboard-timeline-item">
<div className="epic-dashboard-timeline-dot warning"/>
<div className="epic-dashboard-timeline-content">
<div className="epic-dashboard-timeline-main">
تم حفظ الدرس ضمن الدورات
</div>
<div className="epic-dashboard-timeline-sub">
أصبح متاحاً للمستخدمين للتعلم
</div>
</div>
</div>

</div>

<button
className="epic-dashboard-action primary"
style={{marginTop:"18px"}}
>
نشر داخل الدورات
</button>

</div>
)}

</div>
</MobileChrome>
)

}