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
import { Modal } from '@/components/admin/Modal'
import axios from '@/lib/axios/admin'

export interface BlogFormData {
  title: string
  slug: string
  isPublished: boolean
  coverImage: File | null
  additionalImages: (File | null)[]
}

const CreateBlogPage = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    isPublished: false,
    coverImage: null,
    additionalImages: Array(6).fill(null),
  })

  const [isSaving, setIsSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const [modal, setModal] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'error' as 'error' | 'confirm',
  })

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

  const handleRequestSave = () => {
    if (!formData.title || !formData.slug) {
      setModal({
        isOpen: true,
        title: 'ข้อมูลไม่ครบถ้วน',
        message: 'กรุณากรอกชื่อบทความและ Slug ให้เรียบร้อย',
        type: 'error',
      })
      return
    }
    setModal({
      isOpen: true,
      title: 'ยืนยันการบันทึก',
      message: 'คุณต้องการสร้างบทความนี้ใช่หรือไม่?',
      type: 'confirm',
    })
  }

  const handleSubmit = async () => {
    setIsSaving(true)
    setModal((prev) => ({ ...prev, isOpen: false }))

    const data = new FormData()
    data.append('title', formData.title)
    data.append('slug', formData.slug)
    data.append('isPublished', String(formData.isPublished))
    data.append('content', editor?.getHTML() || '')

    if (formData.coverImage) data.append('coverImage', formData.coverImage)

    formData.additionalImages.forEach((file) => {
      if (file) data.append('additionalImages', file)
    })

    try {
      await axios.post('/blog', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      router.push('/admin/blogs')
    } catch (error) {
      console.error('บันทึกข้อมูลไม่สำเร็จ:', error)
      setModal({
        isOpen: true,
        title: 'เกิดข้อผิดพลาด',
        message: 'ไม่สามารถบันทึกบทความได้ กรุณาลองใหม่อีกครั้ง',
        type: 'error',
      })
      setIsSaving(false)
    }
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
          onClick={handleRequestSave}
          className="px-5 py-2 bg-indigo-600 text-white text-[13px] font-bold rounded-lg flex items-center gap-2"
          disabled={isSaving}
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
          <CoverUploader
            coverImage={formData.coverImage}
            setCoverImage={(file) => setFormData((prev) => ({ ...prev, coverImage: file }))}
          />
          <BlogForm formData={formData} setFormData={setFormData} editor={editor} />
          <GalleryUploader
            additionalImages={formData.additionalImages}
            setAdditionalImages={(imgs) =>
              setFormData((prev) => ({ ...prev, additionalImages: imgs }))
            }
          />
        </div>

        <Sidebar
          formData={formData}
          setFormData={setFormData}
          onSave={handleRequestSave}
          isSaving={isSaving}
          wordCount={wordCount}
        />
      </main>

      <Modal
        isOpen={modal.isOpen}
        onClose={() => setModal((prev) => ({ ...prev, isOpen: false }))}
        title={modal.title}
        message={modal.message}
        type={modal.type as 'error' | 'confirm'}
        onConfirm={handleSubmit}
      />
    </div>
  )
}

export default CreateBlogPage
