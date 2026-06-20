'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoArrowBackSharp, IoCloseOutline } from 'react-icons/io5'
import CommentForm from '@/components/blog/CommentForm'
import CommentList, { CommentItem } from '@/components/blog/CommentList'
import axios from '@/lib/axios/public'

interface BlogData {
  id: string
  title: string
  content: string
  coverImage: string
  additionalImages: string[]
  author: string
  viewCount: number
  createdAt: string
  comments: CommentItem[]
}

const BlogDetailPage = () => {
  const params = useParams()
  const router = useRouter()
  const slug = params.slug as string

  const [blog, setBlog] = useState<BlogData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        const { data } = await axios.get(`/blog/slug/${slug}`)
        setBlog(data)

        if (data.id) {
          await axios.post(`/blog/${data.id}/view`)
        }
      } catch (err) {
        console.error('Failed to load blog or increment view', err)
      } finally {
        setIsLoading(false)
      }
    }
    if (slug) fetchAndIncrement()
  }, [slug])

  if (isLoading)
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!blog) return <div className="min-h-screen flex items-center justify-center">ไม่พบบทความ</div>

  return (
    <>
      <div className="relative w-screen h-125 overflow-hidden mb-10 ml-[-50vw] left-1/2">
        <Image
          src={`/api/blog/image/${blog.coverImage}`}
          alt="Cover Image"
          fill
          priority
          className="object-contain"
          unoptimized
        />
      </div>

      <article className="mx-auto max-w-7xl px-4 sm:px-6 pb-24 font-sans">
        <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-gray-900 leading-tight tracking-tight mb-6">
          {blog.title}
        </h1>

        <div className="flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
            <Image src="/images/avatar-placeholder.png" alt="Author" width={40} height={40} />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span className="font-bold text-gray-900">{blog.author}</span>
            <span className="text-gray-400">
              {new Date(blog.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{blog.viewCount} Read</span>
          </div>
        </div>

        <div
          className="max-w-none space-y-8 text-gray-500 text-[15px] md:text-base leading-relaxed prose prose-p:my-0 prose-li:my-0"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {blog.additionalImages && blog.additionalImages.filter(Boolean).length > 0 && (
          <div className="mt-16">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6">รูปภาพเพิ่มเติม</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {blog.additionalImages.filter(Boolean).map((imgKey: string, index: number) => (
                <div
                  key={index}
                  className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm group cursor-pointer"
                  onClick={() => setSelectedImage(imgKey)}
                >
                  <Image
                    src={`/api/blog/image/${imgKey}`}
                    alt={`Additional Image ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-16 pt-12 border-t border-gray-100 max-w-3xl mx-auto space-y-12">
          <div>
            <h3 className="text-xl font-black text-gray-900 mb-6">
              ความคิดเห็น ({blog.comments ? blog.comments.length : 0})
            </h3>
            <CommentList comments={blog.comments || []} />
          </div>

          <div className="pt-8 border-t border-gray-100">
            <div className="mb-6">
              <h3 className="text-xl font-black text-gray-900">ร่วมแสดงความคิดเห็น</h3>
              <p className="text-sm text-gray-500 mt-1">
                โปรดระบุชื่อผู้ส่ง และข้อความต้องเป็นภาษาไทยและ/หรือตัวเลขเท่านั้น
              </p>
            </div>
            <CommentForm blogId={blog.id} />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-all cursor-pointer"
          >
            <IoArrowBackSharp size={16} />
            <span>ย้อนกลับ</span>
          </button>
        </div>

        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 sm:-right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                <IoCloseOutline size={36} />
              </button>
              <div className="relative w-full h-full">
                <Image
                  src={`/api/blog/image/${selectedImage}`}
                  alt="Enlarged View"
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          </div>
        )}
      </article>
    </>
  )
}

export default BlogDetailPage
