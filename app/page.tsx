"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, MessageSquare, Database, Download, Check, Star, BookOpen, GraduationCap, FileText } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    icon: MessageSquare,
    title: "إنشاء ذكي للاختبارات",
    description: "أنشئ اختبارات لأي مادة عبر وصف احتياجاتك باللغة العربية أو الإنجليزية، ودع الذكاء الاصطناعي يتولى الباقي.",
  },
  {
    icon: Database,
    title: "جميع المواد والدورات",
    description: "يدعم إنشاء اختبارات لجميع المواد الدراسية والدورات التدريبية مع تخصيص مستوى الصعوبة.",
  },
  {
    icon: Download,
    title: "تصدير فوري",
    description: "حمّل اختباراتك بصيغ PDF أو DOCX أو JSON بضغطة زر واحدة.",
  },
]

const subjects = [
  "الرياضيات", "العلوم", "اللغة العربية", "اللغة الإنجليزية", 
  "التاريخ", "الجغرافيا", "الفيزياء", "الكيمياء", "الأحياء",
  "البرمجة", "الاقتصاد", "الفلسفة", "علم النفس", "الطب"
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#f8fafc] to-[#e0e7ef] py-20 sm:py-32 rounded-b-3xl shadow-lg">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-brand">
              أنشئ اختباراتك المخصصة <span className="text-primary">لأي مادة</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              منصة الذكاء الاصطناعي لإنشاء اختبارات لجميع المواد والدورات التدريبية بسهولة وسرعة.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-l from-orange-400 via-orange-500 to-orange-600 text-white shadow-xl hover:scale-105 hover:shadow-orange-300/60 focus:ring-4 focus:ring-orange-200 transition-transform duration-200 border-0 outline-none font-extrabold px-8 py-4 rounded-full animate-pulse-slow"
              >
                <Link href="/chatbot">
                  ابدأ بإنشاء الاختبارات
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand">
              كل ما تحتاجه لإنشاء اختبارات مثالية
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              سهّل عملية إعداد الاختبارات مع أدوات الذكاء الاصطناعي المصممة للمعلمين والمدرسين.
            </p>
          </motion.div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className="flex flex-col bg-white rounded-xl shadow-md p-6 border border-muted hover:shadow-xl transition-shadow"
                >
                  <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-primary">
                    <feature.icon className="h-5 w-5 flex-none text-brand" />
                    {feature.title}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Subjects Section */}
      <section className="py-24 sm:py-32 bg-muted/20 rounded-3xl my-8">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand">يدعم جميع المواد والدورات</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              أنشئ اختبارات لأي مادة أو دورة تدريبية تريدها
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subjects.map((subject, index) => (
              <motion.div
                key={subject}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium text-gray-700">{subject}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand">ابدأ الآن</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              انضم إلى آلاف المعلمين الذين يستخدمون EduMind لإنشاء اختباراتهم
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-l from-orange-400 via-orange-500 to-orange-600 text-white shadow-xl hover:scale-105 hover:shadow-orange-300/60 focus:ring-4 focus:ring-orange-200 transition-transform duration-200 border-0 outline-none font-extrabold px-8 py-4 rounded-full"
              >
                <Link href="/chatbot">
                  ابدأ بإنشاء الاختبارات
                  <ArrowRight className="mr-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
