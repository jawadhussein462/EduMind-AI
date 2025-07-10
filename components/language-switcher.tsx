"use client"

import { useLanguage } from "./language-provider";
import { Button } from "./ui/button";
import { useTranslation } from "./language-provider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const t = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return (
    <Button onClick={toggleLanguage} variant="outline">
      {language === "en" ? t("switchToArabic") : t("switchToEnglish")}
    </Button>
  );
} 