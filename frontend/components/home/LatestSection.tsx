'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import axios from '@/lib/axios/public'

interface LatestBlog {
  id: string
  title: string
  content: string
  slug: string
  coverImage: string
  authorName: string
  createdAt: string
}

const LatestSection = () => {
  const [blog, setBlog] = useState<LatestBlog | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const { data } = await axios.get('/blog/latest')
        setBlog(data)
      } catch (error) {
        console.error('Failed to fetch latest blog:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchLatest()
  }, [])

  if (isLoading) {
    return <div className="lg:col-span-8 h-96 flex items-center justify-center">Loading...</div>
  }

  if (!blog) return null

  return (
    <div className="lg:col-span-8">
      <h2 className="text-3xl font-bold mb-8">Latest</h2>
      <div className="border border-gray-200 p-6 rounded-lg">
        <div className="relative w-full h-87.5 mb-6">
          <Image
            src={`/api/blog/image/${blog.coverImage}`}
            alt={blog.title}
            fill
            className="object-cover rounded-md"
            unoptimized={true}
          />
        </div>
        <p className="text-sm text-gray-500 mb-2">
          By <span className="text-[#FF7A7A]">{blog.authorName}</span> |{' '}
          {new Date(blog.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })}
        </p>
        <h3 className="text-2xl font-bold mb-4 line-clamp-2">{blog.title}</h3>
        <p
          className="mb-6 font-light line-clamp-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        <Link
          href={`/blogs/${blog.slug}`}
          className="bg-[#FF5959] hover:bg-[#FF7A7A] text-white px-8 py-3 rounded-md font-bold inline-block"
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

export default LatestSection
