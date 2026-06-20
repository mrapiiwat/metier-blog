'use client'

import { useState, useEffect } from 'react'
import PostCard from './PostCard'
import Pagination from '../Pagination'
import axios from '@/lib/axios/public'

interface Blog {
  id: string
  slug: string
  title: string
  content: string
  coverImage: string | null
  author: string
  createdAt: string
}

interface PaginationMeta {
  page: number
  limit: number
  totalItems: number
  totalPages: number
}

interface BlogResponse {
  data: Blog[]
  meta: PaginationMeta
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [meta, setMeta] = useState<PaginationMeta | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [searchTerm, setSearchTerm] = useState<string>('')
  const [debouncedSearch, setDebouncedSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setCurrentPage(1)
    }, 500)

    return () => clearTimeout(handler)
  }, [searchTerm])

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get<BlogResponse>('/blog', {
          params: {
            page: currentPage,
            search: debouncedSearch || undefined,
          },
        })

        setBlogs(response.data.data)
        setMeta(response.data.meta)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [currentPage, debouncedSearch])

  return (
    <section className="px-6 md:px-16 py-16 max-w-350 mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-bold">
          All posts <span className="text-base font-light">({meta?.totalItems || 0})</span>
        </h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5959] transition-all"
          />
          <svg
            className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <div className="border-t border-gray-300 mb-12" />

      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">Loading posts...</p>
        </div>
      ) : blogs.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500 text-lg">No posts found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-12">
          {blogs.map((post) => (
            <PostCard
              key={post.id}
              slug={post.slug}
              title={post.title}
              excerpt={
                post.content.length > 150 ? `${post.content.substring(0, 150)}...` : post.content
              }
              img={
                post.coverImage
                  ? `/api/blog/image/${post.coverImage}`
                  : '/images/avatar-placeholder.png'
              }
              authorName={post.author}
              createdAt={post.createdAt}
            />
          ))}
        </div>
      )}

      {meta && meta.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={meta.totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </section>
  )
}

export default Blogs
