"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the supported languages
type Language = "en" | "ar";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Simple translation dictionary
const translations = {
  en: {
    // Footer
    copyright: "© 2024 EduMind - Smart Exam Creation Platform",
    madeWith: "Made with",
    forTeachers: "for teachers and educators",
    // Navigation
    home: "Home",
    createExam: "Create Exams",
    myExams: "My Exams",
    signIn: "Sign In",
    signOut: "Sign Out",
    // ChatWindow
    smartExamCreation: "Smart Exam Creation",
    createCustomExam: "Create a custom exam for any subject or course",
    connected: "Connected to EduMind AI · Ready",
    notConnected: "Not connected",
    inputPlaceholder: "Enter the description of the exam you want to create... (e.g., Math exam for 10th grade)",
    clearInput: "Clear input",
    resetChat: "Reset conversation",
    creating: "Creating",
    createExamBtn: "Create Exam",
    serverError: "🚨 An error occurred connecting to the server. Please try again later.",
    switchToArabic: "Switch to Arabic",
    switchToEnglish: "Switch to English",
    homepageHeroTitle: "Create your custom exams for any subject",
    homepageHeroSubtitle: "The AI platform for creating exams for all subjects and courses easily and quickly.",
    homepageHeroButton: "Start Creating Exams",
    homepageFeaturesTitle: "Everything you need to create perfect exams",
    homepageFeaturesSubtitle: "Simplify exam preparation with AI tools designed for teachers and educators.",
    homepageFeature1Title: "Smart Exam Creation",
    homepageFeature1Desc: "Create exams for any subject by describing your needs in Arabic or English, and let AI do the rest.",
    homepageFeature2Title: "All Subjects & Courses",
    homepageFeature2Desc: "Supports creating exams for all school subjects and training courses with difficulty customization.",
    homepageFeature3Title: "Instant Export",
    homepageFeature3Desc: "Download your exams as PDF, DOCX, or JSON with one click.",
    homepageSubjectsTitle: "Supports all subjects and courses",
    homepageSubjectsSubtitle: "Create exams for any subject or course you want",
    homepageCTATitle: "Get Started Now",
    homepageCTASubtitle: "Join thousands of teachers using EduMind to create their exams",
    homepageCTABtn: "Start Creating Exams",
    homepageSubjects: ["Mathematics", "Science", "Arabic Language", "English Language", "History", "Geography", "Physics", "Chemistry", "Biology", "Programming", "Economics", "Philosophy", "Psychology", "Medicine"],
    homepageHeroTitleSubject: "for any subject",
    // Sidebar/Exam Templates
    sidebarCreateExam: "Create Exams",
    sidebarQuickCreate: "Quick Create",
    sidebarNewCustomExam: "New Custom Exam",
    sidebarExamTemplates: "Exam Templates",
    sidebarRecentExams: "Recent Exams",
    sidebarNoTemplates: "No templates found",
    sidebarSearchPlaceholder: "Search for a subject...",
    sidebarMath: "Mathematics",
    sidebarMathDesc: "Exams in algebra, geometry, calculus",
    sidebarScience: "Science",
    sidebarScienceDesc: "Exams in physics, chemistry, biology",
    sidebarLanguages: "Languages",
    sidebarLanguagesDesc: "Exams in Arabic, English, French",
    sidebarHistory: "History & Geography",
    sidebarHistoryDesc: "Exams in history, geography, national education",
    sidebarProgramming: "Programming",
    sidebarProgrammingDesc: "Exams in programming, algorithms, databases",
    sidebarAllGrades: "All Grades",
    sidebarSecondaryUniversity: "Secondary & University",
    sidebarMCQ: "Multiple Choice",
    sidebarCalculations: "Calculations",
    sidebarProofs: "Proofs",
    sidebarExperiments: "Experiments",
    sidebarAnalysis: "Analysis",
    sidebarGrammar: "Grammar",
    sidebarReading: "Reading",
    sidebarEssay: "Essay",
    sidebarCoding: "Coding",
    sidebarGrade: "Grade",
    sidebarTypes: "types",
    sidebarRecentExamTitle: "Exam Title",
    sidebarRecentExamSubject: "Subject",
    sidebarRecentExamQuestions: "Questions",
    sidebarRecentExamDate: "Date",
    sidebarNoRecentExams: "No recent exams",
  },
  ar: {
    // Footer
    copyright: "© 2024 EduMind - منصة إنشاء الاختبارات الذكية",
    madeWith: "مصنوع بـ",
    forTeachers: "للمعلمين والمدرسين",
    // Navigation
    home: "الرئيسية",
    createExam: "إنشاء الاختبارات",
    myExams: "اختباراتي",
    signIn: "تسجيل الدخول",
    signOut: "تسجيل الخروج",
    // ChatWindow
    smartExamCreation: "إنشاء الاختبارات الذكي",
    createCustomExam: "أنشئ اختباراً مخصصاً لأي مادة أو دورة تدريبية",
    connected: "متصل بـ EduMind AI · جاهز",
    notConnected: "غير متصل",
    inputPlaceholder: "أدخل وصف الاختبار الذي تريد إنشاءه... (مثال: اختبار في الرياضيات للصف العاشر)",
    clearInput: "مسح الإدخال",
    resetChat: "إعادة تعيين المحادثة",
    creating: "جاري الإنشاء",
    createExamBtn: "إنشاء الاختبار",
    serverError: "🚨 حدث خطأ في الاتصال بالخادم. حاول مرة أخرى لاحقًا.",
    switchToArabic: "التبديل إلى العربية",
    switchToEnglish: "التبديل إلى الإنجليزية",
    homepageHeroTitle: "أنشئ اختباراتك المخصصة لأي مادة",
    homepageHeroSubtitle: "منصة الذكاء الاصطناعي لإنشاء اختبارات لجميع المواد والدورات التدريبية بسهولة وسرعة.",
    homepageHeroButton: "ابدأ بإنشاء الاختبارات",
    homepageFeaturesTitle: "كل ما تحتاجه لإنشاء اختبارات مثالية",
    homepageFeaturesSubtitle: "سهّل عملية إعداد الاختبارات مع أدوات الذكاء الاصطناعي المصممة للمعلمين والمدرسين.",
    homepageFeature1Title: "إنشاء ذكي للاختبارات",
    homepageFeature1Desc: "أنشئ اختبارات لأي مادة عبر وصف احتياجاتك باللغة العربية أو الإنجليزية، ودع الذكاء الاصطناعي يتولى الباقي.",
    homepageFeature2Title: "جميع المواد والدورات",
    homepageFeature2Desc: "يدعم إنشاء اختبارات لجميع المواد الدراسية والدورات التدريبية مع تخصيص مستوى الصعوبة.",
    homepageFeature3Title: "تصدير فوري",
    homepageFeature3Desc: "حمّل اختباراتك بصيغ PDF أو DOCX أو JSON بضغطة زر واحدة.",
    homepageSubjectsTitle: "يدعم جميع المواد والدورات",
    homepageSubjectsSubtitle: "أنشئ اختبارات لأي مادة أو دورة تدريبية تريدها",
    homepageCTATitle: "ابدأ الآن",
    homepageCTASubtitle: "انضم إلى آلاف المعلمين الذين يستخدمون EduMind لإنشاء اختباراتهم",
    homepageCTABtn: "ابدأ بإنشاء الاختبارات",
    homepageSubjects: ["الرياضيات", "العلوم", "اللغة العربية", "اللغة الإنجليزية", "التاريخ", "الجغرافيا", "الفيزياء", "الكيمياء", "الأحياء", "البرمجة", "الاقتصاد", "الفلسفة", "علم النفس", "الطب"],
    homepageHeroTitleSubject: "لأي مادة",
    // Sidebar/Exam Templates
    sidebarCreateExam: "إنشاء الاختبارات",
    sidebarQuickCreate: "إنشاء سريع",
    sidebarNewCustomExam: "اختبار مخصص جديد",
    sidebarExamTemplates: "قوالب الاختبارات",
    sidebarRecentExams: "الاختبارات الحديثة",
    sidebarNoTemplates: "لم يتم العثور على قوالب",
    sidebarSearchPlaceholder: "ابحث عن مادة...",
    sidebarMath: "الرياضيات",
    sidebarMathDesc: "اختبارات في الجبر، الهندسة، التفاضل والتكامل",
    sidebarScience: "العلوم",
    sidebarScienceDesc: "اختبارات في الفيزياء، الكيمياء، الأحياء",
    sidebarLanguages: "اللغات",
    sidebarLanguagesDesc: "اختبارات في العربية، الإنجليزية، الفرنسية",
    sidebarHistory: "التاريخ والجغرافيا",
    sidebarHistoryDesc: "اختبارات في التاريخ، الجغرافيا، التربية الوطنية",
    sidebarProgramming: "البرمجة",
    sidebarProgrammingDesc: "اختبارات في البرمجة، الخوارزميات، قواعد البيانات",
    sidebarAllGrades: "جميع المراحل",
    sidebarSecondaryUniversity: "الثانوية والجامعة",
    sidebarMCQ: "اختيار من متعدد",
    sidebarCalculations: "حسابات",
    sidebarProofs: "براهين",
    sidebarExperiments: "تجارب",
    sidebarAnalysis: "تحليل",
    sidebarGrammar: "قواعد",
    sidebarReading: "قراءة",
    sidebarEssay: "مقالي",
    sidebarCoding: "برمجة",
    sidebarGrade: "المرحلة",
    sidebarTypes: "أنواع",
    sidebarRecentExamTitle: "عنوان الاختبار",
    sidebarRecentExamSubject: "المادة",
    sidebarRecentExamQuestions: "عدد الأسئلة",
    sidebarRecentExamDate: "تاريخ",
    sidebarNoRecentExams: "لا توجد اختبارات حديثة",
  },
};

export function useTranslation() {
  const { language } = useLanguage();
  return (key: keyof typeof translations["en"]) => translations[language][key] || key;
} 