import React from 'react'
import Image from 'next/image'

interface BlogCardProps {
  title: string;
  img: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ title, img }) => (
  <div className="bg-[#F4F0F8] p-5 rounded-2xl transition-all duration-300 hover:shadow-lg">

    <div className="relative w-full aspect-4/3 mb-5">
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover rounded-xl"
      />
    </div>

    <h4 className="font-bold text-xl mb-6 leading-snug">
      {title}
    </h4>

    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gray-300 rounded-full overflow-hidden shrink-0">
        <Image src="/images/avatar.png" alt="Author" width={40} height={40} />
      </div>

      <div className="text-sm">
        <p className="font-bold text-gray-900">Dasteen</p>
        <p className="text-gray-500 text-xs">
          Jan 10, 2024 • 3 Min Read
        </p>
      </div>
    </div>
  </div>
)

export default BlogCard