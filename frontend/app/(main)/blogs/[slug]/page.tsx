'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { IoArrowBackSharp, IoCloseOutline } from 'react-icons/io5'
import CommentForm from '@/components/blog/CommentForm'
import CommentList from '@/components/blog/CommentList'

const BlogDetailPage = () => {
    const params = useParams()
    const router = useRouter()
    const slug = params.slug

    const [selectedImage, setSelectedImage] = useState<string | null>(null)

    const approvedComments = [
        {
            id: 1,
            author: "สมชาย ใจดี",
            content: "บทความนี้เขียนได้ดีมากครับ ได้ความรู้เรื่องรถคลาสสิกเพิ่มเยอะเลย 10เต็ม10 ไปเลยครับ",
            date: "2026-06-18T15:00:00.000Z"
        },
        {
            id: 2,
            author: "สมหมาย มั่นคง",
            content: "อ่านแล้วเข้าใจง่ายมากครับ อยากให้รีวิวรุ่นอื่นเพิ่มด้วยครับ ติดตามเลยครับ",
            date: "2026-06-18T15:30:00.000Z"
        },
        {
            id: 3,
            author: "อำนวย พรชัย",
            content: "เนื้อหาแน่นมาก 5555 ชอบการเปรียบเทียบในยุคปัจจุบันกับอดีตครับ",
            date: "2026-06-18T16:15:00.000Z"
        }
    ]

    const additionalImages = [
        "/images/home-hero.svg",
        "/images/home-hero.svg",
        "/images/home-hero.svg",
        "/images/home-hero.svg"
    ]

    return (
        <article className="mx-auto max-w-5xl px-4 sm:px-6 pb-24 font-sans">

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
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Non blandit massa enim nec. Scelerisque viverra mauris in aliquam sem. At risus viverra adipiscing at in tellus.
                    </p>
                </div>

                <ul className="list-disc pl-5 space-y-2 text-gray-800 font-bold text-[15px] md:text-base">
                    <li>Lorem ipsum dolor sit amet</li>
                    <li>Non blandit massa enim nec scelerisque</li>
                    <li>Neque egestas congue quisque egestas</li>
                </ul>
            </div>

            {additionalImages && additionalImages.length > 0 && (
                <div className="mt-16">
                    <h3 className="text-xl font-extrabold text-gray-900 mb-6">รูปภาพเพิ่มเติม</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                        {additionalImages.slice(0, 6).map((imgSrc, index) => (
                            <div
                                key={index}
                                className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-gray-100 shadow-sm group cursor-pointer"
                                onClick={() => setSelectedImage(imgSrc)}
                            >
                                <Image
                                    src={imgSrc}
                                    alt={`Additional Image ${index + 1}`}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="mt-16 pt-12 border-t border-gray-100 max-w-3xl mx-auto space-y-12">
                <div>
                    <h3 className="text-xl font-black text-gray-900 mb-6">
                        ความคิดเห็น ({approvedComments.length})
                    </h3>
                    <CommentList comments={approvedComments} />
                </div>

                <div className="pt-8 border-t border-gray-100">
                    <div className="mb-6">
                        <h3 className="text-xl font-black text-gray-900">ร่วมแสดงความคิดเห็น</h3>
                        <p className="text-sm text-gray-500 mt-1">
                            โปรดระบุชื่อผู้ส่ง และข้อความต้องเป็นภาษาไทยและ/หรือตัวเลขเท่านั้น
                        </p>
                    </div>
                    <CommentForm blogId={slug} />
                </div>
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

            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-sm transition-opacity"
                    onClick={() => setSelectedImage(null)}
                >
                    <div
                        className="relative w-full max-w-5xl h-[80vh] flex items-center justify-center animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute -top-10 right-0 sm:-right-4 text-white/70 hover:text-white transition-colors cursor-pointer"
                        >
                            <IoCloseOutline size={36} />
                        </button>

                        <div className="relative w-full h-full">
                            <Image
                                src={selectedImage}
                                alt="Enlarged View"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>
            )}

        </article>
    )
}

export default BlogDetailPage