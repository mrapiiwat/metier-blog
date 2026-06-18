import Image from "next/image"

const Hero = () => {
    return (
        <section className="relative w-full h-[calc(100vh-80px)] flex items-center">

            <div className="absolute inset-0 -z-10">
                <Image
                    src="/images/home-hero.svg"
                    alt="Luxury car background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="px-6 md:px-16 w-full max-w-6xl">
                <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                    Your Journey <br />
                    Your Car <br />
                    Your Way
                </h1>
                <p className="text-white/80 text-base md:text-lg mb-8 max-w-xl">
                    Lorem ipsum dolor sit amet consectetur. Diam volutpat morbi elementum vel euismod aliquam.
                    Amet ultrices neque augue consectetur purus phasellus.
                </p>
                <a href="#footer" className="flex justify-center items-center gap-2 max-w-40 bg-[#FF5959] px-8 py-4 rounded-md font-bold text-white hover:bg-[#ff4646] transition-colors">
                    Subscribe
                </a>
            </div>

        </section>
    )
}

export default Hero