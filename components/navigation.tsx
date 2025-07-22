"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSession, signIn, signOut } from "next-auth/react"
import { useTranslation } from "./language-provider"
import { LanguageSwitcher } from "./language-switcher"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const router = useRouter()
  const t = useTranslation();

  const navigation = [
    { name: t("home"), href: "/" },
    { name: t("myExams"), href: "/my-exams" },
    { name: t("askAI"), href: "/ask-ai" },
    { name: t("createExam"), href: "/chatbot" },
  ];

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  const visibleNavigation = navigation

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/80 shadow-lg">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
            <BookOpen className="h-8 w-8 text-white" />
            <span className="text-xl font-bold text-white">EduMind</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(true)} className="text-white hover:bg-accent/60">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          {visibleNavigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-white hover:bg-accent/60 px-3 py-2 rounded-md",
                pathname === item.href ? "bg-accent/60 text-primary" : "text-white/80"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:space-x-4">
          <LanguageSwitcher />
          {status === "loading" ? (
            <div className="h-9 w-20 animate-pulse bg-accent rounded-md" />
          ) : session ? (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-white/80">{session.user?.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut} className="border-white text-white hover:bg-accent/60">
                {t("signOut")}
              </Button>
            </div>
          ) : (
            <Button size="sm" onClick={() => signIn()} className="bg-white text-primary hover:bg-accent/60">
              {t("signIn")}
            </Button>
          )}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-primary px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-border">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-white" />
                <span className="text-xl font-bold text-white">EduMind</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-border">
                <div className="space-y-2 py-6">
                  {visibleNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "-mx-3 block rounded-lg px-3 py-2 text-base font-medium transition-colors",
                        pathname === item.href ? "bg-accent/60 text-primary" : "text-white/80 hover:bg-accent/60 hover:text-white",
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="py-6 flex items-center justify-between">
                  {session ? (
                    <Button variant="outline" size="sm" onClick={handleSignOut} className="border-white text-white hover:bg-accent/60">
                      تسجيل الخروج
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => signIn()} className="bg-white text-primary hover:bg-accent/60">
                      تسجيل الدخول
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
