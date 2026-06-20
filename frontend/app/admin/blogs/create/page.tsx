'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FiArrowLeft, FiPlus } from 'react-icons/fi'
import { BlogForm } from '@/components/admin/BlogForm'
import { GalleryUploader } from '@/components/admin/GalleryUploader'
import { Sidebar } from '@/components/admin/Sidebar'
import { CoverUploader } from '@/components/admin/CoverUploader'

const CreateBlogPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    isPublished: false,
    coverImage: null as File | null,
  })
  const [isSaving, setIsSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: { class: 'prose prose-sm focus:outline-none max-w-none min-h-[400px] p-5' },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      setWordCount(text.split(/\s+/).filter(Boolean).length)
    },
  })

  const handleSubmit = async () => {
    setIsSaving(true)

    // สร้าง FormData เพื่อส่งไฟล์และข้อมูลพร้อมกัน
    const data = new FormData()
    data.append('title', formData.title)
    data.append('slug', formData.slug)
    data.append('isPublished', String(formData.isPublished))
    data.append('content', editor?.getHTML() || '')
    if (formData.coverImage) {
      data.append('coverImage', formData.coverImage)
    }

    console.log('กำลังบันทึกข้อมูล:', { ...formData, content: editor?.getHTML() })

    setTimeout(() => {
      setIsSaving(false)
      router.push('/admin/blogs')
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
          >
            <FiArrowLeft size={17} />
          </Link>
          <h1 className="text-[15px] font-semibold">สร้างบทความใหม่</h1>
        </div>
        <button
          onClick={handleSubmit}
          className="px-5 py-2 bg-indigo-600 text-white text-[13px] font-bold rounded-lg flex items-center gap-2"
        >
          {isSaving ? (
            'กำลังสร้าง...'
          ) : (
            <>
              <FiPlus size={14} /> ยืนยันการสร้าง
            </>
          )}
        </button>
      </header>

      <main className="max-w-275 mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-6 items-start">
        <div className="flex flex-col gap-5">
          {/* เพิ่มส่วนอัปโหลดรูปหน้าปก */}
          <CoverUploader
            coverImage={formData.coverImage}
            setCoverImage={(file) => setFormData((prev) => ({ ...prev, coverImage: file }))}
          />

          <BlogForm formData={formData} setFormData={setFormData} editor={editor} />
          <GalleryUploader />
        </div>

        <Sidebar
          formData={formData}
          setFormData={setFormData}
          onSave={handleSubmit}
          isSaving={isSaving}
          wordCount={wordCount}
        />
      </main>
    </div>
  )
}

export default CreateBlogPage
