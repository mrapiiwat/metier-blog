'use client'
import { FiTrash2, FiCalendar, FiClock } from 'react-icons/fi'

interface SidebarProps<T> {
  formData: T
  setFormData: React.Dispatch<React.SetStateAction<T>>
  onSave: () => void
  isSaving: boolean
  createdAt?: string | null
  updatedAt?: string | null
}

export const Sidebar = <T extends { isPublished: boolean }>({
  formData,
  setFormData,
  onSave,
  isSaving,
  createdAt,
  updatedAt,
}: SidebarProps<T>) => (
  <aside className="flex flex-col gap-4">
    <div className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4">
      <p className="text-[11px] font-bold text-gray-400 uppercase">สถานะ</p>
      <select
        value={formData.isPublished ? 'true' : 'false'}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            isPublished: e.target.value === 'true',
          }))
        }
        className="w-full p-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px]"
      >
        <option value="true">เผยแพร่แล้ว</option>
        <option value="false">ฉบับร่าง</option>
      </select>
      <button
        onClick={onSave}
        className="w-full py-2.5 bg-gray-900 text-white text-[13px] font-semibold rounded-lg"
      >
        {isSaving ? 'กำลังบันทึก...' : 'บันทึกการแก้ไข'}
      </button>
    </div>

    <div className="bg-white border border-gray-100 rounded-2xl p-5 text-[12px] space-y-3">
      <div className="flex justify-between">
        <span className="text-gray-400 flex items-center gap-2">
          <FiCalendar size={13} /> สร้างเมื่อ
        </span>
        <span className="font-semibold">
          {createdAt ? new Date(createdAt).toLocaleDateString('th-TH') : '-'}
        </span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-400 flex items-center gap-2">
          <FiClock size={13} /> แก้ไขล่าสุด
        </span>
        <span className="font-semibold">
          {updatedAt ? new Date(updatedAt).toLocaleDateString('th-TH') : '-'}
        </span>
      </div>
    </div>

    <button className="w-full py-3 border border-red-100 text-red-500 text-[13px] font-semibold rounded-2xl flex items-center justify-center gap-2 hover:bg-red-50">
      <FiTrash2 size={14} /> ลบบทความ
    </button>
  </aside>
)
