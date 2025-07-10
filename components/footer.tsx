"use client"

import Link from "next/link"
import { BookOpen, Heart } from "lucide-react"
import { useEffect, useState } from "react"

export function Footer() {
  const [commitHash, setCommitHash] = useState<string>("")

  useEffect(() => {
    // In a real app, this would come from environment variables or build process
    setCommitHash(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, 7) || "dev")
  }, [])

  return (
    <footer className="border-t bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-8 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link href="/chatbot" className="text-white hover:text-orange-400 transition-colors">
            <BookOpen className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <div className="flex flex-col items-center md:items-start space-y-2">
            <p className="text-center text-sm text-white md:text-left">
              &copy; 2024 EduMind - منصة إنشاء الاختبارات الذكية
            </p>
            <p className="text-center text-sm text-gray-400 md:text-left flex items-center gap-1">
              مصنوع بـ <Heart className="h-3 w-3 text-red-500" /> للمعلمين والمدرسين
            </p>
            {commitHash && (
              <span className="inline-flex items-center rounded-full bg-gray-700 px-2 py-1 text-xs font-medium text-gray-300">
                {commitHash}
              </span>
            )}
          </div>
        </div>
      </div>
    </footer>
  )
}
