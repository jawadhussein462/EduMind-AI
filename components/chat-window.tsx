/* ----------------------------------------------------------------
   ChatWindow – v2  ✦ polished & large‑text ready
   ----------------------------------------------------------------
   ✓ Fluid glass‑card layout with adaptive max‑width/height
   ✓ Auto‑scroll + ScrollArea capped to 65vh for giant outputs
   ✓ Improved prose readability (whitespace‑pre‑wrap, balanced leading)
   ✓ Responsive RTL/LTR handling
   ✓ Refined buttons & subtle ambient glow
   ----------------------------------------------------------------*/

"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"

// shadcn‑ui
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
   import { Card, CardContent } from "@/components/ui/card"

// Icons
   import { Bot, User, Send, Copy, Loader2, BookOpen, X, RotateCcw } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Markdown & math
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeRaw from "rehype-raw"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"

// Syntax highlighting
import hljs from "highlight.js/lib/common"
   import "highlight.js/styles/github-dark.css"

   // Typography & KaTeX
import "katex/dist/katex.min.css"

import { cn } from "@/lib/utils"

/* ----------------------------------------------------------------
   Types
-----------------------------------------------------------------*/
interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

/* ----------------------------------------------------------------
      Helper – CodeBlock with header & copy‑to‑clipboard
-----------------------------------------------------------------*/
function CodeBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const codeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (codeRef.current) hljs.highlightElement(codeRef.current)
  }, [])

  const copy = () => {
    if (navigator.clipboard && codeRef.current) navigator.clipboard.writeText(codeRef.current.innerText)
  }
   
     // Extract language name if provided
     const match = /language-(\w+)/.exec(className || "")
     const lang = match ? match[1] : ""

  return (
       <div className="relative group my-4">
         {/* Header */}
         <div className="flex items-center justify-between px-3 py-1.5 text-xs font-medium bg-slate-800/70 border-b border-slate-700 rounded-t-xl text-slate-200 backdrop-blur">
           <span className="uppercase tracking-wide">{lang || "Code"}</span>
           <button
        onClick={copy}
             className="opacity-70 hover:opacity-100 transition-opacity"
        title="Copy code"
      >
             <Copy className="h-3.5 w-3.5" />
           </button>
         </div>
   
         <pre className="overflow-x-auto rounded-b-xl bg-slate-900 text-slate-100 text-sm leading-relaxed">
           <code ref={codeRef} className={cn(className, "hljs block px-4 py-3")}>{children}</code>
         </pre>
    </div>
  )
}
   
   /* ----------------------------------------------------------------
      Utility – detect if text is mostly English
   -----------------------------------------------------------------*/
   function isEnglish(text: string) {
     const letters = text.replace(/[^a-zA-Z]/g, "").length
     const total = text.replace(/[^a-zA-Z\u0600-\u06FF]/g, "").length
     return total > 0 ? letters / total > 0.6 : false
   }
   
   // Animated dots for dynamic loading indication
   function AnimatedDots() {
     const [dotCount, setDotCount] = useState(1);
     useEffect(() => {
       const interval = setInterval(() => {
         setDotCount((prev) => (prev % 3) + 1);
       }, 500);
       return () => clearInterval(interval);
     }, []);
     return <span>{'.'.repeat(dotCount)}</span>;
   }

