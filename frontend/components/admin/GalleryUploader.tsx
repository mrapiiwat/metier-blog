'use client'
import React, { useRef, useState } from 'react'
import { FiImage } from 'react-icons/fi'
import Image from 'next/image'

interface Props {
  additionalImages: (File | null)[]
  setAdditionalImages: (images: (File | null)[]) => void
}

export const GalleryUploader = ({ additionalImages, setAdditionalImages }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [activeSlot, setActiveSlot] = useState<number | null>(null)
  const [previews, setPreviews] = useState<(string | null)[]>(Array(6).fill(null))

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && activeSlot !== null) {
      const newImages = [...additionalImages]
      newImages[activeSlot] = file
      setAdditionalImages(newImages)

      const newPreviews = [...previews]
      newPreviews[activeSlot] = URL.createObjectURL(file)
      setPreviews(newPreviews)
    }
    e.target.value = ''
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
      />
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
        รูปประกอบ (6 ช่อง)
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            onClick={() => {
              setActiveSlot(i)
              inputRef.current?.click()
            }}
            className={`aspect-4/3 bg-gray-50 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden relative
              ${previews[i] ? 'border-indigo-400' : 'border-gray-200 hover:border-indigo-300'}`}
          >
            {previews[i] ? (
              <Image src={previews[i]!} alt={`slot-${i}`} fill className="object-cover" />
            ) : (
              <>
                <FiImage size={18} className="text-gray-300" />
                <span className="text-[10px] mt-1 text-gray-400">ช่อง {i + 1}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
