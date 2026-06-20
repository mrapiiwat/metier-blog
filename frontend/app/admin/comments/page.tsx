'use client'
import { useState, useEffect, useCallback } from 'react'
import {
  FiCheck,
  FiTrash2,
  FiCpu,
  FiAlertCircle,
  FiChevronLeft,
  FiChevronRight,
  FiX,
} from 'react-icons/fi'
import axios from '@/lib/axios/admin'

type CommentStatus = 'pending' | 'approved' | 'rejected'
type AIRecommendation = 'approve' | 'reject' | 'flagged' | 'pending'

interface Comment {
  id: string
  blogId: string
  senderName: string
  message: string
  status: CommentStatus
  aiSuggestion: AIRecommendation
  aiReason: string
}

interface FetchParams {
  page: number
  limit: number
  status?: string
  blogId?: string
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
  const [totalPages, setTotalPages] = useState(1)
  const itemsPerPage = 5

  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [commentToDelete, setCommentToDelete] = useState<Comment | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true)
      const params: FetchParams = {
        page: currentPage,
        limit: itemsPerPage,
      }
      if (statusFilter !== 'all') params.status = statusFilter
      if (blogFilter !== 'all' && blogFilter.trim() !== '') params.blogId = blogFilter

      const { data } = await axios.get('/comment', { params })
      setComments(data.data)
      setTotalPages(data.meta.totalPages || 1)
    } catch (error) {
      console.error('Failed to fetch comments', error)
    } finally {
      setIsLoading(false)
    }
  }, [currentPage, statusFilter, blogFilter])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchComments()
  }, [fetchComments])

  const handleUpdateStatus = async (id: string, newStatus: CommentStatus) => {
    try {
      await axios.patch(`/comment/${id}/status`, { status: newStatus })
      fetchComments()
    } catch (error) {
      console.error('Failed to update status', error)
      alert('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ')
    }
  }

  const handleDelete = async () => {
    if (!commentToDelete) return
    setIsDeleting(true)
    try {
      await axios.delete(`/comment/${commentToDelete.id}`)
      fetchComments()
      setCommentToDelete(null)
    } catch (error) {
      console.error('Failed to delete comment', error)
      alert('เกิดข้อผิดพลาดในการลบคอมเมนต์')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FDFDFD] p-8 font-sans text-slate-900">
      <div className="max-w-250 mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-light tracking-tight text-slate-900">Comments</h1>
          <p className="text-slate-400 mt-2 text-lg font-light">
            จัดการเนื้อหาและความคิดเห็นทั้งหมดบนบล็อกของคุณ
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
            {['all', 'pending', 'approved', 'rejected'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setStatusFilter(tab)
                  setCurrentPage(1)
                }}
                className={`px-5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap ${statusFilter === tab ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              placeholder="กรองด้วย Blog ID..."
              value={blogFilter === 'all' ? '' : blogFilter}
              onChange={(e) => {
                setBlogFilter(e.target.value || 'all')
                setCurrentPage(1)
              }}
              className="px-4 py-2 bg-transparent border border-slate-200 rounded-xl text-sm text-slate-600 focus:outline-none focus:border-slate-400 min-w-50"
            />
          </div>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-20 text-slate-400">กำลังโหลดข้อมูล...</div>
          ) : comments.length > 0 ? (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:border-slate-200 transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-900">{comment.senderName}</h3>
                    <p className="text-xs text-slate-400 font-medium mt-0.5">
                      Blog ID: <span className="font-mono">{comment.blogId}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'approved')}
                      disabled={comment.status === 'approved'}
                      title="Approve"
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        comment.status === 'approved'
                          ? 'text-emerald-500 bg-emerald-50 cursor-not-allowed opacity-50'
                          : 'text-slate-400 hover:text-emerald-600 bg-slate-50 hover:bg-emerald-50'
                      }`}
                    >
                      <FiCheck size={18} />
                    </button>

                    <button
                      onClick={() => handleUpdateStatus(comment.id, 'rejected')}
                      disabled={comment.status === 'rejected'}
                      title="Reject"
                      className={`p-2 rounded-lg transition-colors cursor-pointer ${
                        comment.status === 'rejected'
                          ? 'text-rose-500 bg-rose-50 cursor-not-allowed opacity-50'
                          : 'text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50'
                      }`}
                    >
                      <FiX size={18} />
                    </button>

                    <button
                      onClick={() => setCommentToDelete(comment)}
                      title="Delete"
                      className="text-slate-400 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 p-2 rounded-lg transition-colors ml-2 cursor-pointer"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl text-sm">
                  {`"${comment.message}"`}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 ${getAIStatusColor(comment.aiSuggestion)}`}
                  >
                    <FiCpu size={12} /> {(comment.aiSuggestion || 'pending').toUpperCase()}
                  </div>
                  {comment.aiReason && (
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <FiAlertCircle size={12} /> {comment.aiReason}
                    </div>
                  )}
                  <div
                    className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
                      comment.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-700'
                        : comment.status === 'rejected'
                          ? 'bg-rose-100 text-rose-700'
                          : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    Status: {comment.status}
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
              disabled={currentPage === 1 || isLoading}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 hover:bg-slate-50 cursor-pointer"
            >
              <FiChevronLeft size={20} />
            </button>
            <span className="text-sm font-medium text-slate-600">
              หน้า {currentPage} จาก {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages || isLoading}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-lg bg-white border border-slate-200 disabled:opacity-50 hover:bg-slate-50 cursor-pointer"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {commentToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrash2 className="text-rose-500 w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">ลบความคิดเห็น</h3>
              <p className="text-sm text-gray-500 mb-6">
                คุณแน่ใจหรือไม่ว่าต้องการลบความคิดเห็นของ <b>{commentToDelete.senderName}</b>?
                การกระทำนี้ไม่สามารถย้อนกลับได้
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setCommentToDelete(null)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2.5 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 transition-colors flex justify-center items-center gap-2 disabled:bg-rose-400"
                >
                  {isDeleting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      กำลังลบ...
                    </>
                  ) : (
                    'ยืนยันการลบ'
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CommentsPage
