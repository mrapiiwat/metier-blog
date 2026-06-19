'use client'
import { useState } from 'react'
import { FiFileText, FiMessageSquare, FiPlus, FiCheckCircle } from 'react-icons/fi'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import StatCard from '@/components/admin/StatCard'
import RecentBlogs from '@/components/admin/RecentBlogs'
import RecentComments from '@/components/admin/RecentComments'

interface AIAnalysis {
  status: 'approve' | 'reject' | 'flagged' | 'pending'
  message: string
}

interface CommentItem {
  id: number
  author: string
  content: string
  blogTitle: string
  aiAnalysis: AIAnalysis
}

const Dashboard = () => {
  const [blogs, setBlogs] = useState([
    { id: 1, title: 'Classic Revival: Revisiting Iconic Cars', slug: 'classic-revival', date: '2026-06-18', isPublished: true },
    { id: 2, title: 'The Future of Electric Vehicles Strategy', slug: 'future-ev', date: '2026-06-15', isPublished: false },
    { id: 3, title: 'Top 10 Maintenance Tips for Old Cars', slug: 'maintenance-tips', date: '2026-06-10', isPublished: true },
    { id: 4, title: 'Why 90s JDM Cars Are Increasing In Value', slug: '90s-jdm', date: '2026-06-08', isPublished: true },
  ])

  const [pendingComments, setPendingComments] = useState<CommentItem[]>([
    {
      id: 1,
      author: 'สมชาย ใจดี',
      content: 'บทความเขียนดีมากเลยครับ อ่านเพลินมาก 10 10 10',
      blogTitle: 'Classic Revival',
      aiAnalysis: { status: 'approve', message: 'ปลอดภัย (ภาษาไทย/ตัวเลข)' }
    },
    {
      id: 2,
      author: 'John Doe',
      content: 'Great article! Please check out my website for more info.',
      blogTitle: 'Classic Revival',
      aiAnalysis: { status: 'reject', message: 'พบภาษาอังกฤษและสแปม' }
    },
    {
      id: 3,
      author: 'วัยรุ่น สร้างตัว',
      content: 'สุดยอดไปเลยควัฟพรี่ สนใจคริปโตทักแชทนะคับ',
      blogTitle: 'The Future of Electric Vehicles',
      aiAnalysis: { status: 'flagged', message: 'เตือน: อาจเป็นโฆษณาแฝง' }
    },
    {
      id: 4,
      author: 'ระบบอัตโนมัติ',
      content: 'กำลังประมวลผลข้อความนี้...',
      blogTitle: 'Top 10 Maintenance Tips',
      aiAnalysis: { status: 'pending', message: 'AI กำลังประมวลผล...' }
    },
  ])

  const handleTogglePublish = (id: number) => {
    setBlogs(blogs.map(b => b.id === id ? { ...b, isPublished: !b.isPublished } : b))
  }

  const handleApproveComment = (id: number) => {
    setPendingComments(pendingComments.filter(c => c.id !== id))
  }

  const handleRejectComment = (id: number) => {
    setPendingComments(pendingComments.filter(c => c.id !== id))
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-20">

      <AdminPageHeader
        title="Overview"
        description="จัดการเนื้อหาและตรวจสอบความคิดเห็นด้วยระบบ AI Assistant"
        actionLabel="สร้างบทความ"
        actionHref="blogs/create"
        actionIcon={<FiPlus size={18} strokeWidth={3} />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 space-y-8">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard
            title="Total Articles"
            value={blogs.length}
            icon={<FiFileText size={24} />}
            trend="12%"
            trendUp={true}
          />
          <StatCard
            title="Published"
            value={blogs.filter(b => b.isPublished).length}
            icon={<FiCheckCircle size={24} className="text-emerald-500" />}
          />
          <StatCard
            title="Pending AI Review"
            value={pendingComments.length}
            icon={<FiMessageSquare size={24} className="text-indigo-500" />}
            trend="5 รายการล่าสุด"
            trendUp={false}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <div className="xl:col-span-2 flex flex-col h-full">
            <RecentBlogs blogs={blogs} onTogglePublish={handleTogglePublish} />
          </div>

          <div className="xl:col-span-1 flex flex-col h-full">
            <RecentComments
              comments={pendingComments}
              onApprove={handleApproveComment}
              onReject={handleRejectComment}
            />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard