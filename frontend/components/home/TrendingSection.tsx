import Link from 'next/link'

const TrendingSection = () => {
  const hoverClass = "cursor-pointer p-6 rounded-md transition-all duration-300 hover:bg-[#FF7A7A] hover:text-white group";
  const textClass = "text-xs mb-1 opacity-70";
  const titleClass = "text-xl font-bold leading-snug line-clamp-2";

  return (
    <div className="lg:col-span-5"> 
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">Trending Blogs</h2>
        <Link href="/blogs" className="font-semibold text-sm hover:text-[#FF7A7A] transition-colors">
          See all
        </Link>
      </div>
      
      <div className="flex flex-col"> 
        
        <div className={hoverClass}>
          <p className={textClass}>By John Deo | Aug 23, 2023</p>
          <h4 className={titleClass}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h4>
        </div>

        <div className={hoverClass}>
          <p className={textClass}>By John Deo | Aug 23, 2023</p>
          <h4 className={titleClass}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h4>
        </div>

        <div className={hoverClass}>
          <p className={textClass}>By John Deo | Aug 23, 2023</p>
          <h4 className={titleClass}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h4>
        </div>

        <div className={hoverClass}>
          <p className={textClass}>By John Deo | Aug 23, 2023</p>
          <h4 className={titleClass}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h4>
        </div>

        <div className={hoverClass}>
          <p className={textClass}>By John Deo | Aug 23, 2023</p>
          <h4 className={titleClass}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</h4>
        </div>
        
      </div>
    </div>
  )
}

export default TrendingSection