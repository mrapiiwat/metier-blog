import PostCard from './PostCard';
import Pagination from '../Pagination';
import { data } from "./data"

const Blogs = () => {
  return (
    <section className="px-6 md:px-16 py-16 max-w-350 mx-auto w-full">
      <div className='flex justify-between'>
        <h1 className="text-4xl font-bold mb-8">All posts <span className='text-base font-light'>(100)</span></h1>
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5959] transition-all"
          />
          <svg className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className='border-t border-gray-300 mb-12' />

      <div className="flex flex-col gap-12">
        {data.map((post) => (
          <PostCard
            key={post.id}
            title={post.title}
            excerpt={post.excerpt}
            img={post.img}
          />
        ))}
      </div>
      <Pagination />
    </section>
  )
}

export default Blogs