'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
  FiArrowLeft, FiImage, FiTrash2, FiClock,
  FiCalendar, FiHash, FiBold, FiItalic, FiList
} from 'react-icons/fi'

const EditBlogPage = () => {
  const params = useParams()
  const router = useRouter()
  const blogId = params.id as string

  const [formData, setFormData] = useState({ title: '', slug: '', isPublished: false })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [wordCount, setWordCount] = useState(0)

  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: {
      attributes: { class: 'prose prose-sm focus:outline-none max-w-none min-h-[300px] p-5' },
    },
    onUpdate: ({ editor }) => {
      const text = editor.getText()
      setWordCount(text.split(/\s+/).filter(Boolean).length)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      setFormData({ title: 'Classic Revival: Revisiting Iconic Cars', slug: 'classic-revival', isPublished: true })
      editor?.commands.setContent('<p>เนื้อหาบทความของคุณ...</p>')
      setIsLoading(false)
    }, 800)
  }, [blogId, editor])

  const handleSubmit = async () => {
    setIsSaving(true)
    console.log("บันทึก:", { ...formData, content: editor?.getHTML() })
    setTimeout(() => { setIsSaving(false); router.push('/admin/blogs') }, 1000)
  }

  if (isLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-10">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10 h-14 flex items-center px-6 justify-between">
        <div className="flex items-center gap-3">
          <Link href="/blogs" className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"><FiArrowLeft size={17} /></Link>
          <h1 className="text-[15px] font-semibold">แก้ไขบทความ</h1>
        </div>
        <button onClick={handleSubmit} className="px-4 py-2 bg-gray-900 text-white text-[13px] font-semibold rounded-lg">  {isSaving ? 'กำลังบันทึก...' : <>บันทึกการแก้ไข</>}
        </button>
      </header>

      <main className="max-w-275 mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_272px] gap-6 items-start">
        <div className="flex flex-col gap-5">
          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-50"><p className="text-[11px] font-bold text-gray-400 uppercase">รูปหน้าปก</p></div>
            <div className="p-5"><div className="w-full aspect-21/6 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100"><FiImage size={24} /><p className="text-xs mt-2">อัปโหลดรูปหน้าปก</p></div></div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6 space-y-4">
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase mb-2 block">ชื่อบทความ</label>
              <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full text-xl font-bold focus:outline-none border-b border-gray-100 pb-1" />
            </div>
            <div>
              <label className="text-[11px] font-bold text-gray-400 uppercase mb-2 block">URL Slug</label>
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm"><span className="text-gray-400">/blogs/</span><input value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="bg-transparent focus:outline-none w-full" /></div>
            </div>
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="px-4 py-2 border-b border-gray-50 flex items-center gap-1 bg-gray-50/50">
              <button onClick={() => editor?.chain().focus().toggleBold().run()} className={`p-2 rounded-lg ${editor?.isActive('bold') ? 'bg-white text-indigo-600' : 'text-gray-400'}`}><FiBold size={16} /></button>
              <button onClick={() => editor?.chain().focus().toggleItalic().run()} className={`p-2 rounded-lg ${editor?.isActive('italic') ? 'bg-white text-indigo-600' : 'text-gray-400'}`}><FiItalic size={16} /></button>
              <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className={`p-2 rounded-lg ${editor?.isActive('bulletList') ? 'bg-white text-indigo-600' : 'text-gray-400'}`}><FiList size={16} /></button>
            </div>
            <EditorContent editor={editor} />
          </div>

          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <h3 className="text-[11px] font-bold text-gray-400 uppercase mb-4">รูปประกอบ</h3>
            <div className="grid grid-cols-3 gap-3">{[...Array(6)].map((_, i) => <div key={i} className="aspect-4/3 bg-gray-50 border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center text-gray-300"><FiImage size={18} /></div>)}</div>
          </div>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
            <p className="text-[11px] font-bold text-gray-400 uppercase">สถานะ</p>
            <select value={formData.isPublished ? 'true' : 'false'} onChange={(e) => setFormData({ ...formData, isPublished: e.target.value === 'true' })} className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px]"><option value="true">เผยแพร่แล้ว</option><option value="false">ฉบับร่าง</option></select>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5 text-[12px] space-y-3">
            <div className="flex justify-between"><span className="text-gray-400 flex items-center gap-2"><FiCalendar size={13} /> สร้างเมื่อ</span> <span className="font-semibold">1 มิ.ย. 2568</span></div>
            <div className="flex justify-between"><span className="text-gray-400 flex items-center gap-2"><FiClock size={13} /> แก้ไขล่าสุด</span> <span className="font-semibold">19 มิ.ย. 2568</span></div>
            <div className="flex justify-between"><span className="text-gray-400 flex items-center gap-2"><FiHash size={13} /> จำนวนคำ</span> <span className="font-semibold">{wordCount} คำ</span></div>
          </div>
          <button className="w-full py-3 border border-red-100 text-red-500 text-[13px] font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50"><FiTrash2 size={14} /> ลบบทความ</button>
        </aside>
      </main>
    </div>
  )
}

export default EditBlogPage