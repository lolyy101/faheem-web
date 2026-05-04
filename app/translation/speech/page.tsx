"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { Mic, Sparkles, Volume2, Waves } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ENDPOINTS } from "@/lib/endpoints";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function SpeechTranslationPage() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("مرحبًا، كيف الحال؟");
  const [status, setStatus] = useState("اضغط على الدائرة للبدء");
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setStatus("المتصفح لا يدعم التعرف على الصوت");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "ar-SA";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
      setStatus("جارٍ الاستماع...");
    };

    recognition.onend = () => {
      setIsListening(false);
      setStatus("تم إيقاف الاستماع");
    };

    recognition.onresult = async (event: any) => {
      let finalTranscript = "";

      for (let i = 0; i < event.results.length; i++) {
        finalTranscript += event.results[i][0].transcript + " ";
      }

      const cleanText = finalTranscript.trim();
      setTranscript(cleanText || "...");

      try {
        await fetch(ENDPOINTS.aiTranslations, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: cleanText,
            source: "speech",
            target: "sign",
          }),
        });
      } catch {
        // تجاهل الخطأ مؤقتًا حتى لا تتوقف التجربة
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const speakText = (text: string) => {
    if (!text?.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ar-SA";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const handleToggle = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const handleBottomAction = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      return;
    }

    speakText(transcript);
  };

  return (
    <MobileChrome backHref="/home">
      <div className="voice-mobile-screen" dir="rtl">
        <div className="voice-mobile-header">
          <div className="voice-mobile-badge">
            <Sparkles size={13} />
            المحرك الصوتي الذكي
          </div>

          <div className="feature-logo-wrap">
            <div className="feature-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="feature-logo" />
          </div>

          <h1 className="voice-mobile-title">تحويل الكلام إلى لغة الإشارة</h1>

          <p className="voice-mobile-subtitle">
            تحدث مباشرة، وسيقوم النظام بالتقاط الصوت وتحويله إلى نص قابل للعرض
            والمعالجة بشكل فوري.
          </p>
        </div>

        <div className="voice-mobile-stage-card">
          <div className="voice-mobile-chip">
            <Waves size={14} />
            {status}
          </div>

          <button
            type="button"
            onClick={handleToggle}
            className={`voice-mobile-mic ${isListening ? "active" : ""}`}
          >
            <span className="voice-mobile-pulse pulse-1" />
            <span className="voice-mobile-pulse pulse-2" />
            <span className="voice-mobile-pulse pulse-3" />

            <span className="voice-mobile-mic-core">
              <Mic size={58} color="#ffffff" strokeWidth={2.5} />
            </span>
          </button>

          <div className={`voice-mobile-state ${isListening ? "live" : ""}`}>
            {isListening ? "يتم الاستماع الآن..." : "اضغط للبدء"}
          </div>

          <div className="voice-mobile-helper">
            يتم الآن تحويل الكلام إلى لغة إشارة
          </div>
        </div>

        <div className="voice-mobile-result-card">
          <div className="voice-mobile-result-head">
            <div className="voice-mobile-result-icon">
              <Volume2 size={18} />
            </div>

            <div className="voice-mobile-result-title">النص المسموع</div>
          </div>

          <div className="voice-mobile-result-text">{transcript}</div>
        </div>

        <button className="voice-mobile-action-btn" onClick={handleBottomAction}>
          <span className="voice-mobile-action-inner">
            <Volume2 size={18} />
            {isListening ? "إيقاف الترجمة" : "تشغيل الصوت"}
          </span>
        </button>
      </div>
    </MobileChrome>
  );
}