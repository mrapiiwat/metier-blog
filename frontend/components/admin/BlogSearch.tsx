import React from 'react'
import { FiSearch, FiLayers, FiCheckCircle, FiCircle } from 'react-icons/fi'

export type FilterStatus = 'all' | 'published' | 'draft'

interface BlogSearchProps {
    searchQuery: string
    setSearchQuery: (query: string) => void
    totalItems: number
    filterStatus: FilterStatus
    setFilterStatus: (status: FilterStatus) => void
}

const BlogSearch: React.FC<BlogSearchProps> = ({
    searchQuery,
    setSearchQuery,
    totalItems,
    filterStatus,
    setFilterStatus
}) => {
    return (
        <div className="bg-white border border-gray-100/80 rounded-3xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] p-4 sm:p-6 flex flex-col xl:flex-row gap-5 justify-between items-center">

            <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto items-center">

                <div className="relative w-full sm:w-80">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="ค้นหาจากชื่อบทความ หรือ Slug..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-gray-50/50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all"
                    />
                </div>

                <div className="flex flex-wrap gap-2.5 w-full sm:w-auto">
                    <button
                        onClick={() => setFilterStatus('all')}
                        className={`flex items-center justify-center gap-2 w-full sm:w-30 py-2.5 text-sm font-bold rounded-xl border transition-all ${filterStatus === 'all'
                            ? 'border-gray-900 text-gray-900 shadow-sm bg-white'
                            : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-700 bg-white'
                            }`}
                    >
                        <FiLayers size={16} />
                        ทั้งหมด
                    </button>

                    <button
                        onClick={() => setFilterStatus('published')}
                        className={`flex items-center justify-center gap-2 w-full sm:w-30 py-2.5 text-sm font-bold rounded-xl border transition-all ${filterStatus === 'published'
                            ? 'border-gray-900 text-gray-900 shadow-sm bg-white'
                            : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-700 bg-white'
                            }`}
                    >
                        <FiCheckCircle size={16} />
                        Published
                    </button>

                    <button
                        onClick={() => setFilterStatus('draft')}
                        className={`flex items-center justify-center gap-2 w-full sm:w-30 py-2.5 text-sm font-bold rounded-xl border transition-all ${filterStatus === 'draft'
                            ? 'border-gray-900 text-gray-900 shadow-sm bg-white'
                            : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-700 bg-white'
                            }`}
                    >
                        <FiCircle size={16} style={{ strokeDasharray: '3 3' }} />
                        Draft
                    </button>
                </div>
            </div>

            <div className="text-sm text-gray-500 font-medium shrink-0">
                พบทั้งหมด <span className="font-bold text-gray-900">{totalItems}</span> รายการ
            </div>

        </div>
    )
}

export default BlogSearch