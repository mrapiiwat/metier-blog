import Image from 'next/image'

const LatestSection = () => {
  return (
    <div className="lg:col-span-8">
      <h2 className="text-3xl font-bold mb-8">Latest</h2>
      <div className="border border-gray-200 p-6 rounded-lg">
        <div className="relative w-full h-87.5 mb-6">
          <Image src="/images/home-hero.svg" alt="Blog" fill className="object-cover rounded-md" />
        </div>
        <p className="text-sm text-gray-500 mb-2">By <span className='text-[#FF7A7A]'>John Doe</span> | March 12, 2024</p>
        <h3 className="text-2xl font-bold mb-4 line-clamp-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio excepturi eos facilis dolorum optio, assumenda voluptatibus officiis delectus! Libero ut totam officiis vel, praesentium placeat perferendis numquam odio illum deserunt?</h3>
        <p className="mb-6 font-light line-clamp-6">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          Duis aute irure dolor in reprehenderit in voluptate v
          Duis aute irure dolor in reprehenderit in volusse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
        <button className="bg-[#FF7A7A] text-white px-8 py-3 rounded-md font-bold">Read more</button>
      </div>
    </div>
  )
}
export default LatestSection