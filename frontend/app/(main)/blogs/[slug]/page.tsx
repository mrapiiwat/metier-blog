'use client'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoArrowBackSharp } from 'react-icons/io5'

const BlogDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug

    return (
        <article className="mx-auto max-w-6xl px-4 sm:px-6 pb-24 font-sans">

            <div className="relative aspect-video w-full overflow-hidden rounded-b-xl mb-10 shadow-xs bg-gray-100">
                <Image
                    src="/images/home-hero.svg"
                    alt="Cover Image"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-[42px] font-black text-gray-900 leading-tight tracking-tight mb-6">
                Classic Revival: Revisiting Iconic Cars Through Modern Reviews
            </h1>

            <div className="flex items-center gap-3 mb-10">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold text-sm shrink-0 overflow-hidden">
                    <Image src="/images/avatar-placeholder.png" alt="Author" width={40} height={40} />
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-bold text-gray-900">Dasteen</span>
                    <span className="text-gray-400">Jan 10, 2024</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">3 Min Read</span>
                </div>
            </div>

            <div className="max-w-none space-y-8 text-gray-500 text-[15px] md:text-base leading-relaxed">

                <div className="space-y-4">
                    <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </h2>
                    <p className="font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.
                    </p>
                </div>

                <div className="space-y-4">
                    <h2 className="text-2xl font-extrabold text-gray-900 leading-snug">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
                    </h2>
                    <p className="font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.
                    </p>
                    <p className="font-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus. Sociis natoque penatibus et magnis dis parturient montes. Ridiculus mus mauris vitae ultricies leo. Neque egestas congue quisque egestas diam. Risus in hendrerit gravida rutrum quisque non.
                    </p>
                </div>

                <ul className="list-disc pl-5 space-y-2 text-gray-800 font-bold text-[15px] md:text-base">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Non blandit massa enim nec scelerisque</li>
                    <li>Neque egestas congue quisque egestas</li>
                </ul>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-100">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 font-medium transition-all cursor-pointer"
                >
                    <IoArrowBackSharp size={16} />
                    <span>ย้อนกลับ</span>
                </button>
            </div>

        </article>
    )
}

export default BlogDetailPage