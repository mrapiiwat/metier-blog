'use client'
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FiEye } from 'react-icons/fi'

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
}

const BlogTable: React.FC<BlogTableProps> = ({ blogs, onTogglePublish }) => {
  const router = useRouter()

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-2">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              <th className="px-6 py-5">Article Information</th>
              <th className="px-6 py-5">Status</th>
              <th className="px-6 py-5">Engagement</th>
              <th className="px-6 py-5 text-right">Preview</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {blogs.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-24 text-center text-slate-300 font-medium italic">
                  No articles found
                </td>
              </tr>
            ) : (
              blogs.map((blog) => (
                <tr
                  key={blog.id}
                  onClick={() => router.push(`blogs/edit/${blog.id}`)}
                  className="group cursor-pointer hover:bg-slate-50/80 transition-all duration-300"
                >
                  <td className="px-6 py-6">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-800 text-sm group-hover:text-indigo-600 transition-colors">
                        {blog.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono mt-1 opacity-70">
                        /{blog.slug}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onTogglePublish(blog.id)
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase transition-all duration-300 ${
                        blog.isPublished
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : 'bg-slate-100 text-slate-500 border-transparent'
                      }`}
                    >
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </button>
                  </td>
                  <td className="px-6 py-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-bold text-slate-700 text-sm">
                        {blog.views.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">Views</span>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <Link
                      href={`/blogs/${blog.slug}`}
                      target="_blank"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block p-2 text-slate-400 hover:text-indigo-600 transition-colors"
                    >
                      <FiEye size={18} />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="px-6 py-4 border-t border-slate-50 flex items-center justify-between">
        <div className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">
          Showing {blogs.length} Results
        </div>
        <div className="flex gap-1">
          {['1', '2', '3'].map((page) => (
            <button
              key={page}
              className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${page === '1' ? 'bg-slate-900 text-white shadow-lg' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default BlogTable
