'use client'
import { useState, useEffect, useCallback } from 'react'
import { FiFileText, FiMessageSquare, FiPlus, FiCheckCircle } from 'react-icons/fi'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import StatCard from '@/components/admin/StatCard'
import RecentBlogs from '@/components/admin/RecentBlogs'
import RecentComments from '@/components/admin/RecentComments'
import axios from '@/lib/axios/admin'

interface DashboardStats {
  totalArticles: number
  publishedArticles: number
  pendingComments: number
}

export interface BlogItem {
  id: string
  title: string
  slug: string
  date: string
  isPublished: boolean
}

export interface AIAnalysis {
  status: 'approve' | 'reject' | 'flagged' | 'pending'
  message: string
}

export interface CommentItem {
  id: string
  author: string
  content: string
  blogTitle: string
  aiAnalysis: AIAnalysis
}

interface APIBlogData {
  id: string
  title: string
  slug: string
  createdAt: string
  isPublished: boolean
}

interface APICommentData {
  id: string
  blogId: string
  senderName: string
  message: string
  aiSuggestion: 'approve' | 'reject' | 'flagged' | 'pending'
  aiReason: string
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalArticles: 0,
    publishedArticles: 0,
    pendingComments: 0,
  })

  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [pendingComments, setPendingComments] = useState<CommentItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchDashboardData = useCallback(async () => {
    try {
      await Promise.resolve()
      setIsLoading(true)

      const [statsRes, blogsRes, commentsRes] = await Promise.all([
        axios.get<DashboardStats>('/dash'),
        axios.get('/blog', { params: { limit: 5 } }),
        axios.get('/comment', { params: { status: 'pending', limit: 5 } }),
      ])

      setStats(statsRes.data)

      const blogsList = blogsRes.data?.data || blogsRes.data || []
      const mappedBlogs: BlogItem[] = blogsList.map((b: APIBlogData) => ({
        id: b.id,
        title: b.title,
        slug: b.slug,
        date: b.createdAt ? b.createdAt.split('T')[0] : '',
        isPublished: b.isPublished,
      }))
      setBlogs(mappedBlogs)

      const commentsList = commentsRes.data?.data || commentsRes.data || []
      const mappedComments: CommentItem[] = commentsList.map((c: APICommentData) => ({
        id: c.id,
        author: c.senderName,
        content: c.message,
        blogTitle: `Blog ID: ${c.blogId.split('-')[0]}...`,
        aiAnalysis: {
          status: c.aiSuggestion || 'pending',
          message: c.aiReason || 'รอการตรวจสอบโดย AI',
        },
      }))
      setPendingComments(mappedComments)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDashboardData()
  }, [fetchDashboardData])

  const handleTogglePublish = async (id: string) => {
    const targetBlog = blogs.find((b) => b.id === id)
    if (!targetBlog) return

    const newStatus = !targetBlog.isPublished

    setBlogs(blogs.map((b) => (b.id === id ? { ...b, isPublished: newStatus } : b)))

    try {
      await axios.put(`/blog/${id}`, { isPublished: newStatus })

      fetchDashboardData()
    } catch (error) {
      console.error('Failed to toggle publish status', error)
      alert('เกิดข้อผิดพลาดในการเปลี่ยนสถานะบทความ')
      fetchDashboardData()
    }
  }

  const handleApproveComment = async (id: string) => {
    setPendingComments(pendingComments.filter((c) => c.id !== id))

    try {
      await axios.put(`/comment/${id}/status`, { status: 'approved' })
      fetchDashboardData()
    } catch (error) {
      console.error('Failed to approve comment', error)
      fetchDashboardData()
    }
  }

  const handleRejectComment = async (id: string) => {
    setPendingComments(pendingComments.filter((c) => c.id !== id))

    try {
      await axios.put(`/comment/${id}/status`, { status: 'rejected' })
      fetchDashboardData()
    } catch (error) {
      console.error('Failed to reject comment', error)
      fetchDashboardData()
    }
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
            value={isLoading ? '...' : stats.totalArticles}
            icon={<FiFileText size={24} />}
            trend="ทั้งหมด"
            trendUp={true}
          />
          <StatCard
            title="Published"
            value={isLoading ? '...' : stats.publishedArticles}
            icon={<FiCheckCircle size={24} className="text-emerald-500" />}
          />
          <StatCard
            title="Pending AI Review"
            value={isLoading ? '...' : stats.pendingComments}
            icon={<FiMessageSquare size={24} className="text-indigo-500" />}
            trend="รอการตรวจสอบ"
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
