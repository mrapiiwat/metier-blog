'use client'
import React, { useState } from 'react'
import {
  FiCheck,
  FiTrash2,
  FiCpu,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
} from 'react-icons/fi'

type CommentStatus = 'pending' | 'approved' | 'rejected'
type AIRecommendation = 'approve' | 'reject' | 'flagged' | 'pending'

interface Comment {
  id: string
  user: string
  content: string
  status: CommentStatus
  blog: string
  ai_suggestion: AIRecommendation
  ai_reason: string
}

const getAIStatusColor = (suggestion: AIRecommendation) => {
  switch (suggestion) {
    case 'approve':
      return 'text-emerald-700 bg-emerald-50'
    case 'reject':
      return 'text-rose-700 bg-rose-50'
    case 'flagged':
      return 'text-amber-700 bg-amber-50'
    default:
      return 'text-slate-600 bg-slate-100'
  }
}

const CommentsPage = () => {
  const [statusFilter, setStatusFilter] = useState<string>('pending')
  const [blogFilter, setBlogFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 2

  const [comments] = useState<Comment[]>([
    {
      id: '1',
      user: 'Apiwat Lantong',
      content: 'บทความดีมากครับ!',
      status: 'pending',
      blog: 'Classic Revival',
      ai_suggestion: 'approve',
      ai_reason: 'เชิงบวกและสุภาพ',
    },
    {
      id: '2',
      user: 'SpammerX',
      content: 'ขายของรวยไว...',
      status: 'pending',
      blog: 'Tech Trends',
      ai_suggestion: 'reject',
      ai_reason: 'ตรวจพบสแปม',
    },
    {
      id: '3',
      user: 'UserA',
      content: 'ขอบคุณที่แบ่งปันครับ',
      status: 'approved',
      blog: 'Classic Revival',
      ai_suggestion: 'approve',
      ai_reason: 'เชิงบวก',
    },
    {
      id: '4',
      user: 'UserB',
      content: 'อยากให้ทำรีวิวเพิ่มครับ',
      status: 'pending',
      blog: 'Tech Trends',
      ai_suggestion: 'approve',
      ai_reason: 'เชิงบวก',
    },
  ])

  const uniqueBlogs = Array.from(new Set(comments.map((c) => c.blog)))

  const filteredComments = comments.filter(
    (c) =>
      (statusFilter === 'all' || c.status === statusFilter) &&
      (blogFilter === 'all' || c.blog === blogFilter)
  )

  const totalPages = Math.ceil(filteredComments.length / itemsPerPage)
  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-8 font-sans text-slate-900">
      <div className="max-w-250 mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-light tracking-tight text-slate-900">Comments</h1>
          <p className="text-slate-400 mt-2 text-lg font-light">
            จัดการเนื้อหาและความคิดเห็นทั้งหมดบนบล็อกของคุณ
          </p>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setStatusFilter(tab)
                  setCurrentPage(1)
                }}
                className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${statusFilter === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <select
            value={blogFilter}
            onChange={(e) => {
              setBlogFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="px-4 py-2 bg-transparent border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none"
          >
            <option value="all">ทุกบทความ</option>
            {uniqueBlogs.map((blog) => (
              <option key={blog} value={blog}>
                {blog}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {paginatedComments.length > 0 ? (
            paginatedComments.map((comment) => (
              <div
                key={comment.id}
                className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{comment.user}</h3>
                    <p className="text-xs text-slate-400 uppercase tracking-wide font-medium mt-0.5">
                      {comment.blog}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-slate-400 hover:text-emerald-600 p-2">
                      <FiCheck size={18} />
                    </button>
                    <button className="text-slate-400 hover:text-rose-600 p-2">
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl text-sm">
                  {`"${comment.content}"`}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 ${getAIStatusColor(comment.ai_suggestion)}`}
                  >
                    <FiCpu size={12} /> {comment.ai_suggestion.toUpperCase()}
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                    <FiAlertCircle size={12} /> {comment.ai_reason}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-slate-400 italic">
              ไม่พบความคิดเห็นในหมวดหมู่นี้
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex justify-center items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50"
            >
              <FiChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-slate-600">
              หน้า {currentPage} จาก {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentsPage
