'use client'
import { useState } from 'react'

interface CommentFormProps {
  blogId: string | string[] | undefined
}

const CommentForm: React.FC<CommentFormProps> = ({ blogId }) => {
  const [author, setAuthor] = useState('')
  const [commentText, setCommentText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const validateComment = (text: string) => {
    const thaiAndNumbersRegex = /^[0-9\u0E00-\u0E7F\s\n]+$/
    return thaiAndNumbersRegex.test(text)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!author.trim()) {
      setError('กรุณากรอกชื่อผู้ส่ง')
      return
    }

    if (!validateComment(commentText)) {
      setError('ขออภัย ข้อความคอมเมนต์ต้องเป็นภาษาไทย และ/หรือ ตัวเลขเท่านั้น')
      return
    }

    console.log('ส่งข้อมูลคอมเมนต์สำหรับ Blog:', blogId, { author, commentText })

    setCommentText('')
    setSuccess(true)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-gray-50/50 border border-gray-100 p-6 rounded-2xl"
    >
      <p className="text-xs text-gray-400">
        <span className="text-red-500">*</span> หมายเหตุ:
        ทุกความคิดเห็นจะถูกตรวจสอบโดยผู้ดูแลระบบก่อนแสดงผลบนเว็บไซต์
      </p>

      <div className="space-y-1.5">
        <label htmlFor="author" className="text-xs font-bold text-gray-700">
          ชื่อผู้ส่ง
        </label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="กรอกชื่อของคุณ"
          className="w-full text-sm px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:border-gray-900 transition-all"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label htmlFor="comment" className="text-xs font-bold text-gray-700">
          ข้อความความคิดเห็น
        </label>
        <textarea
          id="comment"
          rows={4}
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="พิมพ์ข้อความของคุณที่นี่ (ภาษาไทยและตัวเลขเท่านั้น)..."
          className="w-full text-sm px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-hidden focus:border-gray-900 transition-all resize-none"
          required
        ></textarea>
      </div>

      {error && (
        <p className="text-xs font-medium text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>
      )}
      {success && (
        <p className="text-xs font-medium text-emerald-600 bg-emerald-50 p-3 rounded-lg">
          ส่งความคิดเห็นเรียบร้อยแล้ว! จะแสดงผลหลังจากได้รับการ Approve จาก Admin
        </p>
      )}

      <button
        type="submit"
        className="px-6 py-2.5 bg-gray-900 text-white text-xs font-bold rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
      >
        ส่งความคิดเห็น
      </button>
    </form>
  )
}

export default CommentForm
