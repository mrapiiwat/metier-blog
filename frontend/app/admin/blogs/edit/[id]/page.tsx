'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FiArrowLeft, FiBold, FiItalic, FiList, FiTrash2, FiImage } from 'react-icons/fi'
import Image from 'next/image'
import { GalleryUploader } from '@/components/admin/GalleryUploader'
import axios from '@/lib/axios/admin'

interface BlogFormData {
  title: string
  slug: string
  isPublished: boolean
  coverImage: File | string | null
  additionalImages: (File | string | null)[]
}

const EditBlogPage = () => {
  const params = useParams()
  const router = useRouter()
  const blogId = params.id as string
  const coverInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    isPublished: false,
    coverImage: null,
    additionalImages: Array(6).fill(null),
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: { class: 'prose prose-sm focus:outline-none max-w-none min-h-[300px] p-5' },
    },
  })

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await axios.get(`/blog/${blogId}`)
        setFormData({
          title: data.title,
          slug: data.slug,
          isPublished: data.isPublished,
          coverImage: data.coverImage,
          additionalImages: data.additionalImages || Array(6).fill(null),
        })
        editor?.commands.setContent(data.content)
      } catch (error) {
        console.error('Failed to fetch:', error)
      } finally {
        setIsLoading(false)
      }
    }
    if (editor && blogId) fetchBlog()
  }, [blogId, editor])

  const handleSubmit = async () => {
    setIsSaving(true)
    const data = new FormData()
    data.append('title', formData.title)
    data.append('slug', formData.slug)
    data.append('isPublished', String(formData.isPublished))
    if (editor) data.append('content', editor.getHTML())

    if (formData.coverImage instanceof File) data.append('coverImage', formData.coverImage)

    formData.additionalImages.forEach((img) => {
      if (img instanceof File) data.append('additionalImages', img)
    })

    try {
      await axios.put(`/blog/${blogId}`, data)
      router.push('/admin/blogs')
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">Loading...</div>
    )

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-10">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
          >
            <FiArrowLeft size={17} />
          </Link>
          <h1 className="text-[15px] font-semibold">แก้ไขบทความ</h1>
        </div>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-gray-900 text-white text-[13px] font-semibold rounded-lg"
        >
          {isSaving ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-6 items-start">
        <div className="flex flex-col gap-5">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50">
              <p className="text-[11px] font-bold text-gray-400 uppercase">รูปหน้าปก</p>
            </div>
            <div className="p-5">
              <input
                type="file"
                ref={coverInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) =>
                  e.target.files && setFormData((p) => ({ ...p, coverImage: e.target.files![0] }))
                }
              />
              <div
                onClick={() => coverInputRef.current?.click()}
                className="w-full aspect-21/6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative"
              >
                {formData.coverImage ? (
                  <Image
                    src={`/api/blog/image/${formData.coverImage}`}
                    alt="Cover"
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                ) : (
                  <>
                    <FiImage size={24} className="text-gray-400" />
                    <p className="text-xs mt-2 text-gray-400">อัปโหลดรูปหน้าปก</p>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-5">
            <input
              value={formData.title}
              onChange={(e) => setFormData((p) => ({ ...p, title: e.target.value }))}
              className="w-full text-xl font-bold focus:outline-none border-b border-gray-100 pb-1"
            />
            <input
              value={formData.slug}
              onChange={(e) => setFormData((p) => ({ ...p, slug: e.target.value }))}
              className="w-full bg-gray-50 border rounded-xl px-4 py-2 text-sm focus:outline-none"
            />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b border-gray-50 flex items-center gap-1 bg-gray-50/50">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className="p-2 text-gray-400"
              >
                <FiBold size={16} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className="p-2 text-gray-400"
              >
                <FiItalic size={16} />
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className="p-2 text-gray-400"
              >
                <FiList size={16} />
              </button>
            </div>
            <EditorContent editor={editor} />
          </div>

          <GalleryUploader
            blogId={blogId}
            additionalImages={formData.additionalImages}
            setAdditionalImages={(imgs) => setFormData((p) => ({ ...p, additionalImages: imgs }))}
          />
        </div>

        <aside className="flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <p className="text-[11px] font-bold text-gray-400 uppercase mb-3">สถานะ</p>
            <select
              value={String(formData.isPublished)}
              onChange={(e) =>
                setFormData((p) => ({ ...p, isPublished: e.target.value === 'true' }))
              }
              className="w-full p-2.5 bg-gray-50 border rounded-lg text-[13px]"
            >
              <option value="true">เผยแพร่แล้ว</option>
              <option value="false">ฉบับร่าง</option>
            </select>
          </div>
          <button className="w-full py-3 border border-red-100 text-red-500 text-[13px] font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50">
            <FiTrash2 size={14} /> ลบบทความ
          </button>
        </aside>
      </main>
    </div>
  )
}

export default EditBlogPage
