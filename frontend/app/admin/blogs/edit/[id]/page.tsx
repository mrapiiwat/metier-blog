'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FiArrowLeft } from 'react-icons/fi'
import { BlogForm } from '@/components/admin/BlogForm'
import { GalleryUploader } from '@/components/admin/GalleryUploader'
import { CoverUploader } from '@/components/admin/CoverUploader'
import { Sidebar } from '@/components/admin/Sidebar'
import axios from '@/lib/axios/admin'

interface BlogFormData {
  title: string
  slug: string
  isPublished: boolean
  coverImage: File | string | null
  additionalImages: (File | string | null)[]
  createdAt?: string | null
  updatedAt?: string | null
}

const EditBlogPage = () => {
  const params = useParams()
  const router = useRouter()
  const blogId = params.id as string

  const [formData, setFormData] = useState<BlogFormData>({
    title: '',
    slug: '',
    isPublished: false,
    coverImage: null,
    additionalImages: Array(6).fill(null),
    createdAt: null,
    updatedAt: null,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: { class: 'prose prose-sm focus:outline-none max-w-none min-h-[400px] p-5' },
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
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
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
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
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
      </header>

      <main className="max-w-275 mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-6 items-start">
        <div className="flex flex-col gap-5">
          <CoverUploader
            coverImage={formData.coverImage}
            setCoverImage={(file) => setFormData((p) => ({ ...p, coverImage: file }))}
          />
          <BlogForm formData={formData} setFormData={setFormData} editor={editor} />
          <GalleryUploader
            blogId={blogId}
            additionalImages={formData.additionalImages}
            setAdditionalImages={(imgs) => setFormData((p) => ({ ...p, additionalImages: imgs }))}
          />
        </div>

        <Sidebar
          formData={formData}
          setFormData={setFormData}
          onSave={handleSubmit}
          isSaving={isSaving}
          createdAt={formData.createdAt}
          updatedAt={formData.updatedAt}
        />
      </main>
    </div>
  )
}

export default EditBlogPage
