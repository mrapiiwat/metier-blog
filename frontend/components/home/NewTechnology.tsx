import BlogCard from './BlogCard' 
import Link from 'next/link'

const NewTechnology = () => {
  return (
    <section className="px-6 md:px-16 pb-16 max-w-375 mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">New Technology</h2>
        <Link href="/blogs" className="font-semibold text-sm cursor-pointer hover:text-[#FF7A7A] transition-colors">See All</Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <BlogCard slug="test1" title="A Review Of Cars..." img="/images/home-hero.svg" />
        <BlogCard slug="test2" title="A Deep Dive Into..." img="/images/home-hero.svg" />
        <BlogCard slug="test3" title="Reviewing Cars With..." img="/images/home-hero.svg" />
        <BlogCard slug="test4" title="Reviewing Cars With..." img="/images/home-hero.svg" />
      </div>
    </section>
  )
}
export default NewTechnology