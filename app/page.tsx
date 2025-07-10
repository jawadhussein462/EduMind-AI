"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowRight, MessageSquare, Database, Download, Check, Star, BookOpen, GraduationCap, FileText } from "lucide-react"
import { motion } from "framer-motion"
import { useTranslation } from "@/components/language-provider";

export default function HomePage() {
  const t = useTranslation();
  const features = [
    {
      icon: MessageSquare,
      title: t("homepageFeature1Title"),
      description: t("homepageFeature1Desc"),
    },
    {
      icon: Database,
      title: t("homepageFeature2Title"),
      description: t("homepageFeature2Desc"),
    },
    {
      icon: Download,
      title: t("homepageFeature3Title"),
      description: t("homepageFeature3Desc"),
    },
  ];
  const subjects = t("homepageSubjects");
  const subjectList = Array.isArray(subjects) ? subjects : [];
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
              {t("homepageHeroTitle")} {t("homepageHeroTitleSubject") ? <span className="text-primary">{t("homepageHeroTitleSubject")}</span> : null}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t("homepageHeroSubtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-l from-orange-400 via-orange-500 to-orange-600 text-white shadow-xl hover:scale-105 hover:shadow-orange-300/60 focus:ring-4 focus:ring-orange-200 transition-transform duration-200 border-0 outline-none font-extrabold px-8 py-4 rounded-full animate-pulse-slow"
              >
                <Link href="/chatbot">
                  {t("homepageHeroButton")}
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
              {t("homepageFeaturesTitle")}
            </h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t("homepageFeaturesSubtitle")}
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand">{t("homepageSubjectsTitle")}</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t("homepageSubjectsSubtitle")}
            </p>
          </motion.div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {subjectList.map((subject, index) => (
              <motion.div
                key={typeof subject === 'string' ? subject + index : String(index)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg p-4 text-center shadow-md hover:shadow-lg transition-shadow"
              >
                <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                <span className="text-sm font-medium text-gray-700">{typeof subject === 'string' ? subject : ''}</span>
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
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-brand">{t("homepageCTATitle")}</h2>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {t("homepageCTASubtitle")}
            </p>
            <div className="mt-10">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-l from-orange-400 via-orange-500 to-orange-600 text-white shadow-xl hover:scale-105 hover:shadow-orange-300/60 focus:ring-4 focus:ring-orange-200 transition-transform duration-200 border-0 outline-none font-extrabold px-8 py-4 rounded-full"
              >
                <Link href="/chatbot">
                  {t("homepageCTABtn")}
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
