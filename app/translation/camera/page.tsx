"use client";

import MobileChrome from "@/components/layout/MobileChrome";
import { Camera, ScanLine, Sparkles, Volume2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  FilesetResolver,
  GestureRecognizer,
  type GestureRecognizerResult,
} from "@mediapipe/tasks-vision";

type RecognizedLabel =
  | "Open_Palm"
  | "Closed_Fist"
  | "Pointing_Up"
  | "Thumb_Up"
  | "Thumb_Down"
  | "Victory"
  | "ILoveYou"
  | string;

const gestureToArabic = (label: RecognizedLabel) => {
  switch (label) {
    case "Open_Palm":
      return "سلام";
    case "Closed_Fist":
      return "توقف";
    case "Pointing_Up":
      return "واحد";
    case "Thumb_Up":
      return "نعم";
    case "Thumb_Down":
      return "لا";
    case "Victory":
      return "انتصار";
    case "ILoveYou":
      return "أحبك";
    default:
      return "لم يتم التعرف على الإشارة";
  }
};

export default function CameraTranslationPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gestureRecognizerRef = useRef<GestureRecognizer | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const lastVideoTimeRef = useRef<number>(-1);

  const [streamStarted, setStreamStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [cameraError, setCameraError] = useState("");
  const [translatedText, setTranslatedText] = useState("بانتظار الإشارة...");
  const [rawGesture, setRawGesture] = useState("—");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [lastStableText, setLastStableText] = useState("بانتظار الإشارة...");

  useEffect(() => {
    let mediaStream: MediaStream | null = null;
    let mounted = true;

    const setupGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
        },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.5,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      gestureRecognizerRef.current = recognizer;
    };

    const startCamera = async () => {
      try {
        setLoading(true);
        setCameraError("");

        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("هذا المتصفح لا يدعم تشغيل الكاميرا.");
        }

        await setupGestureRecognizer();

        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
            width: { ideal: 720 },
            height: { ideal: 1280 },
          },
          audio: false,
        });

        if (!mounted || !videoRef.current) return;

        const video = videoRef.current;
        video.srcObject = mediaStream;
        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;

        video.onloadedmetadata = async () => {
          try {
            await video.play();
            if (!mounted) return;
            setStreamStarted(true);
            setLoading(false);
            runPredictionLoop();
          } catch (err) {
            console.error(err);
            if (!mounted) return;
            setCameraError("تم السماح بالكاميرا لكن الفيديو لم يبدأ.");
            setLoading(false);
          }
        };
      } catch (error: any) {
        console.error("Camera / gesture setup error:", error);

        let message = "تعذر تشغيل الكاميرا أو نموذج التحليل.";

        if (error?.name === "NotAllowedError") {
          message =
            "تم رفض إذن الكاميرا. اسمحي بالكاميرا من المتصفح ثم أعيدي تحميل الصفحة.";
        } else if (error?.name === "NotFoundError") {
          message = "لم يتم العثور على كاميرا في هذا الجهاز.";
        } else if (error?.name === "NotReadableError") {
          message = "الكاميرا مستخدمة من تطبيق آخر.";
        } else if (error?.message) {
          message = error.message;
        }

        if (!mounted) return;
        setCameraError(message);
        setLoading(false);
        setStreamStarted(false);
      }
    };

    const runPredictionLoop = () => {
      const loop = () => {
        const video = videoRef.current;
        const recognizer = gestureRecognizerRef.current;

        if (
          video &&
          recognizer &&
          video.readyState >= 2 &&
          video.currentTime !== lastVideoTimeRef.current
        ) {
          lastVideoTimeRef.current = video.currentTime;

          const nowInMs = performance.now();
          const result: GestureRecognizerResult = recognizer.recognizeForVideo(
            video,
            nowInMs
          );

          if (result.gestures.length > 0 && result.gestures[0].length > 0) {
            const best = result.gestures[0][0];
            const englishLabel = best.categoryName as RecognizedLabel;
            const arabicText = gestureToArabic(englishLabel);

            setRawGesture(englishLabel);
            setConfidence(best.score ?? null);
            setTranslatedText(arabicText);

            if (arabicText !== "لم يتم التعرف على الإشارة") {
              setLastStableText(arabicText);
            }
          }
        }

        animationFrameRef.current = window.requestAnimationFrame(loop);
      };

      animationFrameRef.current = window.requestAnimationFrame(loop);
    };

    startCamera();

    return () => {
      mounted = false;

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (gestureRecognizerRef.current) {
        gestureRecognizerRef.current.close();
        gestureRecognizerRef.current = null;
      }

      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleCaptureAndTranslate = () => {
    if (!streamStarted) return;

    setTranslatedText(lastStableText);

    if (lastStableText && lastStableText !== "بانتظار الإشارة...") {
      const utterance = new SpeechSynthesisUtterance(lastStableText);
      utterance.lang = "ar-SA";
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <MobileChrome backHref="/home">
      <div className="camera-mobile-screen" dir="rtl">
        <div className="camera-mobile-header">
          <div className="camera-mobile-badge">
            <Sparkles size={13} />
            تحليل الإشارة الذكي
          </div>

          <div className="feature-logo-wrap">
            <div className="feature-logo-glow" />
            <img src="/logo.png" alt="Faheem" className="feature-logo" />
          </div>

          <h1 className="camera-mobile-title">ترجمة لغة الإشارة</h1>

          <p className="camera-mobile-subtitle">
            وجّهي الكاميرا نحو يدك، وسيقوم النظام بالتعرف على الإشارة وتحويلها
            إلى نص بشكل مباشر.
          </p>
        </div>

        <div className="camera-mobile-preview-card">
          <div className="camera-mobile-preview-top">
            <div className="camera-mobile-preview-chip">
              <ScanLine size={14} />
              {loading ? "جاري تجهيز التحليل..." : "وضع الرؤية"}
            </div>
          </div>

          <div className="camera-mobile-preview-frame">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="camera-mobile-video"
              style={{
                display: streamStarted ? "block" : "none",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />

            {streamStarted ? (
              <div className="camera-mobile-overlay">
                <div className="camera-mobile-scan-line" />
                <div className="camera-mobile-corner top-right" />
                <div className="camera-mobile-corner top-left" />
                <div className="camera-mobile-corner bottom-right" />
                <div className="camera-mobile-corner bottom-left" />
              </div>
            ) : (
              <div className="camera-mobile-placeholder">
                <Camera size={92} />
              </div>
            )}
          </div>

          <div className="camera-mobile-helper">
            {cameraError ||
              "الإيماءات الجاهزة المدعومة حاليًا: نعم، لا، سلام، توقف، واحد، انتصار"}
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: "none" }} />

        <div className="camera-mobile-result-card">
          <div className="camera-mobile-result-head">
            <div className="camera-mobile-result-icon">
              <Volume2 size={18} />
            </div>
            <div className="camera-mobile-result-title">النص المترجم</div>
          </div>

          <div className="camera-mobile-result-text">{translatedText}</div>

          <div
            style={{
              marginTop: "10px",
              fontSize: "12px",
              color: "#a7adbb",
              lineHeight: 1.8,
            }}
          >
            <div>الإشارة المكتشفة: {rawGesture}</div>
            <div>
              الثقة: {confidence !== null ? `${Math.round(confidence * 100)}%` : "—"}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="camera-mobile-action-btn"
          onClick={handleCaptureAndTranslate}
          disabled={loading || !streamStarted}
        >
          <span className="camera-mobile-action-inner">
            التقاط وترجمة
          </span>
        </button>
      </div>
    </MobileChrome>
  );
}