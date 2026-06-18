import React from 'react'

const Pagination = () => {
  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 disabled:opacity-50 transition-colors">
        Previous
      </button>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((page) => (
          <button
            key={page}
            className={`w-10 h-10 rounded-md transition-all ${
              page === 1 
              ? 'bg-[#FF5959] text-white font-bold' 
              : 'hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition-colors">
        Next
      </button>
    </div>
  )
}

export default Pagination