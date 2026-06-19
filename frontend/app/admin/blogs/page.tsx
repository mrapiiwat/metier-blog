'use client'
import React, { useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import AdminPageHeader from '@/components/admin/AdminPageHeader'
import BlogSearch, { FilterStatus } from '@/components/admin/BlogSearch'
import BlogTable, { BlogItem } from '@/components/admin/BlogTable'

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([
    {
      id: 1,
      title: 'Classic Revival: Revisiting Iconic Cars',
      slug: 'classic-revival',
      date: '2026-06-18',
      views: 1250,
      isPublished: true,
    },
    {
      id: 2,
      title: 'The Future of Electric Vehicles Strategy',
      slug: 'future-ev',
      date: '2026-06-15',
      views: 840,
      isPublished: false,
    },
    {
      id: 3,
      title: 'Top 10 Maintenance Tips for Old Cars',
      slug: 'maintenance-tips',
      date: '2026-06-10',
      views: 3200,
      isPublished: true,
    },
    {
      id: 4,
      title: 'Why 90s JDM Cars Are Increasing In Value',
      slug: '90s-jdm',
      date: '2026-06-08',
      views: 4500,
      isPublished: true,
    },
    {
      id: 5,
      title: 'How to Choose the Right Tires for Your Car',
      slug: 'choose-right-tires',
      date: '2026-06-05',
      views: 0,
      isPublished: false,
    },
  ])

  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all')

  const handleTogglePublish = (id: number) => {
    setBlogs(blogs.map((b) => (b.id === id ? { ...b, isPublished: !b.isPublished } : b)))
  }

  const handleDelete = (id: number) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) {
      setBlogs(blogs.filter((b) => b.id !== id))
    }
  }

  const filteredBlogs = blogs.filter((blog) => {
    const matchSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.slug.toLowerCase().includes(searchQuery.toLowerCase())

    let matchFilter = true
    if (filterStatus === 'published') matchFilter = blog.isPublished === true
    if (filterStatus === 'draft') matchFilter = blog.isPublished === false

    return matchSearch && matchFilter
  })

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
          totalItems={filteredBlogs.length}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />

        <BlogTable
          blogs={filteredBlogs}
          onTogglePublish={handleTogglePublish}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

export default ManageBlogs
