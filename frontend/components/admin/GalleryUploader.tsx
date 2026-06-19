'use client'
import React from 'react'
import { FiImage } from 'react-icons/fi'

export const GalleryUploader = () => (
  <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
    <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
      รูปประกอบ (6 ช่อง)
    </h3>
    <div className="grid grid-cols-3 gap-3">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="aspect-4/3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-300 hover:border-indigo-300 transition-all cursor-pointer"
        >
          <FiImage size={18} />
          <span className="text-[10px] mt-1">ช่อง {i + 1}</span>
        </div>
      ))}
    </div>
  </div>
)
