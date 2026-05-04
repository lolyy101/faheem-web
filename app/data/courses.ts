export type LessonItem = {
  id: number;
  title: string;
  duration: string;
  description: string;
  completed?: boolean;
};

export type CourseItem = {
  id: number;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  level: string;
  duration: string;
  lessonsCount: number;
  students: number;
  image: string;
  lessons: LessonItem[];
};

export const coursesData: CourseItem[] = [
  {
    id: 1,
    slug: "basic-sign-language",
    title: "دورة أساسيات لغة الإشارة",
    description: "ابدأ رحلتك في تعلم الأساسيات للتواصل اليومي.",
    longDescription:
      "دورة عملية مصممة للمبتدئين لتعليم أساسيات لغة الإشارة بأسلوب سهل وتدريجي. تساعد المتعلم على فهم المفردات الأساسية، التحيات، التعبيرات اليومية، وطريقة استخدام لغة الإشارة في المواقف الواقعية.",
    level: "مبتدئ",
    duration: "3 أيام",
    lessonsCount: 6,
    students: 24,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      {
        id: 1,
        title: "مقدمة في لغة الإشارة",
        duration: "8 دقائق",
        description: "تعرف على أهمية لغة الإشارة وأساسيات استخدامها.",
        completed: true,
      },
      {
        id: 2,
        title: "التحيات والتعابير اليومية",
        duration: "10 دقائق",
        description: "تعلم إشارات مثل مرحبًا، شكرًا، نعم، لا.",
        completed: true,
      },
      {
        id: 3,
        title: "التعارف وتقديم النفس",
        duration: "9 دقائق",
        description: "كيف تقدم نفسك وتسأل عن الاسم والحالة.",
      },
      {
        id: 4,
        title: "إشارات الحياة اليومية",
        duration: "11 دقيقة",
        description: "كلمات أساسية تستخدم في المواقف اليومية.",
      },
      {
        id: 5,
        title: "التواصل في الأماكن العامة",
        duration: "12 دقيقة",
        description: "إشارات مفيدة في المتجر، الطريق، والمستشفى.",
      },
      {
        id: 6,
        title: "تقييم نهائي وتطبيق عملي",
        duration: "7 دقائق",
        description: "مراجعة شاملة واختبار بسيط للمكتسبات.",
      },
    ],
  },
  {
    id: 2,
    slug: "sign-language-course",
    title: "دورة لغة الإشارة",
    description: "تعلم إشارات أكثر واستخدمها في مواقف مختلفة.",
    longDescription:
      "دورة تطويرية تركز على الانتقال من الأساسيات إلى الاستخدام العملي للغة الإشارة في بيئات متعددة مثل التعليم، الرعاية، والتواصل الاجتماعي.",
    level: "متوسط",
    duration: "5 أيام",
    lessonsCount: 8,
    students: 18,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      {
        id: 1,
        title: "مراجعة المفردات الأساسية",
        duration: "7 دقائق",
        description: "مراجعة سريعة للأساسيات المهمة.",
      },
      {
        id: 2,
        title: "التواصل داخل المستشفى",
        duration: "12 دقيقة",
        description: "إشارات تساعد في المواقف الصحية الأساسية.",
      },
      {
        id: 3,
        title: "التواصل داخل الجامعة والمدرسة",
        duration: "10 دقائق",
        description: "مفردات ومواقف تعليمية شائعة.",
      },
      {
        id: 4,
        title: "الأسئلة الشائعة بلغة الإشارة",
        duration: "9 دقائق",
        description: "كيف، أين، لماذا، متى، من.",
      },
      {
        id: 5,
        title: "التعبير عن الاحتياجات",
        duration: "8 دقائق",
        description: "أحتاج، أريد، لا أفهم، ساعدني.",
      },
      {
        id: 6,
        title: "حوار تطبيقي",
        duration: "14 دقيقة",
        description: "تطبيق عملي على محادثة كاملة.",
      },
      {
        id: 7,
        title: "اختبار قصير",
        duration: "6 دقائق",
        description: "قياس مستوى الفهم والتقدم.",
      },
      {
        id: 8,
        title: "إصدار الشهادة",
        duration: "5 دقائق",
        description: "استكمال الدورة وإنهاء المتطلبات.",
      },
    ],
  },
  {
    id: 3,
    slug: "daily-sign-communication",
    title: "دورة التواصل اليومي بلغة الإشارة",
    description: "ركز على المواقف اليومية والعبارات الأكثر استخدامًا.",
    longDescription:
      "دورة عملية تركز على التواصل اليومي الحقيقي، وتساعد المستخدم على استخدام لغة الإشارة في الحياة اليومية بسرعة وثقة.",
    level: "مبتدئ - متوسط",
    duration: "4 أيام",
    lessonsCount: 5,
    students: 31,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop",
    lessons: [
      {
        id: 1,
        title: "التحيات والتعارف",
        duration: "8 دقائق",
        description: "المفردات الأولى في أي تواصل.",
      },
      {
        id: 2,
        title: "الطلبات والاحتياجات",
        duration: "11 دقيقة",
        description: "كيف تطلب المساعدة أو توضح حاجتك.",
      },
      {
        id: 3,
        title: "التسوق والخدمات",
        duration: "10 دقائق",
        description: "إشارات مفيدة في المتاجر والخدمات.",
      },
      {
        id: 4,
        title: "الوقت والمكان",
        duration: "9 دقائق",
        description: "اليوم، غدًا، هنا، هناك، قريب، بعيد.",
      },
      {
        id: 5,
        title: "مراجعة وتطبيق",
        duration: "7 دقائق",
        description: "دمج المهارات في مواقف واقعية.",
      },
    ],
  },
];