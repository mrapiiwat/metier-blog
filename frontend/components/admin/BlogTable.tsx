import React from 'react'
import Link from 'next/link'
import { FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'

export interface BlogItem {
  id: number
  title: string
  slug: string
  date: string
  views: number
  isPublished: boolean
}

interface BlogTableProps {
  blogs: BlogItem[]
  onTogglePublish: (id: number) => void
  onDelete: (id: number) => void
}

const BlogTable: React.FC<BlogTableProps> = ({ blogs, onTogglePublish, onDelete }) => {
  return (
    <div className="bg-white border border-gray-100/80 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-200">
          <thead>
            <tr className="bg-gray-50/50 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
              <th className="px-7 py-5 font-semibold">ชื่อบทความ / Slug</th>
              <th className="px-7 py-5 font-semibold">วันที่โพสต์</th>
              <th className="px-7 py-5 font-semibold">ยอดวิว</th>
              <th className="px-7 py-5 font-semibold">สถานะ</th>
              <th className="px-7 py-5 text-right font-semibold">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-7 py-16 text-center text-gray-400">
                  ไม่พบบทความที่ค้นหา
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50/80 transition-colors group">
                  <td className="px-7 py-5 w-2/5">
                    <div className="font-bold text-gray-900 line-clamp-1 mb-1 group-hover:text-indigo-600 transition-colors">
                      {blog.title}
                    </div>
                    <div className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                      /{blog.slug}
                    </div>
                  </td>
                  <td className="px-7 py-5 text-gray-500 text-xs font-medium">
                    {new Date(blog.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-7 py-5 text-gray-500 font-medium text-xs">
                    {blog.views.toLocaleString()} ครั้ง
                  </td>
                  <td className="px-7 py-5">
                    <button
                      onClick={() => onTogglePublish(blog.id)}
                      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer border
                        ${blog.isPublished 
                          ? 'bg-emerald-50/50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' 
                          : 'bg-gray-50 text-gray-500 border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                      <span className={`relative flex h-2 w-2`}>
                        {blog.isPublished && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${blog.isPublished ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                      </span>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-7 py-5 text-right">
                    <div className="flex items-center justify-end gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/blogs/${blog.slug}`} target="_blank" className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors" title="ดูบทความ">
                        <FiEye size={16} />
                      </Link>
                      <Link href={`blogs/edit/${blog.id}`} className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors" title="แก้ไข">
                        <FiEdit2 size={16} />
                      </Link>
                      <button onClick={() => onDelete(blog.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer" title="ลบ">
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-7 py-4 border-t border-gray-50 flex items-center justify-between bg-gray-50/30">
        <span className="text-xs text-gray-500 font-medium">แสดง 1 ถึง {blogs.length} จาก {blogs.length} รายการ</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-xs font-bold text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed">ก่อนหน้า</button>
          <button className="px-3 py-1.5 text-xs font-bold text-white bg-indigo-600 rounded-lg">1</button>
          <button className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">ถัดไป</button>
        </div>
      </div>
    </div>
  )
}

export default BlogTable