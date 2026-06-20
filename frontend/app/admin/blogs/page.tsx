'use client'
import { useState, useEffect, useCallback } from 'react'
import { FiPlus } from 'react-icons/fi'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import BlogSearch, { FilterStatus } from '@/components/admin/BlogSearch'
import BlogTable, { BlogItem } from '@/components/admin/BlogTable'
import axios from '@/lib/axios/admin'
import { Modal } from '@/components/admin/Modal'

interface ApiBlogItem {
  id: number
  title: string
  slug: string
  createdAt: string
  views: number
  isPublished: boolean
}

interface ApiResponse {
  data: ApiBlogItem[]
  meta: {
    totalPages: number
  }
}

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: number | null }>({
    isOpen: false,
    id: null,
  })

  const fetchBlogs = useCallback(
    async (page: number) => {
      setIsLoading(true)
      try {
        const res = await axios.get<ApiResponse>('/blog', {
          params: { search: searchQuery, page },
        })

        const mappedBlogs: BlogItem[] = res.data.data.map((b: ApiBlogItem) => ({
          id: b.id,
          title: b.title,
          slug: b.slug,
          date: new Date(b.createdAt).toLocaleDateString(),
          views: b.views || 0,
          isPublished: b.isPublished,
        }))

        setBlogs(mappedBlogs)
        setTotalPages(res.data.meta.totalPages)
        setCurrentPage(page)
      } catch (error) {
        console.error('Failed to fetch blogs:', error)
      } finally {
        setIsLoading(false)
      }
    },
    [searchQuery]
  )

  useEffect(() => {
    const loadInitialData = async () => {
      await fetchBlogs(1)
    }
    loadInitialData()
  }, [fetchBlogs])

  const handleTogglePublish = async (id: number) => {
    const blog = blogs.find((b) => b.id === id)
    if (!blog) return
    try {
      await axios.put(`/blog/${id}`, { isPublished: !blog.isPublished })
      await fetchBlogs(currentPage)
    } catch (error) {
      console.error('Toggle publish failed', error)
    }
  }

  const confirmDelete = async () => {
    if (deleteModal.id) {
      try {
        await axios.delete(`/blog/${deleteModal.id}`)
        setDeleteModal({ isOpen: false, id: null })
        await fetchBlogs(currentPage)
      } catch (error) {
        console.error('Delete failed', error)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans pb-20">
      <AdminPageHeader
        title="Manage Blogs"
        description="จัดการเนื้อหา เผยแพร่ แก้ไข หรือลบบทความทั้งหมดในระบบ"
        actionLabel="สร้างบทความ"
        actionHref="blogs/create"
        actionIcon={<FiPlus size={18} strokeWidth={3} />}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 space-y-6">
        <BlogSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          totalItems={blogs.length}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        {isLoading ? (
          <div className="p-20 text-center text-slate-400">กำลังโหลดข้อมูล...</div>
        ) : (
          <BlogTable
            blogs={blogs.filter((b) =>
              filterStatus === 'all'
                ? true
                : filterStatus === 'published'
                  ? b.isPublished
                  : !b.isPublished
            )}
            onTogglePublish={handleTogglePublish}
            onDelete={(id) => setDeleteModal({ isOpen: true, id })}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={fetchBlogs}
          />
        )}
      </div>

      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: null })}
        title="ยืนยันการลบบทความ"
        message="คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้? การดำเนินการนี้ไม่สามารถย้อนกลับได้"
        type="confirm"
        onConfirm={confirmDelete}
      />
    </div>
  )
}

export default ManageBlogs
