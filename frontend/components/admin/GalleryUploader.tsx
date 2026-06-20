'use client'
import React, { useRef, useState } from 'react'
import { FiImage, FiLoader } from 'react-icons/fi'
import Image from 'next/image'
import axios from '@/lib/axios/admin'

interface Props {
  blogId?: string
  additionalImages: (File | string | null)[]
  setAdditionalImages: (images: (File | string | null)[]) => void
}

export const GalleryUploader = ({ blogId, additionalImages, setAdditionalImages }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const activeSlot = useRef<number | null>(null)
  const [uploadingSlot, setUploadingSlot] = useState<number | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && activeSlot.current !== null) {
      if (blogId) {
        setUploadingSlot(activeSlot.current)
        const formData = new FormData()
        formData.append('image', file)

        try {
          const { data } = await axios.put(
            `/blog/${blogId}/image/${activeSlot.current + 1}`,
            formData,
            {
              headers: { 'Content-Type': 'multipart/form-data' },
            }
          )

          const newImages = [...additionalImages]
          newImages[activeSlot.current] = data.additionalImages[activeSlot.current]
          setAdditionalImages(newImages)
        } catch (error) {
          console.error('Failed to replace image:', error)
        } finally {
          setUploadingSlot(null)
        }
      } else {
        const newImages = [...additionalImages]
        newImages[activeSlot.current] = file
        setAdditionalImages(newImages)
      }
    }
    e.target.value = ''
  }

  const getPreviewUrl = (item: File | string | null) => {
    if (!item) return null
    if (item instanceof File) return URL.createObjectURL(item)
    return `/api/blog/image/${item}`
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
              activeSlot.current = i
              inputRef.current?.click()
            }}
            className={`aspect-4/3 bg-gray-50 border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative
              ${additionalImages[i] ? 'border-indigo-400' : 'border-gray-200 hover:border-indigo-300'}`}
          >
            {uploadingSlot === i ? (
              <FiLoader className="animate-spin text-indigo-600" size={24} />
            ) : additionalImages[i] ? (
              <Image
                src={getPreviewUrl(additionalImages[i])!}
                alt={`slot-${i}`}
                fill
                className="object-cover"
                unoptimized
              />
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
