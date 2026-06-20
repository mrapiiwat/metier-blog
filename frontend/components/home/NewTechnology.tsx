'use client'
import { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import Link from 'next/link'
import axios from '@/lib/axios/public'

interface PopularBlog {
  id: string
  title: string
  slug: string
  coverImage: string
  authorName: string
  createdAt: string
  views: number
}

const NewTechnology = () => {
  const [blogs, setBlogs] = useState<PopularBlog[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      try {
        const { data } = await axios.get('/blog/popular/4')
        setBlogs(data)
      } catch (error) {
        console.error('Failed to fetch popular blogs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPopularBlogs()
  }, [])

  return (
    <section className="px-6 md:px-16 pb-16 max-w-375 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Most Popular</h2>
        <Link
          href="/blogs"
          className="font-semibold text-sm cursor-pointer hover:text-[#FF7A7A] transition-colors"
        >
          See All
        </Link>
      </div>

      {isLoading ? (
        <div className="text-center py-10">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              views={blog.views}
              slug={blog.slug}
              title={blog.title}
              img={blog.coverImage}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default NewTechnology
