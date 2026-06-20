import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface PostCardProps {
  slug: string
  title: string
  excerpt: string
  img: string
  authorName?: string
  createdAt?: string
}

const PostCard: React.FC<PostCardProps> = ({
  slug,
  title,
  excerpt,
  img,
  authorName,
  createdAt,
}) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unknown Date'

  return (
    <div className="grid grid-cols-1 md:grid-cols-[40%_1fr] gap-6 items-start">
      <div className="relative w-full aspect-video md:aspect-auto md:h-75 shrink-0">
        <Link href={`/blogs/${slug}`}>
          <Image
            src={img}
            alt={title}
            fill
            className="object-cover rounded-lg"
            unoptimized={true}
          />
        </Link>
      </div>

      <div className="flex flex-col">
        <h2 className="text-xl md:text-2xl font-bold mb-2 leading-tight">{title}</h2>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden shrink-0 relative">
            <Image
              src="/images/avatar-placeholder.png"
              alt={authorName || 'Author'}
              fill
              className="object-cover"
            />
          </div>
          <p className="text-xs md:text-sm font-semibold text-gray-500">
            {authorName || 'Anonymous'}{' '}
            <span className="text-gray-400 font-normal">• {formattedDate} • 3 view</span>
          </p>
        </div>

        <div
          className="prose prose-sm md:prose-base prose-p:my-0 prose-li:my-0 mb-4 text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: excerpt }}
        />

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
