import React from 'react'
import Link from 'next/link'

interface AdminPageHeaderProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
  actionIcon?: React.ReactNode
}

const AdminPageHeader: React.FC<AdminPageHeaderProps> = ({
  title,
  description,
  actionLabel,
  actionHref,
  actionIcon,
}) => {
  return (
    <div className="bg-linear-to-b from-[#181A25] to-[#1E202C] pt-12 pb-24 px-4 sm:px-6 lg:px-8 border-b border-gray-800/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">{title}</h1>
          <p className="text-sm text-gray-400 mt-2">{description}</p>
        </div>
        {actionLabel && actionHref && (
          <Link
            href={actionHref}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 text-sm font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 cursor-pointer shrink-0"
          >
            {actionIcon}
            <span>{actionLabel}</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default AdminPageHeader
