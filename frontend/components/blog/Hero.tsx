import Image from 'next/image'

const Hero = () => {
  return (
    <section className="bg-[#31323C] w-full p-4 md:p-6">
      <div className="relative w-full min-h-125 flex items-center overflow-hidden rounded-3xl">
        <div className="absolute inset-0 z-0">
          <Image src="/images/blog-hero.svg" alt="Car background" fill className="object-cover" />
        </div>

        <div className="relative z-10 px-10 md:px-20 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-8">
              Your Journey <br />
              Your Car <br />
              Your Way
            </h1>
            <p className="text-gray-200 text-lg mb-10 max-w-lg">
              Lorem ipsum dolor sit amet consectetur. Diam volutpat morbi elementum vel euismod
              aliquam. Amet ultrices neque augue consectetur purus phasellus.
            </p>
            <button className="bg-[#FF5959] text-white px-8 py-4 rounded-md font-bold hover:bg-[#ff4646] transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
