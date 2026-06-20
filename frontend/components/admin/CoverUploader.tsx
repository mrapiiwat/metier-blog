'use client'
import { useRef } from 'react'
import { FiImage } from 'react-icons/fi'
import Image from 'next/image'

interface Props {
  coverImage: File | string | null
  setCoverImage: (file: File | null) => void
}

export const CoverUploader = ({ coverImage, setCoverImage }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const previewUrl = coverImage
    ? coverImage instanceof File
      ? URL.createObjectURL(coverImage)
      : `/api/blog/image/${coverImage}`
    : null

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setCoverImage(file)
    }
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-50">
        <p className="text-[11px] font-bold text-gray-400 uppercase">รูปหน้าปก</p>
      </div>
      <div className="p-5">
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
        <div
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-21/6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 overflow-hidden relative"
        >
          {previewUrl ? (
            <Image src={previewUrl} alt="cover" fill className="object-cover" unoptimized />
          ) : (
            <>
              <FiImage size={24} />
              <p className="text-xs mt-2">อัปโหลดรูปหน้าปก</p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
