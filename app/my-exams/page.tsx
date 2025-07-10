"use client"

import { useState, useEffect } from "react"
import { DataTable } from "@/components/data-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash2, Search, Plus, Download } from "lucide-react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Exam {
  id: string
  title: string
  date: string
  grade: string
  questions: number
  status: "draft" | "published"
}

const columns = [
  {
    accessorKey: "title",
    header: "عنوان الاختبار",
  },
  {
    accessorKey: "date",
    header: "تاريخ الإنشاء",
  },
  {
    accessorKey: "grade",
    header: "المرحلة",
    cell: ({ row }: any) => <Badge variant="secondary">{row.getValue("grade")}</Badge>,
  },
  {
    accessorKey: "questions",
    header: "عدد الأسئلة",
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ row }: any) => {
      const status = row.getValue("status")
      return (
        <Badge variant={status === "published" ? "default" : "outline"}>
          {status === "published" ? "منشور" : "مسودة"}
        </Badge>
      )
    },
  },
  {
    id: "actions",
    header: "الإجراءات",
    cell: ({ row }: any) => {
      const exam = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              عرض
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              تعديل في المحادثة
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Download className="mr-2 h-4 w-4" />
              تحميل PDF
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              حذف
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function MyExamsPage() {
  const [exams, setExams] = useState<Exam[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // Mock data - in real app, fetch from API
    setExams([
      {
        id: "1",
        title: "اختبار الجبر للصف التاسع",
        date: "2024-01-15",
        grade: "الصف التاسع",
        questions: 25,
        status: "published",
      },
      {
        id: "2",
        title: "اختبار الهندسة للصف العاشر",
        date: "2024-01-10",
        grade: "الصف العاشر",
        questions: 15,
        status: "draft",
      },
      {
        id: "3",
        title: "اختبار التفاضل والتكامل للصف الثاني عشر",
        date: "2024-01-05",
        grade: "الصف الثاني عشر",
        questions: 40,
        status: "published",
      },
    ])
  }, [])

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exam.grade.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">اختباراتي</h1>
          <p className="text-gray-600">إدارة الاختبارات التي أنشأتها</p>
        </div>
        <Button asChild className="bg-orange-500 hover:bg-orange-600">
          <Link href="/chatbot">
            <Plus className="mr-2 h-4 w-4" />
            إنشاء اختبار جديد
          </Link>
        </Button>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="ابحث في الاختبارات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredExams.length === 0 ? (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">لا توجد اختبارات</h3>
          <p className="text-gray-600 mb-4">ابدأ بإنشاء اختبارك الأول</p>
          <Button asChild className="bg-orange-500 hover:bg-orange-600">
            <Link href="/chatbot">
              <Plus className="mr-2 h-4 w-4" />
              إنشاء اختبار جديد
            </Link>
          </Button>
        </div>
      ) : (
        <DataTable columns={columns} data={filteredExams} />
      )}
    </div>
  )
}
