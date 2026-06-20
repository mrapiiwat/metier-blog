import React from 'react'
import Link from 'next/link'
import { FiEdit2 } from 'react-icons/fi'

export interface BlogItem {
  id: string
  title: string
  slug: string
  date: string
  isPublished: boolean
}

interface RecentBlogsProps {
  blogs: BlogItem[]
  onTogglePublish: (id: string) => void
}

const RecentBlogs: React.FC<RecentBlogsProps> = ({ blogs, onTogglePublish }) => {
  return (
    <div className="bg-white border border-gray-100/80 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden flex flex-col h-full">
      <div className="px-7 py-6 border-b border-gray-50 flex justify-between items-center bg-white/50 backdrop-blur-xl">
        <div>
          <h3 className="font-extrabold text-gray-900 text-lg tracking-tight">บทความล่าสุด</h3>
          <p className="text-xs text-gray-400 mt-0.5">จัดการสถานะการเผยแพร่เนื้อหา</p>
        </div>
        <Link
          href="blogs"
          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-xl transition-colors"
        >
          ดูทั้งหมด
        </Link>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse min-w-125">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="px-7 py-4 font-semibold">ชื่อบทความ</th>
              <th className="px-7 py-4 font-semibold">วันที่โพสต์</th>
              <th className="px-7 py-4 font-semibold">สถานะ</th>
              <th className="px-7 py-4 text-right font-semibold">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-7 py-10 text-center text-gray-400">
                  ยังไม่มีบทความ
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-7 py-5 font-bold text-gray-900 w-1/2">
                    <div className="line-clamp-1 group-hover:text-indigo-600 transition-colors">
                      {blog.title}
                    </div>
                  </td>
                  <td className="px-7 py-5 text-gray-400 font-medium text-xs">
                    {blog.date
                      ? new Date(blog.date).toLocaleDateString('th-TH', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : '-'}
                  </td>
                  <td className="px-7 py-5">
                    <button
                      onClick={() => onTogglePublish(blog.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border
                        ${
                          blog.isPublished
                            ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                            : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                      <span className={`relative flex h-2 w-2`}>
                        {blog.isPublished && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        )}
                        <span
                          className={`relative inline-flex rounded-full h-2 w-2 ${blog.isPublished ? 'bg-emerald-500' : 'bg-gray-400'}`}
                        ></span>
                      </span>
                      {blog.isPublished ? 'เผยแพร่แล้ว' : 'ฉบับร่าง'}
                    </button>
                  </td>
                  <td className="px-7 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`blogs/edit/${blog.id}`}
                        className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors"
                      >
                        <FiEdit2 size={16} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentBlogs
