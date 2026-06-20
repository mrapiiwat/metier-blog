'use client'
import React from 'react'
import { Editor, EditorContent } from '@tiptap/react'
import { FiBold, FiItalic, FiList } from 'react-icons/fi'
// import type { BlogFormData } from '@/types/blog' // แนะนำให้ใช้แบบนี้ในอนาคต

// แก้ตรงนี้ครับ: เพิ่ม coverImage เข้าไปให้ตรงกับในหน้าหลัก
interface BlogFormData {
  title: string
  slug: string
  isPublished: boolean
  coverImage: File | null
}

interface BlogFormProps {
  formData: BlogFormData
  setFormData: React.Dispatch<React.SetStateAction<BlogFormData>>
  editor: Editor | null
}

export const BlogForm = ({ formData, setFormData, editor }: BlogFormProps) => (
  <div className="flex flex-col gap-5">
    <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5 shadow-sm">
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
          ชื่อบทความ (Title)
        </label>
        <input
          value={formData.title}
          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
          className="w-full text-xl font-bold focus:outline-none p-2 border-b border-gray-100 focus:border-indigo-500 transition-colors"
          placeholder="ชื่อบทความ"
        />
      </div>
      <div>
        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2 block">
          URL Slug (เส้นทาง URL)
        </label>
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm">
          <span className="text-gray-400 font-medium">/blogs/</span>
          <input
            value={formData.slug}
            onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
            className="bg-transparent focus:outline-none ml-1 w-full font-medium text-gray-700"
            placeholder="slug"
          />
        </div>
      </div>
    </div>

    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
      <div className="px-4 py-2 border-b border-gray-50 flex items-center gap-1 bg-gray-50/50">
        <button
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={`p-2 rounded-lg ${editor?.isActive('bold') ? 'bg-white text-indigo-600' : 'text-gray-400 hover:bg-white'}`}
        >
          <FiBold size={16} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-lg ${editor?.isActive('italic') ? 'bg-white text-indigo-600' : 'text-gray-400 hover:bg-white'}`}
        >
          <FiItalic size={16} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded-lg ${editor?.isActive('bulletList') ? 'bg-white text-indigo-600' : 'text-gray-400 hover:bg-white'}`}
        >
          <FiList size={16} />
        </button>
      </div>
      <EditorContent editor={editor} className="p-5 min-h-75" />
    </div>
  </div>
)
