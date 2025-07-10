"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, BookOpen, Calculator, TestTube, Globe, History, Code, X, Star } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface ExamTemplate {
  id: string
  title: string
  subject: string
  grade: string
  description: string
  questionTypes: string[]
  icon: any
  color: string
}

export function ExamSidebar({ onClose }: { onClose: () => void }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [recentExams, setRecentExams] = useState<any[]>([])

  const examTemplates: ExamTemplate[] = [
    {
      id: "math",
      title: "الرياضيات",
      subject: "Mathematics",
      grade: "جميع المراحل",
      description: "اختبارات في الجبر، الهندسة، التفاضل والتكامل",
      questionTypes: ["اختيار من متعدد", "حسابات", "براهين"],
      icon: Calculator,
      color: "bg-blue-500"
    },
    {
      id: "science",
      title: "العلوم",
      subject: "Science",
      grade: "جميع المراحل",
      description: "اختبارات في الفيزياء، الكيمياء، الأحياء",
      questionTypes: ["اختيار من متعدد", "تجارب", "تحليل"],
      icon: TestTube,
      color: "bg-green-500"
    },
    {
      id: "languages",
      title: "اللغات",
      subject: "Languages",
      grade: "جميع المراحل",
      description: "اختبارات في العربية، الإنجليزية، الفرنسية",
      questionTypes: ["اختيار من متعدد", "قواعد", "قراءة"],
      icon: Globe,
      color: "bg-purple-500"
    },
    {
      id: "history",
      title: "التاريخ والجغرافيا",
      subject: "History & Geography",
      grade: "جميع المراحل",
      description: "اختبارات في التاريخ، الجغرافيا، التربية الوطنية",
      questionTypes: ["اختيار من متعدد", "مقالي", "تحليل"],
      icon: History,
      color: "bg-orange-500"
    },
    {
      id: "programming",
      title: "البرمجة",
      subject: "Programming",
      grade: "الثانوية والجامعة",
      description: "اختبارات في البرمجة، الخوارزميات، قواعد البيانات",
      questionTypes: ["اختيار من متعدد", "برمجة", "تحليل"],
      icon: Code,
      color: "bg-indigo-500"
    }
  ]

  // Mock recent exams
  useEffect(() => {
    setRecentExams([
      {
        id: "1",
        title: "اختبار الجبر للصف العاشر",
        subject: "الرياضيات",
        date: "2024-01-15",
        questionCount: 25
      },
      {
        id: "2",
        title: "اختبار الفيزياء للصف الحادي عشر",
        subject: "العلوم",
        date: "2024-01-10",
        questionCount: 30
      }
    ])
  }, [])

  const filteredTemplates = examTemplates.filter(
    (template) =>
      template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.subject.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleTemplateClick = (template: ExamTemplate) => {
    // This would trigger the chat with a pre-filled message
    const message = `أنشئ اختبار في ${template.title}، 20 سؤال اختيار من متعدد، مستوى متوسط`
    // You can implement this by passing a callback or using a global state
    console.log("Creating exam with template:", message)
  }

  return (
    <div className="h-full bg-gray-50 border-r flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">إنشاء الاختبارات</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="lg:hidden">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ابحث عن مادة..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 border-b bg-white">
        <h3 className="text-sm font-medium text-gray-900 mb-3">إنشاء سريع</h3>
        <Button className="w-full bg-orange-500 hover:bg-orange-600">
          <Plus className="h-4 w-4 mr-2" />
          اختبار مخصص جديد
        </Button>
      </div>

      {/* Exam Templates */}
      <div className="flex-1 overflow-y-auto p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">قوالب الاختبارات</h3>
        <div className="space-y-3">
          <AnimatePresence>
            {filteredTemplates.map((template) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Card 
                  className="cursor-pointer hover:shadow-md transition-shadow border-0 bg-white"
                  onClick={() => handleTemplateClick(template)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${template.color}`}>
                        <template.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-sm font-medium leading-tight text-gray-900">
                          {template.title}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{template.grade}</span>
                        <Badge variant="secondary" className="text-xs bg-gray-100">
                          {template.questionTypes.length} أنواع
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {template.questionTypes.slice(0, 2).map((type) => (
                          <Badge key={type} variant="secondary" className="text-xs bg-gray-100">
                            {type}
                          </Badge>
                        ))}
                        {template.questionTypes.length > 2 && (
                          <Badge variant="secondary" className="text-xs bg-gray-100">
                            +{template.questionTypes.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Recent Exams */}
        {recentExams.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">الاختبارات الحديثة</h3>
            <div className="space-y-2">
              {recentExams.map((exam) => (
                <div key={exam.id} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200">
                  <BookOpen className="h-4 w-4 text-gray-400" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{exam.title}</p>
                    <p className="text-xs text-gray-500">{exam.subject} • {exam.questionCount} سؤال</p>
                  </div>
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              ))}
            </div>
          </div>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-8 w-8 mx-auto text-gray-300 mb-2" />
            <p className="text-sm text-gray-500">لم يتم العثور على قوالب</p>
          </div>
        )}
      </div>
    </div>
  )
}
