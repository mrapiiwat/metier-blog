import React from 'react'
import Link from 'next/link'
import { FiCheck, FiX, FiClock } from 'react-icons/fi'
import { BsStars } from 'react-icons/bs'

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

interface RecentCommentsProps {
  comments: CommentItem[]
  onApprove: (id: number) => void
  onReject: (id: number) => void
}

const aiStatusColors = {
  approve: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  flagged: 'bg-amber-50 text-amber-600 border-amber-100',
  reject: 'bg-red-50 text-red-600 border-red-100',
  pending: 'bg-gray-50 text-gray-500 border-gray-200',
}

const RecentComments: React.FC<RecentCommentsProps> = ({ comments, onApprove, onReject }) => {
  return (
    <div className="bg-white border border-gray-100/80 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full">
      <div className="px-7 py-6 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-xl">
        <div>
          <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">คิวตรวจสอบ</h3>
          <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
            <BsStars className="text-indigo-500" /> AI ช่วยสแกนภาษาไทยและตัวเลข
          </p>
        </div>
        <Link
          href="comments"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors shrink-0"
        >
          ดูทั้งหมด
        </Link>
      </div>

      <div className="divide-y divide-gray-50 overflow-y-auto flex-1 max-h-125">
        {comments.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-10 text-gray-300">
            <FiCheck size={48} className="mb-3 opacity-50" />
            <p className="text-sm font-medium">ตรวจครบหมดแล้ว เก่งมาก!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col gap-4"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                      {comment.author.charAt(0)}
                    </div>
                    <span className="font-bold text-sm text-gray-900">{comment.author}</span>

                    <span className="text-[10px] bg-gray-100 text-gray-500 font-medium px-2 py-0.5 rounded-sm truncate max-w-37.5 sm:max-w-50">
                      บนบทความ: {comment.blogTitle}
                    </span>
                  </div>
                  <p className="text-[13px] text-gray-600 leading-relaxed bg-white border border-gray-100 p-3 rounded-2xl">
                    &quot;{comment.content}&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-bold border ${aiStatusColors[comment.aiAnalysis.status]}`}
                >
                  {comment.aiAnalysis.status === 'pending' ? (
                    <FiClock size={12} />
                  ) : (
                    <BsStars size={12} />
                  )}
                  <span>{comment.aiAnalysis.message}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onReject(comment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all cursor-pointer border border-transparent hover:border-red-100 shadow-xs"
                    title="ไม่อนุมัติ"
                  >
                    <FiX size={16} strokeWidth={3} />
                  </button>
                  <button
                    onClick={() => onApprove(comment.id)}
                    className="p-2 text-white bg-gray-900 hover:bg-gray-800 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg hover:-translate-y-0.5"
                    title="อนุมัติ"
                  >
                    <FiCheck size={16} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default RecentComments