/* ----------------------------------------------------------------
   ChatWindow Component
-----------------------------------------------------------------*/
export function ChatWindow() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [pendingClarification, setPendingClarification] = useState<string | null>(null)
  const [initialMessage, setInitialMessage] = useState<string | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const API_BASE_URL = "/api/chat-proxy"
  const CLARIFY_API_URL = "/api/clarify-proxy"

  // Auto-scroll when messages update
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages])

  // Check connection once
  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/`)
        setIsConnected(res.ok)
      } catch {
        setIsConnected(false)
      }
    })()
  }, [])

  // Textarea autoresize
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = Math.min(el.scrollHeight, 160) + "px"
  }, [input])

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || isLoading) return
    setIsLoading(true)
    setInput("")

    // If clarification is pending, concatenate and send to main API
    if (pendingClarification && initialMessage) {
      // Add user clarification message
      const userMsg: Message = {
        id: Date.now().toString() + Math.random(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      try {
        const fullMessage = `${initialMessage}\n[User clarification]: ${trimmed}`
        const res = await fetch(API_BASE_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: fullMessage }),
        })
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            role: "assistant",
            content: data.response ?? "(empty)",
            timestamp: new Date(),
          },
        ])
      } catch (err: any) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            role: "assistant",
            content: "🚨 حدث خطأ في الاتصال بالخادم. حاول مرة أخرى لاحقًا.",
            timestamp: new Date(),
          },
        ])
      } finally {
        setIsLoading(false)
        setPendingClarification(null)
        setInitialMessage(null)
      }
      return
    }

    // Add user message to chat
    const userMsg: Message = {
      id: Date.now().toString() + Math.random(),
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMsg])
    try {
      // Step 1: Call clarify API
      const clarifyRes = await fetch(CLARIFY_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })
      if (!clarifyRes.ok) throw new Error(`Clarify HTTP ${clarifyRes.status}`)
      const clarifyData = await clarifyRes.json()
      if (clarifyData.clarification_needed) {
        // Add clarification prompt as assistant message
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString() + Math.random(),
            role: "assistant",
            content: clarifyData.clarification,
            timestamp: new Date(),
          },
        ])
        setPendingClarification(clarifyData.clarification)
        setInitialMessage(trimmed)
        setIsLoading(false)
        return
      }
      // Step 2: If no clarification needed, proceed as before
      const res = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + Math.random(),
          role: "assistant",
          content: data.response ?? "(empty)",
          timestamp: new Date(),
        },
      ])
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + Math.random(),
          role: "assistant",
          content: "🚨 حدث خطأ في الاتصال بالخادم. حاول مرة أخرى لاحقًا.",
          timestamp: new Date(),
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

     /* ----------------------------------------------------------------
        Render
     ----------------------------------------------------------------*/
  return (
       <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 px-4 py-6">
         {/* Soft radial glow */}
         <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
           <div className="h-72 w-72 rounded-full bg-amber-300/20 blur-[120px]" />
         </div>
   
         {/* Floating glass card */}
            <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.35, ease: "easeOut" }}
           className="w-full max-w-4xl"
         >
           <Card className="shadow-xl backdrop-blur-lg bg-white/60 dark:bg-slate-800/60 border border-white/40 dark:border-slate-700 rounded-3xl">
             <CardContent className="p-0 flex flex-col">
               {/* Header */}
               <div className="border-b border-white/30 dark:border-slate-700 px-6 py-4 bg-gradient-to-r from-amber-100/80 to-amber-50/40 dark:from-slate-800 dark:to-slate-700 rounded-t-3xl">
                 <div className="flex items-center gap-3">
                   <img src="/placeholder-logo.svg" alt="EduMind Logo" className="h-9 w-9 rounded bg-white shadow" />
                   <div>
                     <h2 className="font-semibold text-gray-900 dark:text-gray-100 leading-tight">إنشاء الاختبارات الذكي</h2>
                     <p className="text-sm text-gray-600 dark:text-gray-300 leading-tight">أنشئ اختباراً مخصصاً لأي مادة أو دورة تدريبية</p>
                   </div>
                 </div>
               </div>
   
               {/* Status */}
               <div className="border-b border-white/30 dark:border-slate-700 px-6 py-2 text-sm flex items-center justify-between bg-white/40 dark:bg-slate-800/40 backdrop-blur">
                 <div className="flex items-center space-x-2 rtl:space-x-reverse">
                   <span className={cn("w-2 h-2 rounded-full", isConnected ? "bg-emerald-500" : "bg-red-500 animate-pulse")}></span>
                   <span className="text-gray-700 dark:text-gray-300">{isConnected ? "متصل بـ EduMind AI · جاهز" : "غير متصل"}</span>
                 </div>
               </div>
   
               {/* Body */}
               <div className="px-6 py-6 flex flex-col gap-6">
                 {/* Input form + reset buttons */}
                 <form onSubmit={handleSubmit} className="space-y-3">
                   <div className="flex gap-2 items-end">
                     <Textarea
                       ref={textareaRef}
                       value={input}
                       onChange={handleInputChange}
                       placeholder={"أدخل وصف الاختبار الذي تريد إنشاءه... (مثال: اختبار في الرياضيات للصف العاشر)"}
                       className="flex-1 min-h-[48px] max-h-[160px] resize-none px-4 py-3 rounded-xl bg-white/80 dark:bg-slate-900/60 border border-amber-200 dark:border-slate-700 focus-visible:ring-2 focus-visible:ring-amber-400 text-right leading-relaxed"
                       disabled={isLoading}
                       style={{ direction: "rtl" }}
                     />
                     <div className="flex gap-2">
                       <Button
                         type="button"
                         size="icon"
                         variant="ghost"
                         onClick={() => { setInput(""); }}
                         title="مسح الإدخال"
                         className="shrink-0"
                         disabled={!input}
                       >
                         <X className="w-5 h-5 opacity-70" />
                       </Button>
                       <Button
                         type="button"
                         size="icon"
                         variant="ghost"
                         onClick={() => { setMessages([]); setInput(""); }}
                         title="إعادة تعيين المحادثة"
                         className="shrink-0"
                         disabled={messages.length === 0}
                       >
                         <RotateCcw className="w-5 h-5 opacity-70" />
                       </Button>
                  </div>
                </div>
                   <Button
                     type="submit"
                     size="lg"
                     className="w-full sm:w-auto bg-gradient-to-br from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-white font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                     disabled={!input.trim() || isLoading}
                   >
                     {isLoading ? (
                       <span className="flex items-center justify-center gap-2">
                         <span className="animate-spin flex items-center">
                           <Loader2 className="h-4 w-4" aria-label="Loading" />
                         </span>
                         {"جاري الإنشاء"}<AnimatedDots />
                       </span>
                     ) : (
                       <>
                         <Send className="w-4 h-4 rtl:ml-2 ltr:mr-2" />{"إنشاء الاختبار"}
                       </>
                     )}
                   </Button>
                 </form>
   
                 {/* Result / conversation */}
                 <div className="flex-1 min-h-[120px]" ref={scrollRef} style={{ height: '400px', maxHeight: '500px', overflowY: 'auto' }}>
                   <AnimatePresence mode="wait">
                     {messages.map((msg) => (
                       <motion.div
                         key={msg.id}
                         initial={{ opacity: 0, y: 10 }}
                         animate={{ opacity: 1, y: 0 }}
                         exit={{ opacity: 0, y: 10 }}
                         transition={{ duration: 0.25 }}
                         className="flex mb-4"
                       >
                         <div
                           className={cn(
                             "rounded-2xl shadow-inner border w-full p-6 min-w-0 flex items-start gap-3",
                             msg.role === "assistant"
                               ? "border-amber-200 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60"
                               : "border-amber-300 dark:border-amber-700 bg-amber-50/80 dark:bg-amber-900/40"
                           )}
                         >
                           {/* Icon for each role */}
                           <div className="shrink-0 mt-1">
                             {msg.role === "assistant" ? (
                               <Bot className="h-7 w-7 text-amber-500 dark:text-amber-300" />
                             ) : (
                               <User className="h-7 w-7 text-slate-400 dark:text-slate-200" />
                             )}
                           </div>
                           <div
                             className={cn(
                               "text-xs leading-[1] whitespace-pre break-words min-w-0 m-0 p-0 flex-1",
                               isEnglish(msg.content) ? "text-left ltr" : "text-right rtl"
                             )}
                             dir={isEnglish(msg.content) ? "ltr" : "rtl"}
                             aria-live="polite"
                           >
                             <ReactMarkdown
                               remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
                               rehypePlugins={[rehypeRaw, rehypeKatex]}
                               components={{
                                 h1: ({ node, ...props }) => <h1 className="text-base font-bold leading-[1] m-0 p-0" {...props} />, 
                                 h2: ({ node, ...props }) => <h2 className="text-sm font-semibold leading-[1] m-0 p-0" {...props} />, 
                                 h3: ({ node, ...props }) => <h3 className="text-xs font-medium leading-[1] m-0 p-0" {...props} />, 
                                 code: ({ className, children, ...props }: any) => {
                                   const match = /language-(\w+)/.exec(className || "")
                                   const isInline = !match
                                   return isInline ? (
                                     <code
                                       {...props}
                                       className={cn(
                                         className,
                                         "px-0 py-0 rounded bg-amber-100 text-amber-700 dark:bg-slate-700 dark:text-amber-200 font-mono leading-[1] m-0"
                                       )}
                                     >
                                       {children}
                                     </code>
                                   ) : (
                                     <CodeBlock className={className}>{children}</CodeBlock>
                                   )
                                 },
                                 p: ({ node, ...props }) => <p className="m-0 p-0 leading-[1]" {...props} />, 
                                 li: ({ node, ...props }) => <li className="m-0 p-0 leading-[1] list-none" {...props} />, 
                               }}
                             >
                               {msg.content}
                             </ReactMarkdown>
                           </div>
                         </div>
                       </motion.div>
                     ))}
                   </AnimatePresence>
                 </div>
               </div>
             </CardContent>
           </Card>
         </motion.div>
    </div>
  )
}
