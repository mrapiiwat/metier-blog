'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from '@/lib/axios/public'

interface PopularBlog {
  id: string
  title: string
  slug: string
  authorName: string
  createdAt: string
}

const TrendingSection = () => {
  const [blogs, setBlogs] = useState<PopularBlog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const hoverClass =
    'cursor-pointer p-6 rounded-md transition-all duration-300 hover:bg-[#FF7A7A] hover:text-white group'
  const textClass = 'text-xs mb-1 opacity-70'
  const titleClass = 'text-xl font-bold leading-snug line-clamp-2'

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await axios.get('/blog/popular/5')
        setBlogs(data)
      } catch (error) {
        console.error('Failed to fetch trending blogs:', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchTrending()
  }, [])

  return (
    <div className="lg:col-span-5">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Trending Blogs</h2>
        <Link
          href="/blogs"
          className="font-semibold text-sm hover:text-[#FF7A7A] transition-colors"
        >
          See all
        </Link>
      </div>

      <div className="flex flex-col">
        {isLoading ? (
          <p className="px-6 text-slate-400">Loading trending...</p>
        ) : (
          blogs.map((blog) => (
            <Link href={`/blogs/${blog.slug}`} key={blog.id} className={hoverClass}>
              <p className={textClass}>
                By {blog.authorName} |{' '}
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <h4 className={titleClass}>{blog.title}</h4>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default TrendingSection
