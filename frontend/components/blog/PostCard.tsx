import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  img: string
}

const PostCard: React.FC<PostCardProps> = ({ slug, title, excerpt, img }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 items-start">
      <div className="relative w-120 h-75 shrink-0">
        <Link href={`/blogs/${slug}`}>
          <Image src={img} alt={title} fill className="object-cover rounded-lg" />
        </Link>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">{title}</h2>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden shrink-0">
            <Image src="/images/avatar.png" alt="Author" width={32} height={32} />
          </div>
          <p className="text-xs md:text-sm font-semibold text-gray-500">
            Dasteen <span className="text-gray-400 font-normal">• Jan 10, 2024 • 3 Min Read</span>
          </p>
        </div>

        <p className="font-light mb-4 leading-relaxed line-clamp-3 text-gray-600">{excerpt}</p>

        <Link
          href={`/blogs/${slug}`}
          className="bg-[#FF5959] cursor-pointer text-white px-5 py-2.5 rounded-md font-bold text-sm md:text-base w-fit hover:bg-[#ff4646] transition-colors"
        >
          Read full article...
        </Link>
      </div>
    </div>
  )
}

export default PostCard
