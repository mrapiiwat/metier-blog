'use client'
import { useParams } from 'next/navigation'

const BlogDetailPage = () => {
    const params = useParams()
    const slug = params.slug 
    
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">หน้ารายละเอียด: {slug}</h1>
        </div>
    )
}

export default BlogDetailPage
