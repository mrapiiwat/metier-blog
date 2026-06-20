import React from 'react'

export interface CommentItem {
  id: string
  senderName: string
  message: string
  createdAt: string
}

interface CommentListProps {
  comments: CommentItem[]
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return <p className="text-sm text-gray-400 italic py-4">ยังไม่มีความคิดเห็นสำหรับบทความนี้</p>
  }

  return (
    <div className="space-y-6">
      {comments.map((item) => {
        const initial = item.senderName ? item.senderName.charAt(0).toUpperCase() : 'U'

        return (
          <div
            key={item.id}
            className="flex gap-4 pb-6 border-b border-gray-100 last:border-0 last:pb-0"
          >
            <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center font-bold text-sm shrink-0 select-none">
              {initial}
            </div>

            <div className="space-y-1.5 flex-1 pt-0.5">
              <div className="flex items-center gap-2.5">
                <span className="font-bold text-sm text-gray-900">{item.senderName}</span>
                <span className="text-xs text-gray-400">
                  {new Date(item.createdAt).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="text-[15px] text-gray-600 leading-relaxed">{item.message}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default CommentList
