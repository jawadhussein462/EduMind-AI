"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { BookOpen, Sparkles } from "lucide-react";
import { useTranslation, useLanguage } from "@/components/language-provider";

const gradeKeys = [
  "grade1", "grade2", "grade3", "grade4", "grade5", "grade6", "grade7", "grade8", "grade9", "grade10", "grade11", "grade12"
] as const;
type GradeKey = typeof gradeKeys[number];

export default function AskAIPage() {
  const t = useTranslation();
  const { language } = useLanguage();
  const [grade, setGrade] = useState<GradeKey | "">("");
  const [topic, setTopic] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // TODO: Replace with real API call
    setTimeout(() => {
      setAnswer(`${t("aiAnswerPrefix")} ${grade ? t(grade) : ""} - ${topic}: "${question}"`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <Card className="w-full max-w-2xl p-8 shadow-xl border-2 border-indigo-200 bg-white">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-8 w-8 text-indigo-500" />
          <h1 className="text-3xl font-extrabold text-indigo-700 tracking-tight">{t("askAITitle")}</h1>
        </div>
        <p className="mb-6 text-gray-600 text-center" dir={language === "ar" ? "rtl" : "ltr"}>
          {t("askAIDescription1")}<br/>
          {t("askAIDescription2")}
        </p>
        <form onSubmit={handleAsk} className="flex flex-col gap-4">
          <div className="flex gap-4">
            <select
              className="w-1/2 rounded border border-indigo-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={grade}
              onChange={e => setGrade(e.target.value as GradeKey)}
              required
            >
              <option value="">{t("selectGrade")}</option>
              {gradeKeys.map(g => <option key={g} value={g}>{t(g)}</option>)}
            </select>
            <Input
              className="w-1/2"
              type="text"
              placeholder={t("topicPlaceholder")}
              value={topic}
              onChange={e => setTopic(e.target.value)}
              required
            />
          </div>
          <Input
            type="text"
            placeholder={t("questionPlaceholder")}
            value={question}
            onChange={e => setQuestion(e.target.value)}
            required
          />
          <Button type="submit" disabled={loading || !question || !grade || !topic} className="mt-2">
            {loading ? t("asking") : t("askAIButton")}
          </Button>
        </form>
        {answer && (
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-100 border border-indigo-200 shadow flex items-start gap-3">
            <BookOpen className="h-7 w-7 text-indigo-400 mt-1" />
            <div>
              <h2 className="font-semibold text-indigo-700 mb-1">{t("aiAnswerLabel")}</h2>
              <p className="text-gray-800 whitespace-pre-line">{answer}</p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
} 